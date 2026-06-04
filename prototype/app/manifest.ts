import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ForEveryone Design System",
    short_name: "FE Design System",
    description:
      "Design tokens, components, and patterns for the ForEveryone digital experience.",
    start_url: "/",
    display: "standalone",
    background_color: "#F5F5F5",
    theme_color: "#FF7A3A",
    icons: [
      {
        src: "/favicon.svg",
        type: "image/svg+xml",
        sizes: "any",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/apple-touch-icon.png",
        type: "image/png",
        sizes: "180x180",
        purpose: "maskable",
      },
    ],
  };
}
