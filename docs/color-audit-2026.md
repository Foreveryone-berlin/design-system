# Color audit — brand palette vs repo (2026)

Official **7-color brand table** cross-checked against [`tokens/colors.json`](../tokens/colors.json) and Elementor mapping.

> **Source of truth:** **ForEveryone Brand Book v1.0 (June 2026)** — see [`docs/brand-book-references.md`](brand-book-references.md). The Brand Book confirms the seven hexes below unchanged from the earlier Quick Brand Guidelines v2.0 (April 2026), which is now a superseded condensed reference only.

## September 2026 reconciliation (brand board)

The live brand board carries a 2026 palette that had drifted from the repo. Two of the seven canonical hexes were one digit off and are now corrected; eight further board colours had no token at all and were added.

**Corrected:**

| Colour | Was | Now | Contrast on Charcoal |
|---|---|---|---|
| Warm white (`color.accent`, `color.background-default`) | `#FDFCF7` | `#FDFCF6` | 16.22:1 |
| Lime green (`color.light-green`, `color.background-title`, `color.status.success`, `color.green.500`) | `#D4E6A8` | `#D4E6AB` | 12.47:1 |

**Added** (decorative and extended-palette use; none replaces a canonical brand colour):

| Token | Hex | Board row | Contrast |
|---|---|---|---|
| `color.teal-deep` | `#0F6E6E` | Primary | 6.04:1 on white text |
| `color.magenta` | `#BE2A6B` | Primary | 5.63:1 on white text |
| `color.navy` | `#1F3A6E` | Primary | 11.12:1 on white text |
| `color.blush` | `#FADCD2` | Secondary | 12.89:1 on Charcoal |
| `color.yellow` | `#F6C445` | Secondary | 10.24:1 on Charcoal |
| `color.red` | `#C43A2E` | Secondary | 5.26:1 on white text |
| `color.warm-grey-light` | `#C9BFAE` | Neutral | 9.17:1 on Charcoal |
| `color.warm-grey` | `#989389` | Neutral | 5.45:1 on Charcoal |

`color.teal-deep` is distinct from the existing decorative `color.teal` (`#03C9D3`, Elementor Custom 6), and `color.red` is distinct from `color.status.error` (`#DC2626`, the form-error signal). The board also shows a fourth interface state, **Announce**, alongside Success/Warning/Error; that panel is a flattened image on the board, so the colour→state mapping is not yet readable and `color.status` is unchanged.

## Phase 0 decisions (implementation authority)

1. **Scope:** The seven swatches are the **canonical brand colors** for hex alignment. **Legacy** tokens (pink, teal, purple, decorative theme blues/greys, `focus-button`, `light-orange`, etc.) **remain** for Elementor slots and existing utilities until a separate deprecation pass; they are **not** in the 7-color table.
2. **Orange (`#FF7A3A`):** Decorative-only per Brand Book v1.0. **Web primary text buttons** use Blue fill with white text (`.fe-btn-primary`, as before 0.25.0; restored in 0.25.1). Orange remains for icon fills, borders, and accents.
3. **Figma:** Assume Figma variables match this table; repo values were updated to the guide hexes below. Reconcile in Figma if any path still differs.

## Palette vs tokens (matrix)

| Guide name | Guide hex | Token(s) | Before (approx.) | Action |
|------------|-----------|----------|------------------|--------|
| Orange | `#FF7A3A` | `color.brand-primary` | `#FF7A3A` | Keep hex; refresh `$description` |
| Blue | `#3F00EB` | `color.brand-secondary` | `#3F00EB` | Keep hex; note alerts + white type |
| Charcoal | `#1E1E1E` | `color.brand-dark`, `color.theme-2`, `color.theme-8` | `#404040`, `#3A3A3A`, `#424242` | **Align** to charcoal for primary/support text |
| Warm white | `#FDFCF6` | `color.accent` | `#F1F1EA` | **Align** (Elementor Global 4) |
| Lime green | `#D4E6AB` | `color.light-green`, `color.status.success` | `#F1F7E5`, `#D4E8A8` | **Align** (surfaces + success) |
| Lavender | `#D5C5FF` | `color.light-purple` | `#D9CCFB` | **Align** |
| Soft lavender | `#E5DCFF` | `color.soft-lavender` *(new)* | — | **Add** + `build-css.js` key |

## Tokens outside the 7-color set

| Token | Verdict |
|-------|---------|
| `focus-button`, `light-orange`, `pink`, `teal`, `purple`, `very-light-gray`, `light-gray` | **Keep** (Elementor custom slots / UI) |
| `theme-1`, `theme-4`, `theme-5`, `theme-7` | **Keep**; `theme-2`/`theme-8` hex synced to charcoal; `theme-4` remains mid UI text |
| `status.error`, `status.warning` | **Keep** (not in brand table; functional) |
| `base.white`, `base.black` | **Keep**; white pairs with `brand-secondary` per guide |
| `print.purple-home` `#6A5AA7`, `print.purple-press` `#674DA0` | **Print only** (Brand Book v1.0 p.17). CMYK substitute for Blue; emitted as `--color-print-*`, never used on web. |
| `doc.grey-light` `#F0EDE7`, `doc.grey-dark` `#D7D2CB` | **Document chrome only** (Brand Book v1.0 p.17). Brand-book table/note greys; not the brand palette; emitted as `--color-doc-*`. |

## Accessibility / pairings (from guide)

- Charcoal text on warm white, lime, soft lavender backgrounds.
- White (`#FFF`) on Blue for alerts/special panels.
- **Orange is decorative only as of May 2026.** Orange-as-background with white text is disallowed. Primary CTA style is Blue fill with white text (reverted in 0.25.1). Category tag Music uses pink, not alert blue.

## Approved background ⇄ text combinations

Source: **Brand Book v1.0 (June 2026)**, p.18 (accessibility combinations) and p.16–17 (palette). Codified as semantic tokens in `tokens/colors.json` (`background-default|soft|title|alert`, `accent-icon|border`) and surfaced as CSS variables `--color-background-*`, `--color-accent-*`.

| Background           | Text       | Token alias                    | Use                                    |
|----------------------|------------|--------------------------------|----------------------------------------|
| Warm White `#FDFCF6` | Charcoal   | `--color-background-default`   | Text-heavy content                     |
| Soft Lavender `#E5DCFF` | Charcoal | `--color-background-soft`     | Cards, decorative content blocks       |
| Lime Green `#D4E6AB` | Charcoal   | `--color-background-title`     | Title areas only                       |
| Blue `#3F00EB`       | White      | `--color-background-alert`     | Special announcements / alerts         |
| Charcoal `#1E1E1E`   | Warm White | `--color-brand-dark` + `--color-accent` | Dark sections (rare)         |

**Disallowed:** Orange `#FF7A3A` as background with white text (low contrast).
Orange + Charcoal is allowed only inside small filled-icon glyphs (orange shape, white glyph) or as decorative accent borders — never as a section or button background containing text.

Live demo: `/tokens#color-combinations` in the prototype renders the five valid pairs and the disallowed orange-background case for editor reference.

## Follow-up for editors

After deploy, **Elementor > Global Colors** must be updated manually to match [`elementor/global-colors.md`](../elementor/global-colors.md) hex values.
