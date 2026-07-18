# Logo usage

Source: **ForEveryone Brand Book v1.0 (June 2026)**, p.10–15 (Logo system, variations,
background combinations, incorrect usage, No. 52 Cafe logos). See
[`docs/brand-book-references.md`](brand-book-references.md) for the authority matrix.
The repo ships `prototype/public/images/foreveryone-logo.png` (600×110, RGBA) and uses it
in the prototype sidebar + mobile header. This document records the rules the Brand Book
sets so any asset additions follow them.

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

## Background combinations (1 background → 1 logo colour)

Brand Book v1.0 p.12: each approved background has exactly one correct logo
colour. There are no exceptions.

| Background | Logo colour | Notes |
|---|---|---|
| Lime Green `#D4E6A8` | Charcoal `#1E1E1E` | Light background |
| Soft Lavender `#E5DCFF` | Charcoal `#1E1E1E` | Light background. Never use Lavender `#D5C5FF` as a logo background — use Soft Lavender. |
| Warm White `#FDFCF7` | Charcoal `#1E1E1E` | Light background |
| Blue `#3F00EB` | White `#FFFFFF` | Pure white, **not** Warm White |
| Orange `#FF7A3A` | White **standalone icon only** | Social profile images + print covers; **no text** on the orange background; never the full wordmark |

These rules apply equally to all three variations: horizontal, stacked, and
standalone icon.

## Logo on photography

Never place the logo directly on a photograph; busy backgrounds make it
illegible. Always place it on a brand-coloured **blob** shape over the photo
(Brand Book v1.0 p.13):

- Only three blob colours: **Lime Green**, **Soft Lavender**, **Warm White**.
- The blob must extend at least **1X beyond the logo on all sides**, so the
  full safe zone sits within the blob.
- No Orange blob with the full wordmark. No gradient or pattern fill on the blob.
- Warm White works best as a secondary layer behind a coloured blob.

## Effects and recolouring

- Never recolour the wordmark to a single tint. Never apply effects (drops,
  outlines, blurs, gradients) to the logo.
- Never use the older version of the mark with sharp edges; the current mark
  has rounded forms (Brand Book v1.0 p.14).

## No. 52 Cafe logos

No. 52 Cafe has its own mark (Brand Book v1.0 p.15):

- **Primary:** the `No. 52` wordmark for cafe signage, menus, and social media.
- **Secondary (compact):** `52` set inside the circular `o`, for small or square
  formats (favicons, profile pictures). Use the wordmark wherever it fits; use
  the compact mark only when it does not.
- **Clear space:** X = **half the height of the `N`** in `No. 52`, on all sides.
- **Minimum sizes:** primary 32 px / 8 mm; secondary 40 px / 10 mm.
- **Colour:** Charcoal on light backgrounds (Lime, Soft Lavender, Warm White);
  White on Blue or photographic overlays. Background-combination and
  incorrect-usage rules above apply equally.

## Incorrect usage (do not)

Brand Book v1.0 p.14 — never: stretch/distort, rotate/tilt, change transparency,
add shadows/effects, recreate in another typeface, outline, recolour, use below
minimum size, place the full wordmark on an Orange background, crop the logo,
use the older sharp-edged version, or place the logo directly on a photograph.

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

## Alt text

Use short, literal alt text. Do not start with "logo of" or "image of".

| Context | Asset | Recommended alt |
|---------|-------|-----------------|
| Navigation / header link | Horizontal lockup | `ForEveryone` |
| Logo page / documentation | Horizontal lockup | `ForEveryone horizontal logo` |
| Logo page / documentation | Stacked lockup | `ForEveryone stacked logo` |
| Logo page / documentation | Standalone icon | `ForEveryone standalone icon` |
| Favicon / app icon | Standalone icon | `ForEveryone` (or site name in `<title>` carries the name; alt may match) |
| White icon on Orange | Standalone icon only | `ForEveryone` |
| Background pairing demo | Lockup on named background | `ForEveryone logo on {background name}` |

When the logo sits inside a link to the homepage, the link's accessible name can be "ForEveryone"; the image alt may be empty only if the link already has visible text (prefer non-empty alt for clarity).

## Files

- `prototype/public/images/foreveryone-logo.png` — original horizontal lockup
  used by the prototype header/sidebar.
- `prototype/public/images/logo/foreveryone-horizontal.png` — trimmed horizontal
  lockup (derived from the official PNG).
- `prototype/public/images/logo/foreveryone-stacked.png` — stacked lockup
  (icon over wordmark), composed from the official icon + wordmark.
- `prototype/public/images/logo/foreveryone-standalone.png` — standalone icon,
  cropped from the official lockup.
- `prototype/public/images/logo/no52-wordmark.svg`,
  `prototype/public/images/logo/no52-compact.svg` — **approximate** No. 52 Cafe
  marks pending official vector files.
- `prototype/public/favicon.png` and `apple-touch-icon.png` — synced from
  foreveryone.berlin, used as the standalone icon at favicon sizes.

All assets are registered in
[`prototype/public/images/ASSETS.md`](../prototype/public/images/ASSETS.md).
The ForEveryone lockups derive from the official PNG; the No. 52 marks are
approximations to be replaced with official vectors from the brand team.

## Related

- [`docs/visual-styles.md`](visual-styles.md) — illustrations, blobs, photography.
- [`docs/color-audit-2026.md`](color-audit-2026.md) — approved background ⇄ text combinations.
- [`elementor/global-colors.md`](../elementor/global-colors.md) — Global 2 (Orange) is decorative only.
