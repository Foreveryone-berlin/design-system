# Color audit — brand palette vs repo (2026)

Official **7-color brand table** (design guide) cross-checked against [`tokens/colors.json`](../tokens/colors.json) and Elementor mapping.

## Phase 0 decisions (implementation authority)

1. **Scope:** The seven swatches are the **canonical brand colors** for hex alignment. **Legacy** tokens (pink, teal, purple, decorative theme blues/greys, `focus-button`, `light-orange`, etc.) **remain** for Elementor slots and existing utilities until a separate deprecation pass; they are **not** in the 7-color table.
2. **Orange (`#FF7A3A`):** Brand guide calls for decorative-only use in some media; **web / Elementor** continues to use the same orange as **primary CTA** (`color.brand-primary`). Descriptions document both: primary actions on site vs. print/slide constraints from brand PDF.
3. **Figma:** Assume Figma variables match this table; repo values were updated to the guide hexes below. Reconcile in Figma if any path still differs.

## Palette vs tokens (matrix)

| Guide name | Guide hex | Token(s) | Before (approx.) | Action |
|------------|-----------|----------|------------------|--------|
| Orange | `#FF7A3A` | `color.brand-primary` | `#FF7A3A` | Keep hex; refresh `$description` |
| Blue | `#3F00EB` | `color.brand-secondary` | `#3F00EB` | Keep hex; note alerts + white type |
| Charcoal | `#1E1E1E` | `color.brand-dark`, `color.theme-2`, `color.theme-8` | `#404040`, `#3A3A3A`, `#424242` | **Align** to charcoal for primary/support text |
| Warm white | `#FDFCF7` | `color.accent` | `#F1F1EA` | **Align** (Elementor Global 4) |
| Lime green | `#D4E6A8` | `color.light-green`, `color.status.success` | `#F1F7E5`, `#D4E8A8` | **Align** (surfaces + success) |
| Lavender | `#D5C5FF` | `color.light-purple` | `#D9CCFB` | **Align** |
| Soft lavender | `#E5DCFF` | `color.soft-lavender` *(new)* | — | **Add** + `build-css.js` key |

## Tokens outside the 7-color set

| Token | Verdict |
|-------|---------|
| `focus-button`, `light-orange`, `pink`, `teal`, `purple`, `very-light-gray`, `light-gray` | **Keep** (Elementor custom slots / UI) |
| `theme-1`, `theme-4`, `theme-5`, `theme-7` | **Keep**; `theme-2`/`theme-8` hex synced to charcoal; `theme-4` remains mid UI text |
| `status.error`, `status.warning` | **Keep** (not in brand table; functional) |
| `base.white`, `base.black` | **Keep**; white pairs with `brand-secondary` per guide |

## Accessibility / pairings (from guide)

- Charcoal text on warm white, lime, soft lavender backgrounds.
- White (`#FFF`) on Blue for alerts/special panels.
- Review any **orange-on-white** utility (CTAs) — not in the short brand list but standard web pattern; `utilities.css` keeps white text on primary buttons.

## Follow-up for editors

After deploy, **Elementor > Global Colors** must be updated manually to match [`elementor/global-colors.md`](../elementor/global-colors.md) hex values.
