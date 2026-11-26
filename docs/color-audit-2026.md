# Colour audit: brand palette vs repo (2026)

The approved October 2026 palette lives in one place: [`tokens/brand-palette.json`](../tokens/brand-palette.json). Everything below the marker is generated from it. Authority: [`brand-book-references.md`](brand-book-references.md). Host-platform colour-slot maps live under [`integrations/`](../integrations/).

## Approved palette

<!-- palette:audit:start -->
Approved brand palette (2026-10), machine-readable in `spec/brand-palette.json`. Only these are brand colours; use the `--color-brand-*` names:

| Colour | HEX | CSS variable | Class | Approved usage |
|---|---|---|---|---|
| Orange | `#FF7A3A` | `--color-brand-orange` | primary | Mandatory accent in every layout, printed piece and social post. Never for text, buttons, links or full backgrounds behind text. |
| Lime Green | `#D4E6A8` | `--color-brand-lime` | primary | Default background. Charcoal text only. |
| Lavender | `#E5DCFF` | `--color-brand-lavender` | primary | Default background. Charcoal text only. |
| Warm White | `#FDFCF7` | `--color-brand-warm-white` | primary | Default background, replacing pure White. Charcoal text only. |
| Navy | `#1F3A6E` | `--color-brand-navy` | primary | Occasional background for covers and standout moments. White text only. |
| Teal | `#0F6E6E` | `--color-brand-teal` | primary | Occasional background for covers and standout moments. White text only. |
| Blue | `#3F00EB` | `--color-brand-blue` | primary | Flexible usage, including backgrounds and primary buttons. White text only. Digital only, never print. |
| Charcoal | `#1E1E1E` | `--color-brand-charcoal` | primary | Text and logo only. Never a full background. |
| White | `#FFFFFF` | `--color-brand-white` | primary | Text and logo only. Never a full background; use Warm White. |
| Pink | `#FADCD2` | `--color-brand-pink` | secondary | Occasional backgrounds, graphs, charts and supportive UI elements. Charcoal text only. |
| Yellow | `#FFD84D` | `--color-brand-yellow` | secondary | Decorative shapes, marks and accents on Navy or Teal backgrounds only. Never for text or backgrounds. |

Deprecated names that look like brand colours but are not:

| Deprecated name | Old value | Meaning |
|---|---|---|
| `--color-pink` | `#F39EBC` | Not brand pink. Use `--color-brand-pink` for brand work. Old value kept as `--color-legacy-pink`. |
| `--color-teal` | `#03C9D3` | Not brand teal. Use `--color-brand-teal` for brand work. Old value kept as `--color-legacy-teal`. |
| `--color-light-purple` | `#D5C5FF` | Not brand lavender. Use `--color-brand-lavender` for brand work. Old value kept as `--color-legacy-light-purple`. |

Technical, status, ramp, legacy, and print tokens are not brand colours. Do not offer them as the palette.
<!-- palette:audit:end -->

Pairings and aliases: [`spec/brand-palette.md`](../spec/brand-palette.md). Machine-readable: [`spec/brand-palette.json`](../spec/brand-palette.json).

## Token classes

Every colour token has one class in `spec/tokens.json` (`class`), assigned in `tokens/brand-palette.json`. Only `brand` tokens, and `alias` or `semantic` tokens that resolve to them, are the brand palette.

| Class | Meaning | Examples |
|---|---|---|
| `brand` | Approved palette, canonical names | `color.brand.teal` |
| `alias` | Older name for a brand colour, same value | `color.teal-deep`, `color.blush` |
| `semantic` | Role name resolving to a brand colour | `color.background-soft` |
| `technical` | Focus, host-theme compatibility, neutral greys | `color.theme-1`, `color.focus-button` |
| `status` | Form and state feedback | `color.status.error` |
| `ramp` | Tonal steps per hue | `color.lavender.500` (not brand Lavender) |
| `legacy` | Outside the approved palette, or deprecated clashing names | `color.legacy.teal`, `color.pink` |
| `print` | Print or document chrome only | `color.print.purple-home` |

## Interactive states

Orange left every resting button fill, link, tag, and dropdown. Button hover and pressed states keep Orange (`color.brand.orange`, `color.focus-button`) pending brand-team confirmation. Tag, chip, and active-item tints use Pink. Page and header backgrounds use Warm White.

Print values for the October 2026 colours are still being set; confirm with the brand team before print use. Live pairing demo: `/foundations#color-combinations` in the prototype.

## Deprecation

Deprecated names stay in `css/custom-properties.css` with unchanged values so consumers do not break. Authored code in this repo must not use them (`npm test` enforces it). Removal is planned for 2.0.
