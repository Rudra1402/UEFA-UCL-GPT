"use client"
import { useState } from "react";

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("text-green-500");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const endpoint = type === "signup" ? "/api/auth/signup" : "/api/auth/login";
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
        setMessageColor(() => data.message ? "text-green-500" : "text-red-500")
    };

    return (
        <div className="p-4 flex flex-col gap-5 items-center justify-start">
            <div className="text-gray-700 text-2xl font-semibold">{type === "signup" ? "Sign Up" : "Log In"}</div>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-3 !text-gray-700"
            >
                {type === "signup" && <input name="name" placeholder="Name" onChange={handleChange} className="border border-gray-500 rounded p-2" />}
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    onChange={handleChange}
                    className="border border-gray-500 rounded p-2"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="border border-gray-500 rounded p-2"
                />
                <button
                    type="submit"
                    className="bg-red-600 text-white p-2 rounded"
                >
                    {type === "signup" ? "Sign Up" : "Log In"}
                </button>
            </form>
            {message ? <p className={`m-0 ${messageColor}`}>{message}</p> : null}
        </div>
    );
};

export default AuthForm;
