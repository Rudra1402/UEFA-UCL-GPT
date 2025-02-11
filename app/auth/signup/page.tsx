"use client"

import Link from "next/link"
import AuthForm from "../../components/AuthForm"

const SignupPage = () => {
    return (
        <div
            className="h-full w-full p-3 bg-[#123456] !text-white text-center flex items-center justify-center"
        >
            <div className="w-fit p-6 h-auto shadow-md rounded-md bg-white flex flex-col items-center justify-start">
                <AuthForm type={"signup"} />
                <div
                    className="text-gray-500 text-sm flex items-center gap-1 mt-2"
                >Existing account!
                    <Link
                        href={'/auth/login'}
                        className="text-blue-600"
                    >Login</Link>
                </div>
            </div>
        </div>
    )
}

export default SignupPage