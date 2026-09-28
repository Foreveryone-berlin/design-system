---
name: fe-core
description: Core conventions for consuming the ForEveryone Berlin design system. Use when importing CSS variables, resolving tokens, choosing fe-* classes, or deciding whether a colour or font is allowed.
foreveryone: '>=1.9.0 <2.0.0'
requires: []
docs: ['llms.txt', 'spec/principles.md', 'spec/tokens.json']
---

# ForEveryone core conventions

Consume the design system; do not reinvent it. Read
[`_shared/conventions.md`](../_shared/conventions.md) alongside this file.

## When to use

Any task that styles UI with ForEveryone tokens or `fe-*` classes. Every other
ForEveryone consumer skill assumes these rules.

## Rules

1. Import `css/custom-properties.css` once at the app root. Authored CSS uses `var(--*)`
   only.
2. Resolve every colour, type, spacing, radius, shadow, and motion value from
   `tokens.json` (shipped next to these skills, or `spec/tokens.json` in a clone).
3. Prefer `fe-*` contracts in `spec/components/*.md` for buttons, cards, inputs, tags,
   FAQ, header, footer, and related patterns.
4. Use only approved background ⇄ text pairings from `spec/principles.md`.
5. Keep custom CSS to genuine product-specific layout; never hardcode hex or font-family
   names.

## Do not

- Invent hex values or font names.
- Use `surface: "print"` tokens on the web.
- Put text on an Orange background, or white text on a light tint.
- Use Blue outside announcements/alerts.
- Drop visible keyboard focus or ignore `prefers-reduced-motion`.

## Canonical docs

- [`llms.txt`](../../llms.txt) — agent entry and hard rules
- [`spec/principles.md`](../../spec/principles.md) — deterministic colour, type, layout
- [`spec/tokens.json`](../../spec/tokens.json) — flattened token list with CSS names
- Live skill index: <https://design.foreveryone.berlin/skills/index.json>
