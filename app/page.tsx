"use client"
import Image from "next/image"
import uclgpt from "./assets/uclgpt.png"
import { useChat } from "ai/react"
import { Message } from "ai"
import PromptSuggestionRow from "./components/PromptSuggestionRow"
import LoadingBubble from "./components/LoadingBubble"
import Bubble from "./components/Bubble"

const Home = () => {
    const { append, messages, isLoading, input, handleInputChange, handleSubmit } = useChat();

    const areMessagesEmpty = !messages || messages.length === 0;

    const onClickHandler = (text: string) => {
        const msg: Message = {
            id: crypto.randomUUID(),
            content: text,
            role: "user"
        }
        append(msg)
    }

    return (
        <main
            className="h-full w-full p-3 bg-[#123456] !text-white text-center"
        >
            <Image
                className="rounded-md overflow-hidden !h-16 !w-auto"
                src={uclgpt}
                // height={"64"}
                alt="UCLGPT Logo"
            />
            <section className={areMessagesEmpty ? "" : "py-1 w-full h-[calc(100%-120px)] flex flex-col justify-end"}>
                {areMessagesEmpty
                    ? (
                        <>
                            <p>Welcome to UCL-GPT! Ask your questions related to UEFA Champions League and get the most relevant answers.</p>
                            <br />
                            <PromptSuggestionRow onClickHandler={onClickHandler}/>
                        </>
                    )
                    : (
                        <div 
                        className="flex flex-col justify-start gap-1 overflow-y-auto"
                        style={{scrollbarWidth: "none"}}
                        >
                            {messages && messages.map((message, index) => <Bubble key={index} message={message} />)}
                            {isLoading && <LoadingBubble/>}
                        </div>
                    )
                }
            </section>
            <form
                onSubmit={handleSubmit}
                className="h-fit pt-0 w-full flex rounded-md overflow-hidden items-center gap-2.5"
            >
                <input
                    type="text"
                    value={input}
                    placeholder="Ask me..."
                    onChange={handleInputChange}
                    className="w-5/6 p-2.5 rounded text-gray-800 focus:outline-none"
                />
                <input
                    type="submit"
                    className="w-1/6 p-2.5 rounded bg-red-600 cursor-pointer"
                />
            </form>
        </main>
    )
}

export default Home