import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel でのファイルトレース警告を抑制
  outputFileTracingRoot: require("path").join(__dirname, "../"),
};

export default nextConfig;
