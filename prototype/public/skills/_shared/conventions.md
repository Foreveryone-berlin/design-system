# ForEveryone design system conventions

Shared reference for every consumer skill. The block between the `agents` markers
is what `node bin/fe-ds.mjs skills install` writes into a project's `AGENTS.md`, so it
has to stand on its own for an agent that reads nothing else.

<!-- agents:start -->

## ForEveryone Berlin design system

This project consumes the [ForEveryone Berlin design system](https://design.foreveryone.berlin).
Follow these rules when writing or editing UI.

1. **Tokens only.** Never invent hex values or font names. Use CSS custom properties from
   `css/custom-properties.css` (`var(--*)`) and resolve names from `spec/tokens.json`
   (or the local `tokens.json` next to these skills).
2. **Digital surface only on the web.** Never use `surface: "print"` tokens
   (`--font-family-accent`, `--color-print-*`, `--color-doc-*`). Filson Pro is digital;
   Young Serif is print only.
3. **Orange is decorative.** `--color-brand-primary` is never a text background. Orange
   icons always carry a text label. Structural exceptions: QR-code border, white standalone
   logo icon on orange (no text).
4. **Blue is alerts only.** `--color-brand-secondary` is for announcements/alerts, always
   with pure white text.
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

<!-- agents:end -->

## Why these rules exist

The Brand Book and colour audit fix contrast and role for every pairing. Agents that invent
colours break contrast and brand. Agents that use print tokens on the web load the wrong
typeface and CMYK chrome. The component contracts in `spec/components/` give one correct
class and state matrix per control so restyles stay deterministic.
