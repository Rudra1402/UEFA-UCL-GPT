"use client"
import { useState } from "react";
import { Loader2 } from "lucide-react";

const AuthForm = ({ type }: { type: "login" | "signup" }) => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("text-green-500");
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = type === "signup" ? "/api/auth/signup" : "/api/auth/login";
        const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        setMessage(data.message || data.error);
        setMessageColor(() => data.message ? "text-green-500" : "text-red-500")

        setLoading(false);

        if (res.ok) {
            setFormData({ name: "", email: "", password: "" })
            if (data.token) {
                localStorage.setItem("token", data.token);
            }
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6">
            <div className="w-full max-w-md bg-gray-800 shadow-lg rounded-lg p-6 text-white">
                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-4">
                    {type === "signup" ? "Create an Account" : "Welcome Back"}
                </h2>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {type === "signup" && (
                        <input
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            required
                        />
                    )}
                    <input
                        name="email"
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="bg-gray-700 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        required
                    />
                    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-400 text-white font-semibold p-3 rounded-lg flex justify-center items-center transition duration-300 ease-in-out"
                        disabled={loading}
                    >
                        {loading ? <Loader2 className="animate-spin h-5 w-5" /> : (type === "signup" ? "Sign Up" : "Log In")}
                    </button>
                </form>

                {/* Message */}
                {message && (
                    <p className={`mt-4 text-center font-medium ${messageColor}`}>
                        {message}
                    </p>
                )}

                {/* Toggle between Login & Signup */}
                <p className="mt-4 text-gray-400 text-center">
                    {type === "signup" ? "Already have an account?" : "Don't have an account?"} 
                    <a href={type === "signup" ? "/auth/login" : "/auth/signup"} className="text-blue-400 hover:underline ml-1">
                        {type === "signup" ? "Log In" : "Sign Up"}
                    </a>
                </p>
            </div>
        </div>
    );
};

export default AuthForm;
