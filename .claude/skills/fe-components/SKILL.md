---
name: fe-components
description: Prefer documented fe-* component contracts for ForEveryone Berlin UI. Use when building or restyling buttons, cards, inputs, tags, FAQ, header, footer, or related patterns.
metadata:
  foreveryone: ">=1.9.0 <2.0.0"
  requires: "fe-core"
  docs: "llms.txt, spec/components/README.md, docs/visual-styles.md"
  guide: "Build components from documented markup and state contracts."
---

# ForEveryone components

Requires [`fe-core`](../fe-core/SKILL.md). Follow the conventions in that skill.

## When to use

Any task that adds or restyles interactive UI that already has an `fe-*` contract in
`spec/components/`.

## Workflow

- [ ] Step 1: Read the contract
- [ ] Step 2: Copy the markup and class names
- [ ] Step 3: Render every state
- [ ] Step 4: Verify

## Step 1: Read the contract

Open `spec/components/<name>.md` for the control. Use that markup and those class
names. A new public class belongs in [`fe-component-authoring`](../fe-component-authoring/SKILL.md),
in this repository.

## Step 2: Copy the markup and class names

Match the documented structure. Icon buttons use `.fe-icon-btn` (neutral) or
`.fe-icon-btn--filled-brand` (Blue ground, white glyph via `currentColor`). Play
controls use `.fe-play-btn` with a white glyph. For photo masks and section waves,
read `docs/visual-styles.md` and reuse a catalog SVG unchanged. State its filename,
edge, orientation, adjacent surfaces, and responsive height.

## Step 3: Render every state

Where the contract defines a state matrix, render default, hover, focus or pressed,
and disabled. Buttons use the documented fills. The focused fill is the focus
treatment the contract names.

```html
<button class="fe-btn-primary" type="button">Continue</button>
<button class="fe-btn-primary" type="button" disabled>Continue</button>
```

## Rules

1. Prefer documented classes and states in `spec/components/*.md`.
2. Keep public class names inside the `fe-*` vocabulary already in the spec.
3. Implement the full state matrix the contract defines.
4. Icon and play buttons use the classes named above.
5. Match markup structure as well as class names.
6. Reuse catalog SVGs unchanged.

## Verify

For each contract you touched, the page renders every state it lists. Keyboard
focus lands on the control and the focused style is visible. Disabled controls
are not clickable.

```sh
grep -rnE --include='*.html' --include='*.tsx' --include='*.jsx' --include='*.vue' '<(button|input|textarea|select|a)\b' .
```

Each interactive element you changed carries the `fe-*` class from its contract.
Social icon buttons use plain `.fe-icon-btn`.

## Do not

- Restyle with ad-hoc hex, font-family, or shadow literals.
- Skip disabled or focus states because a mock shows only default.
- Use network brand colours on social icon buttons (plain `.fe-icon-btn` only).

## Canonical docs

- [`spec/components/README.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/components/README.md)
- [`docs/visual-styles.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/visual-styles.md)
- Component contracts: <https://github.com/Foreveryone-berlin/design-system/tree/main/spec/components>
