# Images

Images in this folder are for **design system prototype use only** (design.foreveryone.berlin).

## Photography

Every photograph here is **licensed stock under the [Unsplash License](https://unsplash.com/license)**: free for commercial and non-commercial use, no permission or attribution required, no model release needed from us. Attribution is recorded below anyway, because a provenance record is what makes the licence checkable later.

**Sourcing rule.** A photograph only enters this repo with a licence recorded in this file. Own event photography needs a named photographer and a recorded participant consent before it can be committed; without both, use stock. Never commit a photo whose rights cannot be stated in one line here.

Downloaded 2026-09-12 from `images.unsplash.com` at `?w=2400&q=85`, then cropped and encoded with `sharp` (mozjpeg, progressive, q82). Originals are kept locally in the gitignored `_originals/`.

| File | Slot | Photographer | Unsplash photo | Crop |
|------|------|--------------|----------------|------|
| `hero-cafe.jpg` | Home hero and the `/patterns` "Hero with blob photo" specimen | Toa Heftiba ([@heftiba](https://unsplash.com/@heftiba)) | [`6bKpHAun4d8`](https://unsplash.com/photos/6bKpHAun4d8) (`photo-1485182708500-e8f1f318ba72`) | 1090×1094, cover, attention |
| `card-pottery.jpg` | Switcher card, Arts and Crafts | Pew Nguyen ([@nguyentrungnguyen](https://unsplash.com/@nguyentrungnguyen)) | [`QTuikYkByFs`](https://unsplash.com/photos/QTuikYkByFs) (`photo-1673339065001-a30d6c343cdd`) | 720×450, cover, attention, brightness ×1.12 |
| `card-wellbeing.jpg` | Switcher card, Balance and Wellness | Jaspinder Singh ([@jaspindersingh](https://unsplash.com/@jaspindersingh)) | [`vpVE1Xk1eR4`](https://unsplash.com/photos/vpVE1Xk1eR4) (`photo-1683056255281-e52a141924f0`) | 720×450, cover, attention |
| `card-drawing.jpg` | Switcher card, Expression | Júlia Assis ([@julia_assis](https://unsplash.com/@julia_assis)) | [`D9xb8dJYp5E`](https://unsplash.com/photos/D9xb8dJYp5E) (`photo-1770739879041-22f0dfc37301`) | 720×450, cover, attention |
| `card-community-evening.jpg` | Switcher card, Community Cafe Evening event | Yael Hofnung ([@yayosh](https://unsplash.com/@yayosh)) | [`TiuO1945oQ8`](https://unsplash.com/photos/TiuO1945oQ8) (`photo-1660807304251-9e2012336d19`) | 720×450 from a 2400×1500 band at y=1400, so no head is clipped |

Alt text lives next to each `src` in the components, not here: `app/page.tsx`, `app/patterns/page.tsx`, and the `listings` array in `app/_components/EventsWorkshopsSwitcher.tsx`.

`hero-cafe.jpg` is also the photo inlined by `prototype/scripts/build-guide-og.mjs` for its `photo` card variant.

Card luminance is kept within a narrow band so the four cards read as one row; check a new pick with `node scripts/normalize-workshop-tones.mjs --dry-run`, which reports the mean and the card-crop mean per file.

## Generated cards

These are rendered from the design system by Node scripts, not photographed.

- `social-preview.jpg` Open Graph / Twitter / GitHub social card, `doodle-v1` composition: "ForEveryone Design System" over a Lime Green field, an orange doodle underline, sprout/smiley/swirl marks on the right, a Warm White wave band, at 1200x630 (1.91:1) per OG best practice (~53 KB). No wordmark lockup: the headline already carries the brand name. Also upload this file as the GitHub repo social preview (Settings → General → Social preview).
- `readme-hero.jpg` README hero on GitHub, same composition at 1500x720 (~2.08:1, ~63 KB). Regenerate both cards (design-system-driven HTML rendered with Chromium) via `node scripts/build-og-card.mjs [variant] [outDir]`, then convert the temp PNGs to JPG with ImageMagick (`-resize`, `-quality 84 -strip`). Variants: `doodle` (shipped composition), `blobs` (default flag value, layered brand blobs with a swatch row), `ramp` (OKLCH token scales), `type` (type-scale specimen). Colours are read from the generated `css/custom-properties.css`, so a token change flows into the cards; never hardcode hex in the generator.

- `guide-og-doodle.jpg` Open Graph / social card for the **Belonging Guide** funnel pages on foreveryone.berlin (`/guide`, `/guide-confirmed`), at 1200x630 (~36 KB). Lime Green field, "Belonging in Berlin" over an orange doodle underline, sprout/smiley/swirl marks on the right, Warm White wave band with the horizontal lockup. This is a **website** card, not a design-system card: it is tracked here so the funnel pages have a reviewed source, but it does not replace `social-preview.jpg`. Regenerate with `node prototype/scripts/build-guide-og.mjs [doodle|photo|blobs|all] [outDir]`; output defaults to the gitignored `.artifacts/images/`. Copy deck lives in the `COPY` object at the top of that script. Renders in Outfit, the documented Filson Pro stand-in.

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
