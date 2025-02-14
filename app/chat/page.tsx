"use client"
import Image from "next/image"
import uclgpt from "./assets/uclgpt.png"
import { useChat } from "ai/react"
import { Message } from "ai"
import PromptSuggestionRow from "../components/PromptSuggestionRow"
import LoadingBubble from "../components/LoadingBubble"
import Bubble from "../components/Bubble"
import { Send } from "lucide-react"
import Navbar from "../components/Navbar"

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
        <main className="h-full w-full flex flex-col gap-3 items-center justify-between p-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            {/* <div className="flex items-center justify-center w-full py-4">
                <Image
                    className="rounded-lg shadow-md"
                    src={uclgpt}
                    height={64}
                    width={180}
                    alt="UCLGPT Logo"
                />
            </div> */}

            <section
                className={`w-full max-w-3xl flex flex-col h-full ${areMessagesEmpty ? "justify-center items-center" : "overflow-y-auto"} px-4 py-3 rounded-lg bg-gray-800 shadow-lg`}
            >
                {areMessagesEmpty ? (
                    <div className="h-full flex flex-col items-center justify-center">
                        <p className="text-lg text-gray-300 text-center">Welcome to <span className="text-blue-400 font-semibold">UCL-GPT</span>! Ask your questions about the UEFA Champions League and get accurate answers.</p>
                        <br />
                        <PromptSuggestionRow onClickHandler={onClickHandler} />
                    </div>
                ) : (
                    <div
                        className="flex flex-col gap-1.5 overflow-y-auto pr-2"
                    // style={{ scrollbarWidth: "thin" }}
                    >
                        {messages.map((message, index) => (
                            <Bubble key={index} message={message} />
                        ))}
                        {isLoading && <LoadingBubble />}
                    </div>
                )}
            </section>

            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl flex items-center gap-2 px-4 py-3 bg-gray-800 rounded-lg shadow-md"
            >
                <input
                    type="text"
                    value={input}
                    placeholder="Ask me..."
                    onChange={handleInputChange}
                    className="flex-1 p-3 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                    type="submit"
                    className="p-3 bg-gradient-to-r from-red-600 to-red-400 hover:from-red-500 hover:to-red-300 text-white rounded-lg flex items-center justify-center transition duration-300 ease-in-out"
                >
                    <Send size={20} />
                </button>
            </form>
        </main>
    )
}

export default Home