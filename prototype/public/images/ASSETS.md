# Images

Images in this folder are for **design system prototype use only** (design.foreveryone.berlin).

- **Source:** foreveryone.berlin (hero, workshop/cafe, community).
- **Usage:** Local prototype only; do not hot-link from production.
- **Production:** Final assets for the live site should be sourced from the main site or asset pipeline.

**Current assets:**
- `community-cafe.png` community cafe scene used as the prototype homepage hero, blob-masked photograph of people at the ForEveryone community cafe (1090x1094 PNG).
- `workshop-group.jpg` workshop card image, photograph of community members laughing around a table in the cafe (1440x900 mozjpeg q82, ~242 KB).
- `social-preview.jpg` Open Graph / Twitter / GitHub social card: "Design System" headline (Outfit Black "Design" over Young Serif "System"), a v1.0.0 pill, layered lavender/lime/orange brand blobs, a token colour-swatch row, and the For Everyone wordmark, at 1200x630 (1.91:1) per OG best practice (~48 KB). Also upload this file as the GitHub repo social preview (Settings → General → Social preview).
- `readme-hero.jpg` README hero on GitHub, same composition at 1500x720 (~2.08:1, ~56 KB). Regenerate both cards (design-system-driven HTML rendered with Chromium) via `node scripts/build-og-card.mjs`, then convert the temp PNGs to JPG with ImageMagick (`-resize`, `-quality 84`).

**Current icons:**
- `../favicon.png` — site favicon synced from foreveryone.berlin.
- `../apple-touch-icon.png` — Apple touch icon synced from foreveryone.berlin.
