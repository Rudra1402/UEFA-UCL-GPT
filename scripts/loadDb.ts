import { Groq } from 'groq-sdk';
import {DataAPIClient} from "@datastax/astra-db-ts"
import {PuppeteerWebBaseLoader} from "@langchain/community/document_loaders/web/puppeteer"
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter"
import { pipeline } from "@xenova/transformers";
// import OpenAI from "openai"

import "dotenv/config"

type SimilarityMetric = "dot_product" | "cosine" | "euclidean"

const {ASTRA_DB_NAMESPACE,
    ASTRA_DB_COLLECTION,
    ASTRA_DB_API_ENDPOINT,
    ASTRA_DB_APPLICATION_TOKEN,
    GROQ_API_KEY
} = process.env

const groq = new Groq({
    apiKey: GROQ_API_KEY,
})

let embedder: any;
const initializeEmbedder = async () => {
    console.log("Initializing embedding model...");
    embedder = await pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2");
    console.log("Embedding model initialized.");
};

const uclData = [
    'https://en.wikipedia.org/wiki/UEFA_Champions_League#:~:text=In%20its%20present%20format%2C%20the,four%20home%20and%20four%20away.',
    'https://www.uefa.com/uefachampionsleague/history/rankings/',
    'https://en.wikipedia.org/wiki/European_Cup_and_UEFA_Champions_League_records_and_statistics',
    'https://www.uefa.com/uefachampionsleague/history/rankings/players/season_goals_scored/',
    'https://www.si.com/soccer/the-20-greatest-champions-league-goals-of-all-time',
    'https://www.uefa.com/uefachampionsleague/history/rankings/players/red_cards/',
    'https://www.uefa.com/uefachampionsleague/news/0268-12157d69ce2d-9f011c70f6fa-1000--new-format-for-champions-league-post-2024-everything-you-ne/'
]

const client = new DataAPIClient(ASTRA_DB_APPLICATION_TOKEN)
const db = client.db(ASTRA_DB_API_ENDPOINT, {namespace: ASTRA_DB_NAMESPACE})
const createCollection = async (similarityMetric: SimilarityMetric = "dot_product") => {
    const result = await db.createCollection(ASTRA_DB_COLLECTION, {
        vector: {
            dimension: 384,
            metric:similarityMetric
        }
    })
    console.log(result)
}

const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 512,
    chunkOverlap: 96
})

const loadSampleData = async () => {
    const collection = await db.collection(ASTRA_DB_COLLECTION)
    for await (const url of uclData) {
        const content = await scrapeData(url)
        const chunks = await splitter.splitText(content)
        for await (const chunk of chunks) {
            // const embedding = await groq.embeddings.create({
            //     model: 'sentence-transformers/all-MiniLM-L6-v2',
            //     input: chunk,
            //     encoding_format: "float"
            // })
            // const vector = embedding.data[0].embedding
            const embedding = await embedder(chunk, { pooling: "mean", normalize: true });
            // console.log(embedding)
            const vector = embedding.data;
            const arrayVector = Array.from(vector);
            const normalizedVector = normalizeVector(arrayVector as number[]);
            const float32Array = new Float32Array(normalizedVector);

            const result = await collection.insertOne({
                $vector: Array.from(float32Array),
                text: chunk
            })
            console.log(result)
        }
    }
}

function normalizeVector(vector: number[]): number[] {
    const norm = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (norm === 0 || isNaN(norm) || !isFinite(norm)) {
        console.error("Invalid norm detected:", norm);
        return vector.map(() => 0); // Return a zero vector if normalization fails
    }
    return vector.map(v => v / norm);
}

const scrapeData = async (url: string) => {
    const loader = new PuppeteerWebBaseLoader(url, {
        launchOptions: {
            headless: true
        },
        gotoOptions: {
            waitUntil: "domcontentloaded"
        },
        evaluate: async (page, browser) => {
            const result = await page.evaluate(() => document.body.innerHTML);
            await browser.close();
            return result;
        }
    });
    return (await loader.scrape())?.replace(/<[^>]*>?/gm, "")
};

// createCollection().then(() => loadSampleData());
const main = async () => {
    await initializeEmbedder();
    await createCollection();
    await loadSampleData();
};

main().catch(console.error);