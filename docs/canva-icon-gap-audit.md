# Canva icon and visual-element gap audit

**Audited:** 2026-09-08 · **Source:** Canva design `DAGv9G5X55E` "Elements Template Guide & Resource", 11 pages, team-owned, last updated 2026-09-07 · **Against:** `docs/visual-styles.md`, `prototype/public/icons/**`, `prototype/public/illustrations/**`, `prototype/app/_components/ui-glyph-markup.ts`

## Why this exists

The Canva elements guide is the working library the team actually builds social posts, posters and flyers from. The repo carries a much smaller set. This audit records what is in Canva and not in the repo, so the difference is a deliberate decision rather than an accident.

**Figma remains the source of truth for visual decisions** (`docs/AGENTS.md`). A Canva-only element is therefore a *candidate* for the system, not automatically part of it. Every recommendation below is "promote" or "leave in Canva", never "already decided".

## Headline finding

The two biggest gaps are whole categories the repo has essentially no coverage of: a **workshop-activity line-icon set** (page 7, ~12 icons) and a **music instrument set** (page 8, ~9 icons). The repo ships 5 workshop icons and 5 category icons total, so these two pages roughly triple the available iconography.

## Bucket 1 — Missing, and worth promoting

| Canva source | Element | Repo family | Recommendation |
|---|---|---|---|
| p7 Workshop-Related | pencil, paintbrush, easel/canvas, knitting needles + yarn, yarn ball, thread spool + needle, scarf, mittens, scissors, teacup ×2 | Workshop icons — repo has only `chess-filled`, `knitting`, `pottery`, `thread`, `writing` | **Promote.** `knitting`/`thread`/`writing` overlap; the rest are new and directly match the workshop programme. |
| p8 Music | musical notes (×3 forms), treble clef, guitar/ukulele, keyboard, maracas, djembe, boombox, gramophone, record player | Workshop/category icons — repo has one `music.svg` category icon and one `music-note.svg` accent | **Promote a subset.** One category icon cannot carry a music programme. Pick 4–5 that match actual workshops rather than all nine. |
| p4 Arrows | curved arrows at ~5 curvatures, plus a `>>>` chevron cluster | Line illustrations — repo has one `doodle-arrow.svg` | **Promote 2–3.** The step-progression pattern already uses `doodle-arrow`; more curvatures would let it point in more directions. |
| p4 Sparkles | 4-point and 5-point stars, outlined stars, asterisk/starburst forms, in orange/peach/lime/gold | Decorative accents — repo has `sparkle.svg`, `asterisk.svg` | **Promote 2–3 outlined variants.** The repo has filled only. |
| p3 Lines | spiral, squiggles, curl/loop forms, straight-line bundles, radiating dash bursts | Line illustrations — repo has `doodle-swirl`, `doodle-burst`, `doodle-circle`, `doodle-underline` | **Promote the straight-line bundle and radiating dashes.** The spiral and squiggles duplicate `doodle-swirl`. |

## Bucket 2 — Variant of something the repo already has

| Canva source | Element | Repo equivalent | Note |
|---|---|---|---|
| p5 Shapes | ~13 organic blobs, orange and peach | `illustrations/blobs/blob-1…7.svg` | Same visual language. Promote only if a specific silhouette is needed; the repo's 7 already cover the range. |
| p6 Top & Bottom Elements | 7 wave/curve edge fills — corner, single-crest, double-crest, shallow, steep | `illustrations/waves/wave-h1…h3`, `wave-corner-br`, `wave-corner-tr` | Repo has 5 of roughly these 7. The two shallow horizontal variants look genuinely absent. |
| p9 Flowers | 5 flower/sprout marks, outlined and filled | `illustrations/variants/line/flower-variant-1,-2`, `sprout-variant-1` | Close to covered. The filled tan variants have no repo equivalent. |

## Bucket 3 — Missing, recommend leaving in Canva

| Canva source | Element | Why not |
|---|---|---|
| p9 Miscellaneous | cutlery, handshake-heart, speech bubbles, popcorn tubs, drink cups, smiley faces, crosshatch and plus-sign marks | Social-post vocabulary, not product UI. Several are black-stroke, which conflicts with the repo's brand-colour SVG rule enforced by `scripts/svg-standalone-color.mjs`. |
| p1 | "Do not mix stroke weights" / "do not overlap text" guidance | Already implied by the repo's normalisation scripts; a prose rule in `docs/visual-styles.md` would be enough if wanted. |
| p2 | Canva "star whatever" workflow instructions | Tool workflow, not an asset. |

## Bucket 4 — Non-icon findings

- **p10 "Icon Designs" points somewhere else entirely.** The page says the real icon source is the Brand tab under Graphics, or a Google Drive folder (`drive.google.com/drive/u/0/folders/1GfvE0YABDxPH1TM_Vx8fu7a05hfe6mXs`). **The elements guide is not the canonical icon source.** Any promotion effort should start from that Drive folder, not from these thumbnails, and the folder should be recorded in `docs/visual-styles.md` under "Refreshing visual-element SVGs".
- **p11 is a print colour page** giving separate CMYK/RGB/Hex values for *Home Printer* vs *Print Services*: orange `#F79348` / `#F3793E`, green `#E7F0C1` / `#D4E5A7`, lavender `#EADEEE` / `#D0C3E0`, and a deep purple `#635BA8`. The repo has `--color-print-purple-home` and `--color-print-purple-press`, which is the same home-vs-press split, so this page is the upstream source for those tokens. **Two of these are not obviously in the repo**: the home/press orange and green pairs.
  Deliberately not acted on: a second worktree (`design-system-canva-audit`, branch `docs/canva-gap-audit`) currently holds uncommitted changes to `tokens/colors.json`, so touching colour tokens here would collide. Reported only.

## If these get promoted

Adding icons is not a drop-in-a-file operation in this repo:

1. UI glyphs are generated, not authored as files — artwork lives in `prototype/app/_components/ui-glyph-markup.ts` and `prototype/scripts/build-ui-glyphs.mjs` writes the SVGs. Root `npm test` runs it with `--check`, so hand-written files under `public/icons/ui/` will fail CI.
2. Every SVG must pass `scripts/svg-normalize.test.js`, `scripts/svg-validate.test.js`, and `scripts/svg-standalone-color.mjs --check` (assets must carry their brand colour).
3. `prototype/tests/icons.spec.ts` asserts catalog chip counts, so it must be updated in the same change.
4. `docs/visual-styles.md` needs a row per addition, and `prototype/app/visual-elements/page.tsx` needs a catalog entry.

Because of (3) and (4), promotions should land as their own PR per family — one for workshop icons, one for music — rather than as a single bulk import.
