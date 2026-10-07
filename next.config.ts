import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [640, 750, 828, 1080, 1280, 1920, 2048, 3840],
    formats: ["image/webp"],
  },
  // The vault is the front door now. It is a static page under public/vault,
  // so the root is rewritten to it before routing. Every page of the previous
  // site is still built and still reachable at its own address; only what you
  // land on at b3b.ai has changed. Delete this block to put the old home back.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/vault/index.html" },
        { source: "/vault", destination: "/vault/index.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
