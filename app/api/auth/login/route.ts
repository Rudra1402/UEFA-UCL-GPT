import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "../../../lib/db";
import User from "../../../models/user";

import "dotenv/config"

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: Request) {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    return NextResponse.json({ token, message: "Login successful" }, { status: 200 });
}
