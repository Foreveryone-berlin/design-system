---
name: fe-redesign
description: Restyle an existing web app to the ForEveryone Berlin design system. Use when replacing ad-hoc colours, fonts, and components with tokens and fe-* contracts from this repo.
foreveryone: '>=1.9.0 <2.0.0'
requires: [fe-core]
docs: ['llms.txt', 'spec/principles.md', 'spec/tokens.json', 'docs/agents/redesign-from-this-system.md']
---

# Redesign from this design system

Installable form of [`docs/agents/redesign-from-this-system.md`](../../docs/agents/redesign-from-this-system.md).
Requires [`fe-core`](../fe-core/SKILL.md).

## When to use

A developer points an agent at this repository (or installed `fe-skills/`) and asks it to
restyle a Next.js or other web app to ForEveryone from one careful prompt.

## Rules

1. Read, in order: `llms.txt`, `tokens.json`, `spec/principles.md`, `spec/components/*.md`,
   then import `css/custom-properties.css`.
2. Map ad-hoc colours to tokens by role (background, text, accent). Use only approved
   pairings.
3. Extend missing shades in OKLCH (hold hue + lightness, step chroma). Never invent hex.
4. Rebuild buttons, cards, inputs, tags, and accordions to `.fe-*` contracts and states.
5. Apply type and layout rules: Filson Pro digital only; body line-height ≥ 1.5;
   left-aligned, generous white space.
6. Verify: no `surface:"print"` tokens on the web, no Orange text background, documented
   contrast holds, keyboard focus visible, `prefers-reduced-motion` respected.

## Do not

- Skip `fe-core` conventions.
- Invent hex values or font names.
- Use print tokens on the web.
- Put text on Orange, or white text on a light tint.
- Use Blue outside announcements/alerts.

## Ready-to-paste prompt

```text
You are restyling THIS web app to the ForEveryone Berlin design system.

Source of truth: the design-system repo (or fe-skills/ from fe-ds install). Read, in
order: llms.txt, tokens.json / spec/tokens.json, spec/principles.md,
spec/components/*.md, and css/custom-properties.css. Treat them as authoritative.
Load the fe-core and fe-redesign skills if installed.

Do:
- Import css/custom-properties.css once at the app root.
- Replace every ad-hoc colour, font, radius, and spacing value with the nearest
  token by ROLE.
- Rebuild buttons, cards, inputs, tags, and accordions to the .fe-* contracts,
  including their states.
- Apply the colour, typography, and layout rules in spec/principles.md exactly.

Never:
- Invent hex values or font names — extend palettes in OKLCH.
- Use any token whose surface is "print" on the web.
- Put text on an Orange background, or white text on a light tint.
- Use Blue outside announcements/alerts.

Then verify: run the app, check contrast, keyboard focus, prefers-reduced-motion,
and report a token-by-token mapping of what you changed.
```

## Canonical docs

- [`docs/agents/redesign-from-this-system.md`](../../docs/agents/redesign-from-this-system.md)
- [`llms.txt`](../../llms.txt)
- [`spec/principles.md`](../../spec/principles.md)
- [`spec/tokens.json`](../../spec/tokens.json)
