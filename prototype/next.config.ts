import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "Content-Signal",
            value: "ai-train=no, search=no, ai-input=no",
          },
        ],
      },
    ];
  },
  images: {
    formats: ["image/webp"],
    deviceSizes: [390, 640, 768, 1024, 1280, 1440],
    imageSizes: [32, 64, 96, 128, 256, 360],
  },
};

export default nextConfig;
