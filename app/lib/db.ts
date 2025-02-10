import mongoose from "mongoose";

import "dotenv/config"

const MONGODB_URI = process.env.MONGODB_URI!;

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            dbName: "uclgpt",
        });
        console.log("MongoDB Connected");
    } catch (error) {
        console.error("MongoDB Connection Error:", error?.message);
    }
};

export default connectDB;
