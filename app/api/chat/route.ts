import Groq from "groq-sdk";
import { DataAPIClient } from "@datastax/astra-db-ts"
// import { pipeline } from "@xenova/transformers"
const TransformersApi = Function('return import("@xenova/transformers")')();
const { pipeline } = await TransformersApi;
import { OpenAIStream, StreamingTextResponse } from "ai"
// import { groq } from "@ai-sdk/groq"

import "dotenv/config"

const {ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    GROQ_API_KEY
} = process.env

// const { textStream } = streamText({
//     model: groq('llama3-70b-8192'),
//     prompt: 'Best venue for Forumla One?',
// });

// for await (const textPart of textStream) {
//     process.stdout.write(textPart);
// }

const groq = new Groq({
    apiKey: GROQ_API_KEY,
})

let embedder: any;
const initializeEmbedder = async () => {
    console.log("Initializing embedding model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Embedding model initialized.");
};

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, {namespace: ASTRA_DB_NAMESPACE})

export async function POST(req: Request) {
    try {
        const {messages} = await req.json();
        const recentMsg = messages[messages?.length-1].content

        if (!embedder) {
            await initializeEmbedder();
        }

        let docContent = "";

        const embedding = await embedder(recentMsg, { pooling: "mean", normalize: true });
            // console.log(embedding)
            const vector = embedding.data;
            const arrayVector = Array.from(vector);
            const normalizedVector = normalizeVector(arrayVector as number[]);
            const float32Array = new Float32Array(normalizedVector);

            try {
                const collection = await db.collection(ASTRA_DB_COLLECTION)
                const cursor = collection.find(null, {
                    sort: {
                        $vector: Array.from(float32Array),
                    },
                    limit: 8
                })

                const documents = await cursor.toArray();
                const mappedDocs = documents.map(doc => doc.text)
                docContent = JSON.stringify(mappedDocs)
            } catch (error) {
                console.log("Error fetching from db...");
                docContent = "";
            }

            const template = {
                role: "system",
                content: `
                    You are an AI assistant who knows everything about UEFA Champions League.
                    Use the below context to augment what you know about UEFA Champions League.
                    The contest will provide you with the latest information gathered from Wikipedia,
                    UEFA official website and other sources.
                    If the context does not include the information related to the question,
                    then you need to use your existing knowledge to answer and do not mention any sources.
                    Format answers with markdown wherever required and do not return images.
                    ------------------------
                    START Context
                    ${docContent}
                    END Context
                    ------------------------
                    Question: ${recentMsg}
                    ------------------------ 
                `
            }

            const res = await groq.chat.completions.create({
                model: "llama3-70b-8192",
                stream: true,
                messages: [template, ...messages]
            })

            const stream = OpenAIStream(res);
            return new StreamingTextResponse(stream)

    } catch (error) {
        throw error;
    }
}

function normalizeVector(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (norm === 0 || isNaN(norm) || !isFinite(norm)) {
        console.error("Invalid norm detected:", norm);
        return vector.map(() => 0);
    }
    return vector.map(v => v / norm);
}