"use client";
import Link from "next/link";
import Image from "next/image";
import uclgpt from "../assets/uclgpt.png";

const Navbar = () => {
  return (
    <nav className="w-full bg-gray-900 text-white py-4 px-6 shadow-md z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          {/* <Image src={uclgpt} alt="UCLGPT Logo" width={50} height={50} className="rounded-md" /> */}
          <span className="text-xl font-semibold">UCL-GPT</span>
        </Link>

        <div className="hidden md:flex space-x-6">
          <Link href="/auth/login" className="hover:text-blue-400 transition duration-300">Login</Link>
          <Link href="/auth/signup" className="hover:text-blue-400 transition duration-300">Signup</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
