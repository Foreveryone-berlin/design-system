# Images

Images in this folder are for **design system prototype use only** (design.foreveryone.berlin).

- **Source:** foreveryone.berlin (hero, workshop/cafe, community).
- **Usage:** Local prototype only; do not hot-link from production.
- **Production:** Final assets for the live site should be sourced from the main site or asset pipeline.

**Current assets:**
- `community-cafe.png` community cafe scene used as the prototype homepage hero, blob-masked photograph of people at the ForEveryone community cafe (1090x1094 PNG).
- `workshop-group.jpg` workshop card image, photograph of community members laughing around a table in the cafe (1440x900 mozjpeg q82, ~242 KB).
- `social-preview.jpg` Open Graph / Twitter card image, community cafe photograph cropped to 1200x630 (1.91:1) per OG best practice, mozjpeg q82. README-only previews use `readme-hero.jpg` instead.
- `readme-hero.jpg` README hero on GitHub, wide community cafe scene at 1500x720 (~2.08:1), mozjpeg q82 (~179 KB). Regenerate via `node scripts/process-readme-hero.mjs <src> prototype/public/images/readme-hero.jpg`.

**Current icons:**
- `../favicon.png` — site favicon synced from foreveryone.berlin.
- `../apple-touch-icon.png` — Apple touch icon synced from foreveryone.berlin.
