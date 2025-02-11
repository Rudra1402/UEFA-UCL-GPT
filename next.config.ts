import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" }, // Allows all origins
          { key: "Access-Control-Allow-Methods", value: "GET,POST,PUT,DELETE,OPTIONS" }, // Allowed HTTP methods
          { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" }, // Allowed headers
        ],
      },
    ];
  },
};

export default nextConfig;
