import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440],
    imageSizes: [32, 64, 96, 128, 256, 360],
  },
};

export default nextConfig;
