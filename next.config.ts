import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1280, 1920, 2048, 3840],
    formats: ["image/webp"],
  },
};

export default nextConfig;
