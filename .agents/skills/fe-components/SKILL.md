---
name: fe-components
description: Prefer documented fe-* component contracts for ForEveryone Berlin UI. Use when building or restyling buttons, cards, inputs, tags, FAQ, header, footer, or related patterns.
foreveryone: '>=1.9.0 <2.0.0'
requires: [fe-core]
docs: ['llms.txt', 'spec/components/README.md', 'docs/visual-styles.md']
---

# ForEveryone components

Requires [`fe-core`](../fe-core/SKILL.md). Read
[`_shared/conventions.md`](../_shared/conventions.md) alongside this file.

## When to use

Any task that adds or restyles interactive UI that already has an `fe-*` contract in
`spec/components/`.

## Rules

1. Prefer documented classes and states in `spec/components/*.md` over one-off styles.
2. Do not invent new public class names outside the `fe-*` vocabulary.
3. Implement the full state matrix where the contract defines one (default, hover,
   focus/pressed, disabled). Buttons use the documented fills; do not add a gold ring
   where the contract says the focused fill is enough.
4. Icon buttons use `.fe-icon-btn` (neutral) or `.fe-icon-btn--filled-brand` (Blue ground,
   white glyph via `currentColor`). Play controls use `.fe-play-btn` with a white glyph.
5. Header, footer, FAQ, cards, inputs, tags, and related patterns follow their spec files;
   match markup structure as well as class names.
6. For photo masks and section waves, read `docs/visual-styles.md` before choosing
   geometry. Reuse a catalog SVG unchanged; state its filename, edge, orientation,
   adjacent surfaces, and responsive height. Never invent an approximate path.
   Host-native divider controls follow the target's integration guide.

## Do not

- Restyle with ad-hoc hex, font-family, or shadow literals.
- Skip disabled or focus states because a mock shows only default.
- Use network brand colours on social icon buttons (plain `.fe-icon-btn` only).

## Canonical docs

- [`spec/components/README.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/components/README.md)
- [`docs/visual-styles.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/visual-styles.md)
- Component contracts: <https://github.com/Foreveryone-berlin/design-system/tree/main/spec/components>
