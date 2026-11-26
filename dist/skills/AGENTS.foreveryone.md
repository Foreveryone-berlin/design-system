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

### Skills
- `fe-core`: Core conventions for consuming the ForEveryone Berlin design system. Use when importing CSS variables, resolving tokens, choosing fe-* classes, or deciding whether a colour or font is allowed.
- `fe-design-system`: Route ForEveryone UI work to the design-system sources and the matching consumer skill. Use when asked to use the ForEveryone design system, invoke fe-design-system, or locate brand rules, tokens, component contracts, and integration guidance.
- `photo-curator`: Review photo collections and select ranked shortlists only in the ForEveryone design-system and foreveryone repositories. Use there for photo selection, placeholder replacement, atmosphere matching, or comparing similar photographs.
- `fe-a11y`: Accessibility rules for ForEveryone Berlin UI. Use when checking contrast, keyboard focus, skip links, motion preferences, alt text, or WCAG 2.1 AA conformance.
- `fe-component-authoring`: Author a public fe-* component in this repository. Use when adding a component contract, its CSS, and its states.
- `fe-components`: Prefer documented fe-* component contracts for ForEveryone Berlin UI. Use when building or restyling buttons, cards, inputs, tags, FAQ, header, footer, or related patterns.
- `fe-og-image`: Create on-brand ForEveryone OG images and featured-image artwork. Use for social link previews, WordPress featured images, or reusable image templates with verified copy, brand assets and export quality.
- `fe-redesign`: Restyle an existing web app to the ForEveryone Berlin design system. Use when replacing ad-hoc colours, fonts, and components with tokens and fe-* contracts from this repo.
- `fe-token-authoring`: Author ForEveryone design tokens in this repository. Use when adding, changing, or removing a token and regenerating CSS variables.
- `fe-tokens`: Resolve and apply ForEveryone Berlin design tokens. Use when mapping colours, type, spacing, radius, shadow, or motion to CSS variables, or when extending a palette in OKLCH.

Local copies of these skills are in `fe-skills/`.
Published copies: <https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/index.json>. Refresh with `node bin/fe-ds.mjs skills install`.
