# Images

Images in this folder are for **design system prototype use only** (design.foreveryone.berlin).

- **Source:** foreveryone.berlin (hero, workshop/cafe, community).
- **Usage:** Local prototype only; do not hot-link from production.
- **Production:** Final assets for the live site should be sourced from the main site or asset pipeline.

**Current assets:**

Recommended alt text (one sentence; describe activity and setting):

| File | Alt text |
|------|----------|
| `community-cafe.png` | Three people sit and chat at a wooden table in the ForEveryone community cafe, lit by afternoon sun. |
| `workshop-group.jpg` | People practising yoga together in a bright ForEveryone wellness session. |
| `workshop-pottery.jpg` | People shaping clay together at a table in a bright art studio. |
| `workshop-drawing.jpg` | People holding up colourful portrait drawings at an outdoor table. |

- `community-cafe.png` homepage hero blob from `community-cafe-home.png` (Desktop export, 1090×1094 RGBA). Stored losslessly in `_originals/`; shipped as palette PNG (~549 KB, quality 100) after tone lift to match workshop cards.
- `workshop-group.jpg` Balance and Wellness card image; yoga/wellbeing photograph from brand export (`Yoga.jpeg`), cropped to 1440×900 and compressed (mozjpeg q82). Also reused by the second upcoming-workshop card.
- `workshop-pottery.jpg` Upcoming-workshop card (Arts and Crafts): from `Pottery_group.jpg`, cropped to 720×450 (mozjpeg q80).
- `workshop-drawing.jpg` Upcoming-workshop card (Expression): from `Pottery_couple1.jpg`, cropped to 640×400 with a small tone lift (mozjpeg q82).
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
- `../icons/categories/*.svg` — five canonical workshop category glyphs (Figma or desktop export; normalized by `scripts/import-figma-elements.mjs` or `scripts/import-desktop-elements.mjs`).
- `../icons/workshop/*.svg` — activity/subcategory filled icons (knitting, pottery, thread, chess, writing) for cards and filters; `.fe-workshop-icon--sm|--md|--lg` size tiers.
- `../icons/social/*.svg` — footer/contact glyphs (Facebook, Instagram, LinkedIn, email, location); dark fills normalized to `currentColor`.
- `../icons/variants/**/*` — alternate Canva-export icon variants cataloged for components documentation; canonical production defaults remain in `categories/`, `workshop/`, and `social/`.
- `../illustrations/**/*.svg` — line illustrations, accent marks, blobs, and waves (see `docs/visual-styles.md`).
