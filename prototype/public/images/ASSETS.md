# Images

Images in this folder are for **design system prototype use only** (design.foreveryone.berlin).

- **Source:** foreveryone.berlin (hero, workshop/cafe, community).
- **Usage:** Local prototype only; do not hot-link from production.
- **Production:** Final assets for the live site should be sourced from the main site or asset pipeline.

**Current assets:**

Recommended alt text (one sentence; describe activity and setting):

| File | Alt text |
|------|----------|
| `community-cafe-home.png` | A warm community gathering in a bright cafe. |
| `yoga-wellbeing.jpg` | People practising yoga together in a bright ForEveryone wellness session. |
| `workshop-pottery.jpg` | People shaping clay together at a table in a bright art studio. |
| `workshop-drawing.jpg` | People holding up colourful portrait drawings at an outdoor table. |
| `Group_2.png` | A group of people together at a ForEveryone community gathering. |

- `community-cafe-home.png` homepage and hero-pattern image from desktop export (1090×1094 RGBA).
- `yoga-wellbeing.jpg` Balance and Wellness / Yoga and Wellbeing Session card image from `23-06-11_Yoga_wellbeing-for-everyone_Berlin_Fotogr.jpg` (1600×1067).
- `workshop-pottery.jpg` Upcoming-workshop card (Arts and Crafts): from `Pottery_group.jpg`, cropped to 720×450 (mozjpeg q80).
- `workshop-drawing.jpg` Upcoming-workshop card (Expression): from `Pottery_couple1.jpg`, cropped to 640×400 with a small tone lift (mozjpeg q82).
- `social-preview.jpg` Open Graph / Twitter / GitHub social card, `doodle-v1` composition: "ForEveryone Design System" over a Lime Green field, an orange doodle underline, sprout/smiley/swirl marks on the right, a Warm White wave band, at 1200x630 (1.91:1) per OG best practice (~53 KB). No wordmark lockup: the headline already carries the brand name. Also upload this file as the GitHub repo social preview (Settings → General → Social preview).
- `readme-hero.jpg` README hero on GitHub, same composition at 1500x720 (~2.08:1, ~63 KB). Regenerate both cards (design-system-driven HTML rendered with Chromium) via `node scripts/build-og-card.mjs [variant] [outDir]`, then convert the temp PNGs to JPG with ImageMagick (`-resize`, `-quality 84 -strip`). Variants: `doodle` (shipped composition), `blobs` (default flag value, layered brand blobs with a swatch row), `ramp` (OKLCH token scales), `type` (type-scale specimen). Colours are read from the generated `css/custom-properties.css`, so a token change flows into the cards; never hardcode hex in the generator.

**Logo-free doodle studies.** `doodle-v1` is the shipped composition; v2 and v3 are kept as comparison candidates. Same palette, marks, and left-aligned stack as `doodle`, but the wordmark lockup is dropped because the headline already reads "ForEveryone", and the hand-drawn marks are scaled up so they read as composition rather than decoration. Headline weight stays at 700. Both sizes of each study render from one config in `prototype/scripts/build-og-card.mjs`:

| Study | Files | What changes vs `doodle` |
|-------|-------|--------------------------|
| `doodle-v1` steady **(shipped)** | `social-preview-doodle-v1.jpg`, `readme-hero-doodle-v1.jpg` — byte-identical to `social-preview.jpg` / `readme-hero.jpg` | Original type size; marks about a third larger; stack lifted clear of the wave band. |
| `doodle-v2` cluster | `social-preview-doodle-v2.jpg`, `readme-hero-doodle-v2.jpg` | Headline at 0.92x; marks ~1.6x and grouped tighter into a right-hand column. |
| `doodle-v3` airy | `social-preview-doodle-v3.jpg`, `readme-hero-doodle-v3.jpg` | Headline at 0.88x and top-anchored; largest marks, spread as a diagonal; subline drops toward the wave band. |

Render a study with `node scripts/build-og-card.mjs doodle-v1 <outDir>` (then the same ImageMagick step as above). To adopt one, copy its two JPGs over `social-preview.jpg` / `readme-hero.jpg`, which are what `app/layout.tsx` (`openGraph` / `twitter`) and the root `README.md` reference.

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
- `../icons/categories/*.svg`, `../icons/workshop/*.svg`, `../icons/social/*.svg` — canonical production icons; no alternate variants are cataloged.
- `../illustrations/**/*.svg` — line illustrations, accent marks, blobs, and waves (see `docs/visual-styles.md`).
