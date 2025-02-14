"use client"

import { motion } from "framer-motion";

const LandingPage = () => {
    return (
        <main className="h-full overflow-auto w-full flex flex-col gap-3 items-center justify-between p-3 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
            <section className="flex flex-col items-center justify-center text-center py-20 px-4 text-white">
                <motion.h1
                    className="text-5xl font-bold mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Welcome to UCLGPT
                </motion.h1>
                <p className="text-lg mb-6 max-w-2xl">
                    A smarter way to interact with AI. Get insights, automate tasks, and boost productivity effortlessly.
                </p>
                <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200">
                    Get Started
                </button>
            </section>

            <section className="w-[90%] py-20 px-6 grid md:grid-cols-3 gap-8 text-center">
                {[
                    {
                        title: "Relive Iconic Moments",
                        description: "Ask UCLGPT about legendary matches, record-breaking performances, and unforgettable goals from past UCL seasons."
                    },
                    {
                        title: "Stats & Trivia Fun",
                        description: "Test your football knowledge! Get detailed player stats, head-to-head comparisons, and fun UCL trivia based on real data."
                    },
                    {
                        title: "Debate Like a Pro",
                        description: "Who’s the GOAT of the Champions League? UCLGPT gives you historical insights to fuel your football debates with facts."
                    }
                ].map((feature, idx) => (
                    <motion.div
                        key={idx}
                        className="p-6 bg-gray-50 rounded-lg shadow-md"
                        whileHover={{ scale: 1.05 }}
                    >
                        <h3 className="text-xl font-semibold mb-2 text-blue-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                ))}
            </section>

            <footer className="rounded-md text-center text-sm p-6 bg-gradient-to-l from-gray-800 text-white">
                <p>&copy; 2025 F1GPT. All rights reserved.</p>
            </footer>
        </main>
    );
};

export default LandingPage;
