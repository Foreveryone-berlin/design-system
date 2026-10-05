# Color audit — brand palette vs repo (2026)

Official **7-color brand table** cross-checked against [`tokens/colors.json`](../tokens/colors.json). Host-platform colour-slot maps live under [`integrations/`](../integrations/).

> **Source of truth:** **ForEveryone Brand Book v1.0 (June 2026)** — see [`docs/brand-book-references.md`](brand-book-references.md). The Brand Book confirms the seven hexes below unchanged from the earlier Quick Brand Guidelines v2.0 (April 2026), which is now a superseded condensed reference only.

## October 2026 palette update

Announced by the brand team ahead of Brand Book v2.0 and loaded into the Canva Brand Kit. It applies to digital work now; print values are still being determined, so print use needs sign-off from the brand team (see the prototype Print page). It supersedes the September 2026 brand-board reconciliation: Warm White and Lime Green return to `#FDFCF7` and `#D4E6A8`.

| Colour | Hex | Token | Rule |
|---|---|---|---|
| Orange | `#FF7A3A` | `color.brand-primary` | Accent only; must appear in every layout, printed piece, and social post. Never text, buttons, or links; never a full background behind text. |
| Lime Green | `#D4E6A8` | `color.light-green`, `color.background-title` | Default background; Charcoal text only. |
| Lavender | `#E5DCFF` | `color.soft-lavender`, `color.background-soft` | Default background; Charcoal text only. |
| Warm White | `#FDFCF7` | `color.accent`, `color.background-default` | Default background; Charcoal text only. Replaces white for full backgrounds. |
| Navy | `#1F3A6E` | `color.navy` | Occasional backgrounds for covers and standout moments; white text only. |
| Teal | `#0F6E6E` | `color.teal-deep` | Occasional backgrounds for covers and standout moments; white text only. |
| Blue | `#3F00EB` | `color.brand-secondary`, `color.background-alert` | Flexible use, no longer announcements-only; white text only; digital only, never print. |
| Charcoal | `#1E1E1E` | `color.brand-dark` | Text and logo only; never a full background. |
| White | `#FFFFFF` | `color.base.white` | Text and logo only; never a full background. |
| Pink (secondary) | `#FADCD2` | `color.blush` | Occasional backgrounds and supportive elements (charts, UI); Charcoal text only. |
| Yellow (secondary) | `#FFD84D` | `color.yellow` | Decorative shapes and marks on Navy or Teal only; never text or a background. |

**Interactive states.** Orange left every button, link, tag, and dropdown. Button hover and pressed states step down the Blue ramp (`color.blue.600` `#3200BC`, `color.blue.700` `#26008D`); tag, chip, and active-item tints use Pink. Page and header backgrounds moved from white to Warm White.

**Pending Brand Book v2.0.** Tokens outside the list above stay in place for existing consumers and are marked pending in their descriptions: `magenta`, `red`, `warm-grey-light`, `warm-grey`, `pink` (`#F39EBC`), `teal` (`#03C9D3`), `purple`, `light-purple` (`#D5C5FF`), `lavender-official`.

## Phase 0 decisions (implementation authority)

1. **Scope:** The seven swatches are the **canonical brand colors** for hex alignment. **Legacy** tokens (pink, teal, purple, decorative theme blues/greys, `focus-button`, `light-orange`, etc.) **remain** for existing utilities and host-platform maps until a separate deprecation pass; they are **not** in the 7-color table.
2. **Orange (`#FF7A3A`):** Decorative-only per Brand Book v1.0. **Web primary text buttons** use Blue fill with white text (`.fe-btn-primary`, as before 0.25.0; restored in 0.25.1). Orange remains for icon fills, borders, and accents.
3. **Figma:** Assume Figma variables match this table; repo values were updated to the guide hexes below. Reconcile in Figma if any path still differs.

## Palette vs tokens (matrix)

