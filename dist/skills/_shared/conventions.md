# ForEveryone design system conventions

Shared reference for every consumer skill. The block between the `agents` markers
is what `node bin/fe-ds.mjs skills install` writes into a project's `AGENTS.md`, so it
has to stand on its own for an agent that reads nothing else.

<!-- agents:start -->

## ForEveryone Berlin design system

This project consumes the [ForEveryone Berlin design system](https://github.com/Foreveryone-berlin/design-system).
Follow these rules when writing or editing UI.

0. **The brand palette is closed.** Only the eleven `--color-brand-*` colours below are brand
   colours. Every other colour token (legacy, technical, status, ramp, print) is not brand,
   whatever its name suggests. Never pick a brand colour by name from another token.
1. **Tokens only.** Never invent hex values or font names. Use CSS custom properties from
   `css/custom-properties.css` (`var(--*)`) and resolve names from `spec/tokens.json`
   (or the local `tokens.json` next to these skills).
2. **Digital surface only on the web.** Never use `surface: "print"` tokens
   (`--font-family-accent`, `--color-print-*`, `--color-doc-*`). Filson Pro is digital;
   Young Serif is print only.
3. **Orange is accent only.** `--color-brand-orange` is never text, a button, a link, or
   a background behind text. Orange icons always carry a text label. Structural exceptions:
   QR-code border, white standalone logo icon on orange (no text).
4. **Blue is flexible, digital only.** `--color-brand-blue` works for backgrounds and
   primary buttons, always with pure white text. White and Charcoal are never full
   backgrounds; use Warm White.
5. **Body text is Charcoal on light backgrounds.** Body line-height never below 1.5;
   letter-spacing is 0%. Use only the approved background ⇄ text pairings in
   `spec/principles.md`.
6. **Classes are `fe-*`.** Prefer documented contracts in `spec/components/*.md` over
   ad-hoc styles. Do not invent new public class names outside that vocabulary.
7. **Extend in OKLCH.** If a shade is missing, hold hue and lightness, step chroma.
   Never introduce a new hex literal.
8. **Respect focus and motion.** Never remove visible keyboard focus. Honour
   `prefers-reduced-motion`.

<!-- palette:agents:start -->
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
<!-- palette:agents:end -->

Brand palette (canonical): `spec/brand-palette.json` or
<https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/brand-palette.json>.
Machine-readable tokens: `spec/tokens.json` or
<https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/tokens.json>.
Entry point: <https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/llms.txt>.

<!-- agents:end -->

## Why these rules exist

The Brand Book and colour audit fix contrast and role for every pairing. Agents that invent
colours break contrast and brand. Agents that use print tokens on the web load the wrong
typeface and CMYK chrome. The component contracts in `spec/components/` give one correct
class and state matrix per control so restyles stay deterministic.
