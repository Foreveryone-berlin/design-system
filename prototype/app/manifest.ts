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
        src: "https://foreveryone.berlin/wp-content/uploads/2026/09/cropped-foreveryone-favicon-circled-32x32.png",
        type: "image/png",
        sizes: "32x32",
        purpose: "any",
      },
      {
        src: "https://foreveryone.berlin/wp-content/uploads/2026/09/cropped-foreveryone-favicon-circled-192x192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "https://foreveryone.berlin/wp-content/uploads/2026/09/cropped-foreveryone-favicon-circled-180x180.png",
        type: "image/png",
        sizes: "180x180",
        purpose: "maskable",
      },
    ],
  };
}
