import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Repo already ships docs/AGENTS.md; do not let next dev write prototype/AGENTS.md.
  agentRules: false,
  async redirects() {
    return [
      {
        source: "/ai-skills",
        destination: "/agent-skills",
        permanent: true,
      },
    ];
  },
  async headers() {
    const noIndex = {
      key: "X-Robots-Tag",
      value: "noindex, nofollow",
    };
    const blockAiInput = {
      key: "Content-Signal",
      value: "ai-train=no, search=no, ai-input=no",
    };
    // Agent-readable skill payload and llms.txt: keep noindex, allow ai-input.
    const allowAiInput = {
      key: "Content-Signal",
      value: "ai-train=no, search=no, ai-input=yes",
    };
    return [
      {
        source: "/(.*)",
        headers: [noIndex, blockAiInput],
      },
      {
        source: "/skills/:path*",
        headers: [allowAiInput],
      },
      {
        source: "/llms.txt",
        headers: [allowAiInput],
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
