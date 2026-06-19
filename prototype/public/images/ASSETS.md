# Images

Images in this folder are for **design system prototype use only** (design.foreveryone.berlin).

- **Source:** foreveryone.berlin (hero, workshop/cafe, community).
- **Usage:** Local prototype only; do not hot-link from production.
- **Production:** Final assets for the live site should be sourced from the main site or asset pipeline.

**Current assets:**
- `community-cafe.png` community cafe scene used as the prototype homepage hero, blob-masked photograph of people at the ForEveryone community cafe (1090x1094 PNG).
- `workshop-group.jpg` workshop card image, photograph of community members laughing around a table in the cafe (1440x900 mozjpeg q82, ~242 KB).
- `workshop-pottery.jpg` Upcoming-workshop card (Arts and Crafts): people shaping clay at a table in a studio. From a ForEveryone pottery-morning photo (`Pottery_Morning-012025-9173`), cropped to 720x450 and compressed (mozjpeg q80, ~37 KB).
- `workshop-movement.jpg` Upcoming-workshop card (Movement): a group seated in a circle on a wooden floor. From a ForEveryone session photo (`IMG_2849`), portrait source cropped to its lower region for a 720x450 landscape, with a gentle brightness/saturation lift on a dim original (mozjpeg q80, ~57 KB).
- `workshop-drawing.jpg` Upcoming-workshop card (Expression): people holding up colourful portrait drawings at an outdoor table. From a ForEveryone drawing-session photo (`IMG_9544`), cropped to 640x400 with a small tone lift (mozjpeg q82, ~56 KB).
- `social-preview.jpg` Open Graph / Twitter / GitHub social card: bold "Design System" headline, layered lavender/lime/orange brand blobs, a token colour-swatch row, and the ForEveryone wordmark, at 1200x630 (1.91:1) per OG best practice (~48 KB). Also upload this file as the GitHub repo social preview (Settings → General → Social preview).
- `readme-hero.jpg` README hero on GitHub, same composition at 1500x720 (~2.08:1, ~56 KB). Regenerate both cards (design-system-driven HTML rendered with Chromium) via `node scripts/build-og-card.mjs`, then convert the temp PNGs to JPG with ImageMagick (`-resize`, `-quality 84`).

**Logo system** (`logo/`):
- `logo/foreveryone-horizontal.png` — primary horizontal lockup; the official `foreveryone-logo.png` with transparent margins trimmed. Default everywhere.
- `logo/foreveryone-standalone.png` — standalone icon, cropped from the official lockup. Favicons, very small marks, social profile images.
- `logo/foreveryone-wordmark.png` — wordmark only, cropped from the official lockup (used to compose the stacked variant).
- `logo/foreveryone-stacked.png` — stacked lockup (icon over wordmark), composed from the official icon + wordmark crops. Square / portrait slots.
- `logo/no52-wordmark.svg` — **APPROXIMATE in-repo recreation** of the No. 52 Cafe wordmark. Official vector is in Google Drive / Canva Brand Kit (access-restricted); confirm with the brand team before any production use.
- `logo/no52-compact.svg` — **APPROXIMATE in-repo recreation** of the No. 52 compact mark ('52' inside the 'o'). Same access caveat as above.

The ForEveryone lockups above are derived from the official `foreveryone-logo.png`; the No. 52 marks are approximations pending official files. See [`docs/logo-usage.md`](../../../docs/logo-usage.md).

**Current icons:**
- `../favicon.png` — site favicon synced from foreveryone.berlin.
- `../apple-touch-icon.png` — Apple touch icon synced from foreveryone.berlin.
