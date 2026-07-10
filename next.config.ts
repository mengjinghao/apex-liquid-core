import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_BUILD_BASE_PATH || "",
  images: { unoptimized: true },
  reactStrictMode: false,
};

export default nextConfig;
