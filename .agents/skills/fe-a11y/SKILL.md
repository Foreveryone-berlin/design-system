---
name: fe-a11y
description: Accessibility rules for ForEveryone Berlin UI. Use when checking contrast, keyboard focus, skip links, motion preferences, alt text, or WCAG 2.1 AA conformance.
foreveryone: '>=1.9.0 <2.0.0'
requires: [fe-core]
docs: ['llms.txt', 'spec/principles.md', 'docs/a11y-conformance.md', 'docs/validation.md']
---

# ForEveryone accessibility

Requires [`fe-core`](../fe-core/SKILL.md). Read
[`_shared/conventions.md`](../_shared/conventions.md) alongside this file.

## When to use

Any task that changes interactive UI, colour pairings, motion, or content images, or
that reviews a surface against the public accessibility statement.

## Rules

1. Target **WCAG 2.1 Level AA**. Text contrast ≥ 4.5:1 (3:1 for large text and UI
   boundaries). Use only approved pairings from `spec/principles.md`.
2. Keep **visible keyboard focus** (`:focus-visible`). Never remove the focus ring or
   substitute it with an invisible outline.
3. Honour **`prefers-reduced-motion`**: reduce or remove non-essential animation.
4. Provide a **skip link** to `#main-content` on host pages; interactive controls need
   accessible names (especially icon-only buttons).
5. Write **meaningful alt text** for content images (what is happening, one sentence).
   Decorative graphics get empty alt.
6. Content behind toggles (mobile nav, collapsed FAQ) must leave the tab order and
   accessibility tree when closed.

## Do not

- Put text on Orange, or white text on a light tint.
- Rely on colour alone to convey meaning.
- Ship motion that ignores reduced-motion preferences.
- Leave icon-only controls without an accessible name.

## Canonical docs

- Prototype statement: <https://design.foreveryone.berlin/accessibility>
- [`docs/a11y-conformance.md`](../../docs/a11y-conformance.md)
- [`docs/validation.md`](../../docs/validation.md)
- [`spec/principles.md`](../../spec/principles.md)
