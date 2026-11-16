---
name: fe-a11y
description: Accessibility rules for ForEveryone Berlin UI. Use when checking contrast, keyboard focus, skip links, motion preferences, alt text, or WCAG 2.1 AA conformance.
metadata:
  foreveryone: ">=1.9.0 <2.0.0"
  requires: "fe-core"
  docs: "llms.txt, spec/principles.md, docs/a11y-conformance.md, docs/validation.md"
  guide: "Check contrast, keyboard focus, motion, and alternative text."
---

# ForEveryone accessibility

Requires [`fe-core`](../fe-core/SKILL.md). Follow the conventions in that skill.

## When to use

Any task that changes interactive UI, colour pairings, motion, or content images, or
that reviews a surface against the public accessibility statement.

## Workflow

- [ ] Step 1: Check the pairing
- [ ] Step 2: Check keyboard, motion, and names
- [ ] Step 3: Verify

## Step 1: Check the pairing

Target WCAG 2.1 Level AA. Text contrast is at least 4.5:1, and 3:1 for large text
and UI boundaries. Use a pairing listed in `spec/principles.md`.

## Step 2: Check keyboard, motion, and names

Keep `:focus-visible`. A skip link points at `#main-content`. Icon-only controls
have accessible names. Content images say what is happening, in one sentence.
Decorative graphics use empty alt. Closed mobile nav and collapsed FAQ items leave
the tab order and the accessibility tree.

```css
@media (prefers-reduced-motion: reduce) {
  .fe-motion {
    animation: none;
    transition: none;
  }
}
```

## Rules

1. Target WCAG 2.1 Level AA with the contrast floors above.
2. Keep visible keyboard focus. The focus style stays visible.
3. Honour `prefers-reduced-motion`.
4. Provide a skip link and accessible names.
5. Write meaningful alt text. Decorative graphics get empty alt.
6. Closed disclosure content leaves the tab order and the accessibility tree.

## Verify

Tab from the top of the page. The skip link appears on focus and moves focus to
`#main-content`. Every interactive control shows a visible focus style. Disabled
and closed content is skipped. With `prefers-reduced-motion: reduce`, non-essential
animation stops.

In this repository, with the prototype dev server running:

```sh
cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e
```

## Do not

- Put text on Orange, or white text on a light tint.
- Rely on colour alone to convey meaning.
- Ship motion that ignores reduced-motion preferences.
- Leave icon-only controls without an accessible name.

## Canonical docs

- Prototype statement source: <https://github.com/Foreveryone-berlin/design-system/blob/main/prototype/app/accessibility/page.tsx>
- [`docs/a11y-conformance.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/a11y-conformance.md)
- [`docs/validation.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/validation.md)
- [`spec/principles.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/principles.md)
