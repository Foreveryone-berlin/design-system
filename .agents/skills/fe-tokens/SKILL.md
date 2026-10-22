---
name: fe-tokens
description: Resolve and apply ForEveryone Berlin design tokens. Use when mapping colours, type, spacing, radius, shadow, or motion to CSS variables, or when extending a palette in OKLCH.
foreveryone: '>=1.9.0 <2.0.0'
requires: [fe-core]
docs: ['llms.txt', 'spec/tokens.json', 'spec/principles.md', 'docs/token-naming.md']
---

# ForEveryone tokens

Requires [`fe-core`](../fe-core/SKILL.md). Read
[`_shared/conventions.md`](../_shared/conventions.md) alongside this file.

## When to use

Any task that picks or replaces a colour, font, spacing, radius, shadow, or motion
value from the design system.

## Rules

1. Resolve names from `tokens.json` (next to these skills, or `spec/tokens.json` in a
   clone). Output CSS as `var(--*)` from `css/custom-properties.css`.
2. Token names follow `{category}.{tier}.{variant}` (see `docs/token-naming.md`).
3. Use digital-surface tokens only on the web. Never use `surface: "print"` tokens
   (`--font-family-accent`, `--color-print-*`, `--color-doc-*`).
4. Map by role (background, text, accent, border), not by nearest hex. Approved
   background ⇄ text pairings live in `spec/principles.md`.
5. If a shade is missing, extend in OKLCH: hold hue and lightness, step chroma. Never
   invent a hex literal or font name.

## Do not

- Hand-edit `css/custom-properties.css` (regenerate from `tokens/` via `build-css.js`).
- Use Orange as text, a button fill, a link colour, or a background behind text.
- Put white text on a light tint, or Blue outside announcements/alerts.
- Ship print typefaces (Young Serif) on digital UI.

## Canonical docs

- [`spec/tokens.json`](../../spec/tokens.json)
- [`docs/token-naming.md`](../../docs/token-naming.md)
- [`spec/principles.md`](../../spec/principles.md)
- Live tokens: <https://design.foreveryone.berlin/skills/tokens.json>
