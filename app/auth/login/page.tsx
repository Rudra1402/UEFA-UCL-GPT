"use client"

import Link from "next/link"
import AuthForm from "../../components/AuthForm"

const LoginPage = () => {
    return (
        <div
            className="h-full w-full p-3 bg-gray-800 !text-white text-center flex items-center justify-center"
        >
            <div className="w-fit h-auto shadow-md rounded-md flex flex-col items-center justify-start overflow-auto">
                <AuthForm type={"login"} />
            </div>
        </div>
    )
}

export default LoginPage