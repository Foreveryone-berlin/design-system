---
name: fe-tokens
description: Resolve and apply ForEveryone Berlin design tokens. Use when mapping colours, type, spacing, radius, shadow, or motion to CSS variables, or when extending a palette in OKLCH.
metadata:
  foreveryone: ">=1.9.0 <2.0.0"
  requires: "fe-core"
  docs: "llms.txt, spec/brand-palette.json, spec/tokens.json, spec/principles.md, docs/token-naming.md"
  guide: "Resolve token names and extend the palette by role."
---

# ForEveryone tokens

Requires [`fe-core`](../fe-core/SKILL.md). Follow the conventions in that skill.

## When to use

Any task that picks or replaces a colour, font, spacing, radius, shadow, or motion
value from the design system.

## Workflow

- [ ] Step 1: Resolve the token by role
- [ ] Step 2: Emit a CSS variable
- [ ] Step 3: Extend in OKLCH only when no token exists
- [ ] Step 4: Verify

## Step 1: Resolve the token by role

Read `tokens.json` next to these skills, or `spec/tokens.json` in a clone. Map by
role (background, text, accent, border), using the approved pairings in
`spec/principles.md`. Names follow `{category}.{tier}.{variant}`
(`docs/token-naming.md`).

Brand colours come from `brand-palette.json` (`--color-brand-*`). In `tokens.json`, a colour is brand only when `class` is `brand`, or when it has a `brandColor` (alias or semantic). Tokens with `class` `legacy`, `technical`, `status`, `ramp`, or `print`, and any token with `deprecated: true`, are not brand colours and are never offered as the palette. Where `preferred` is set, use that name.

Use digital-surface tokens on the web. Leave `surface: "print"` tokens unused
(`--font-family-accent`, `--color-print-*`, `--color-doc-*`).

## Step 2: Emit a CSS variable

```css
.panel {
  background: var(--color-background-default);
  color: var(--color-theme-2);
}
```

## Step 3: Extend in OKLCH only when no token exists

Hold hue and lightness, step chroma. Record the source token you held. Never
write a new hex literal or font name.

## Rules

1. Output CSS as `var(--*)` from `css/custom-properties.css`.
2. Token names follow `{category}.{tier}.{variant}`.
3. Digital-surface tokens only on the web.
4. Map by role, using pairings in `spec/principles.md`.
5. Never use a token with `deprecated: true`. Take brand colours from `brand-palette.json`.
6. Extend a missing shade in OKLCH. Hold hue and lightness, step chroma.

## Verify

```sh
grep -rnE --include='*.css' --include='*.scss' '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(|font-family:' .
grep -rnE --include='*.css' --include='*.scss' --include='*.tsx' --include='*.jsx' -- '--color-(print|doc)-|--font-family-accent' .
```

Ignore `node_modules` and generated `css/custom-properties.css`. Each remaining
hit is a value that still needs a token. In the browser, the variable you used
returns a non-empty computed value:

```js
getComputedStyle(document.documentElement).getPropertyValue("--color-theme-2").trim()
```

## Do not

- Treat the deprecated `--color-pink`, `--color-teal`, or `--color-light-purple` as brand colours. Brand Pink, Teal, and Lavender are `--color-brand-pink`, `--color-brand-teal`, `--color-brand-lavender`.
- Hand-edit `css/custom-properties.css` (regenerate from `tokens/` via `build-css.js`).
- Use Orange as text, a button fill, a link colour, or a background behind text.
- Put white text on a light tint, or any text but pure white on Blue.
- Ship print typefaces (Young Serif) on digital UI.

## Canonical docs

- [`spec/tokens.json`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/tokens.json)
- [`docs/token-naming.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/token-naming.md)
- [`spec/principles.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/principles.md)
- Tokens: <https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/tokens.json>
