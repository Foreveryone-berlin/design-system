# Logo usage

Source: 2026 Quick Brand Guidelines, Ver 2.0. The repo currently ships
`prototype/public/images/foreveryone-logo.png` (600×110, RGBA) and uses it
in the prototype sidebar + mobile header. Wordmark / standalone variants are
not yet in the repo; this document records the rules the brand guide sets
so any future asset additions follow them.

## The X measurement

> **X = the height of the large "F" in "For Everyone".**

All clear-space and sizing rules are derived from X, not pixel constants,
so the logo scales correctly at any size.

## Variants and when to use each

| Variant | Use |
|---|---|
| **Primary (horizontal wordmark)** | Default everywhere headers, footers, navigation, marketing. Safe zone: **1X** clear on all sides. |
| **Stacked** | Square or narrow horizontal slots where the primary logo would compress. Safe zone: **1X** clear around the entire unit, measured against the width of the main icon. |
| **Standalone icon** | Only when the wordmark is illegible (favicons, very small UI marks). Safe zone: **1X** clear on all sides. |

## Minimum sizes

- **Digital:** 32 px tall, measured at the largest character (the "F").
- **Print:** 8 mm tall.

Never scale below these sizes; legibility breaks below them.

## Color and background rules

- Always preserve original colors on white, warm white, lime green, soft
  lavender, lavender, or photographic backgrounds with strong contrast.
- **White standalone icon on orange (`#FF7A3A`) background** is the only
  approved orange-background composition:
  - Allowed for **social media profile images** and **print cover
    applications** (brochures, booklets, reports).
  - **No text may appear on the orange background** when used this way.
- Never recolor the wordmark to a single tint. Never apply effects (drops,
  outlines, blurs, gradients) to the logo.

## Safe zone (1X)

```
            ┌───────────────────────────────────┐
            │  X                                │
            │    ┌─────────────────────────┐    │
            │  X │       LOGO ART          │  X │
            │    └─────────────────────────┘    │
            │                                X  │
            └───────────────────────────────────┘
```

No other element (text, image, container edge) may enter the X-thick band
around the logo on any side.

## Files

- `prototype/public/images/foreveryone-logo.png` — horizontal wordmark used
  by the prototype.
- `prototype/public/favicon.png` and `apple-touch-icon.png` — synced from
  foreveryone.berlin, used as the standalone icon at favicon sizes.

When the dedicated wordmark / stacked / standalone SVG variants are added,
register them in [`prototype/public/images/ASSETS.md`](../prototype/public/images/ASSETS.md)
and update this document with the file paths.

## Related

- [`docs/visual-styles.md`](visual-styles.md) — illustrations, blobs, photography.
- [`docs/color-audit-2026.md`](color-audit-2026.md) — approved background ⇄ text combinations.
- [`elementor/global-colors.md`](../elementor/global-colors.md) — Global 2 (Orange) is decorative only.
