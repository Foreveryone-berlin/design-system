# Images

Images in this folder are for **design system prototype use only** (design.foreveryone.berlin).

- **Source:** foreveryone.berlin (hero, workshop/cafe, community).
- **Usage:** Local prototype only; do not hot-link from production.
- **Production:** Final assets for the live site should be sourced from the main site or asset pipeline.

**Current assets:**
- `community-cafe.png` community cafe scene used as the prototype homepage hero, blob-masked photograph of people at the ForEveryone community cafe (1090x1094 PNG).
- `workshop-group.jpg` workshop card image, photograph of community members laughing around a table in the cafe (1440x900 mozjpeg q82, ~242 KB).
- `workshop-pottery.jpg` Upcoming-workshop card (Arts and Crafts): people shaping clay at a table in a studio. From a ForEveryone pottery-morning photo (`Pottery_Morning-012025-9173`), cropped to 720x450 and compressed (mozjpeg q80, ~37 KB).
- `workshop-drawing.jpg` Upcoming-workshop card (Expression): people holding up colourful portrait drawings at an outdoor table. From a ForEveryone drawing-session photo (`IMG_9544`), cropped to 640x400 with a small tone lift (mozjpeg q82, ~56 KB). The second upcoming-workshop card reuses `workshop-group.jpg` (above) rather than a distinct photo.
- `social-preview.jpg` Open Graph / Twitter / GitHub social card: bold "Design System" headline, layered lavender/lime/orange brand blobs, a token colour-swatch row, and the ForEveryone wordmark, at 1200x630 (1.91:1) per OG best practice (~48 KB). Also upload this file as the GitHub repo social preview (Settings → General → Social preview).
- `readme-hero.jpg` README hero on GitHub, same composition at 1500x720 (~2.08:1, ~56 KB). Regenerate both cards (design-system-driven HTML rendered with Chromium) via `node scripts/build-og-card.mjs`, then convert the temp PNGs to JPG with ImageMagick (`-resize`, `-quality 84`).

**Logo system** (`logo/`):
- `logo/foreveryone-horizontal.png` — primary horizontal lockup; the official `foreveryone-logo.png` with transparent margins trimmed. Default everywhere.
- `logo/foreveryone-standalone.png` — standalone icon, cropped from the official lockup. Favicons, very small marks, social profile images.
- `logo/foreveryone-wordmark.png` — wordmark only, cropped from the official lockup (used to compose the stacked variant).
- `logo/foreveryone-stacked.png` — stacked lockup (icon over wordmark), composed from the official icon + wordmark crops. Square / portrait slots.
- `logo/no52-wordmark.svg` — in-repo redraw of the No. 52 Cafe **primary** wordmark, traced from Brand Book v1.0 p.15 (the "No52" ligature: heavy N, raised superscript 'o', large overlapping 5 and 2). `currentColor`, self-contained vector paths (no web font). Official vector is in Google Drive / Canva Brand Kit (access-restricted); replace for production use.
- `logo/no52-compact.svg` — in-repo redraw of the No. 52 **compact** mark, traced from Brand Book v1.0 p.15 (the "Secondary": heavy N joined to a solid disc holding a reversed-out '52'). `currentColor`, self-contained vector paths. Same access caveat as above.

The ForEveryone lockups above are derived from the official `foreveryone-logo.png`; the No. 52 marks are Brand-Book-traced redraws pending the official Brand Kit vectors. See [`docs/logo-usage.md`](../../../docs/logo-usage.md).

**Current icons:**
- `../favicon.png` — site favicon synced from foreveryone.berlin.
- `../apple-touch-icon.png` — Apple touch icon synced from foreveryone.berlin.
