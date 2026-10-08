## ForEveryone Berlin design system

This project consumes the [ForEveryone Berlin design system](https://design.foreveryone.berlin).
Follow these rules when writing or editing UI.

1. **Tokens only.** Never invent hex values or font names. Use CSS custom properties from
   `css/custom-properties.css` (`var(--*)`) and resolve names from `spec/tokens.json`
   (or the local `tokens.json` next to these skills).
2. **Digital surface only on the web.** Never use `surface: "print"` tokens
   (`--font-family-accent`, `--color-print-*`, `--color-doc-*`). Filson Pro is digital;
   Young Serif is print only.
3. **Orange is accent only.** `--color-brand-primary` is never text, a button, a link, or
   a background behind text. Orange icons always carry a text label. Structural exceptions:
   QR-code border, white standalone logo icon on orange (no text).
4. **Blue is flexible, digital only.** `--color-brand-secondary` works for backgrounds and
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

Machine-readable tokens: `spec/tokens.json` or
<https://design.foreveryone.berlin/skills/tokens.json>.
Entry point: <https://design.foreveryone.berlin/llms.txt>.

### Skills
- `fe-core`: Core conventions for consuming the ForEveryone Berlin design system. Use when importing CSS variables, resolving tokens, choosing fe-* classes, or deciding whether a colour or font is allowed.
- `fe-a11y`: Accessibility rules for ForEveryone Berlin UI. Use when checking contrast, keyboard focus, skip links, motion preferences, alt text, or WCAG 2.1 AA conformance.
- `fe-components`: Prefer documented fe-* component contracts for ForEveryone Berlin UI. Use when building or restyling buttons, cards, inputs, tags, FAQ, header, footer, or related patterns.
- `fe-redesign`: Restyle an existing web app to the ForEveryone Berlin design system. Use when replacing ad-hoc colours, fonts, and components with tokens and fe-* contracts from this repo.
- `fe-tokens`: Resolve and apply ForEveryone Berlin design tokens. Use when mapping colours, type, spacing, radius, shadow, or motion to CSS variables, or when extending a palette in OKLCH.

Local copies of these skills are in `fe-skills/`.
Published copies: <https://design.foreveryone.berlin/skills/index.json>. Refresh with `node bin/fe-ds.mjs skills install`.