| Guide name | Guide hex | Token(s) | Before (approx.) | Action |
|------------|-----------|----------|------------------|--------|
| Orange | `#FF7A3A` | `color.brand-primary` | `#FF7A3A` | Keep hex; refresh `$description` |
| Blue | `#3F00EB` | `color.brand-secondary` | `#3F00EB` | Keep hex; note alerts + white type |
| Charcoal | `#1E1E1E` | `color.brand-dark`, `color.theme-2`, `color.theme-8` | `#404040`, `#3A3A3A`, `#424242` | **Align** to charcoal for primary/support text |
| Warm white | `#FDFCF7` | `color.accent` | `#F1F1EA` | **Align** |
| Lime green | `#D4E6A8` | `color.light-green`, `color.status.success` | `#F1F7E5`, `#D4E8A8` | **Align** (surfaces + success) |
| Lavender | `#D5C5FF` | `color.light-purple` | `#D9CCFB` | **Align** |
| Soft lavender | `#E5DCFF` | `color.soft-lavender` *(new)* | — | **Add** + `build-css.js` key |

## Tokens outside the 7-color set

| Token | Verdict |
|-------|---------|
| `focus-button`, `light-orange`, `pink`, `teal`, `purple`, `very-light-gray`, `light-gray` | **Keep** (UI / accent surfaces; host-platform slot maps live under `integrations/`) |
| `theme-1`, `theme-4`, `theme-5`, `theme-7` | **Keep**; `theme-2`/`theme-8` hex synced to charcoal; `theme-4` remains mid UI text |
| `status.error`, `status.warning` | **Keep** (not in brand table; functional) |
| `base.white`, `base.black` | **Keep**; white pairs with `brand-secondary` per guide |
| `print.purple-home` `#6A5AA7`, `print.purple-press` `#674DA0` | **Print only** (Brand Book v1.0 p.17). CMYK substitute for Blue; emitted as `--color-print-*`, never used on web. |
| `doc.grey-light` `#F0EDE7`, `doc.grey-dark` `#D7D2CB` | **Document chrome only** (Brand Book v1.0 p.17). Brand-book table/note greys; not the brand palette; emitted as `--color-doc-*`. |

## Accessibility / pairings (from guide)

- Charcoal text on Warm White, Lime Green, Lavender, and Pink backgrounds.
- White (`#FFF`) on Blue, Navy, and Teal.
- **Orange is accent only as of October 2026.** Never text, buttons, links, or a background behind text. Primary CTA style is Blue fill with white text. Category tag Music uses pink.

## Approved background ⇄ text combinations

Source: **October 2026 palette update**, replacing Brand Book v1.0 p.18 until Brand Book v2.0. Codified as semantic tokens in `tokens/colors.json` (`background-default|soft|title|alert`, `accent-icon|border`) and surfaced as CSS variables `--color-background-*`, `--color-accent-*`.

| Background | Text | Token alias | Use |
|---|---|---|---|
| Warm White `#FDFCF7` | Charcoal | `--color-background-default` | Default background |
| Lavender `#E5DCFF` | Charcoal | `--color-background-soft` | Default background |
| Lime Green `#D4E6A8` | Charcoal | `--color-background-title` | Default background |
| Pink `#FADCD2` | Charcoal | `--color-blush` | Supportive UI, charts |
| Navy `#1F3A6E` | White | `--color-navy` | Covers, standout moments |
| Teal `#0F6E6E` | White | `--color-teal-deep` | Covers, standout moments |
| Blue `#3F00EB` | White | `--color-background-alert` | Digital only |

**Disallowed:** Orange `#FF7A3A` behind text, and on buttons or links in any state. Yellow `#FFD84D` as text or a background. White and Charcoal as full backgrounds.
Orange is allowed in filled-icon glyphs (orange shape, white glyph), blobs, marks, and decorative borders.

Live demo: `/foundations#color-combinations` in the prototype renders the valid pairs and the disallowed orange-background case for editor reference.

## Follow-up for editors

After deploy, sync any host-platform globals that map these tokens; see [`integrations/README.md`](../integrations/README.md).
