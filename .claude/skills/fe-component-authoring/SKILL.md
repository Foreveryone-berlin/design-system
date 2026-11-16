---
name: fe-component-authoring
description: Author a public fe-* component in this repository. Use when adding a component contract, its CSS, and its states.
metadata:
  foreveryone: ">=1.19.1 <2.0.0"
  requires: "fe-core, fe-components"
  docs: "spec/components/README.md, docs/validation.md, docs/visual-styles.md"
  guide: "Add a public component contract, its CSS, and its states."
---

# Author a component

Requires [`fe-core`](../fe-core/SKILL.md) and [`fe-components`](../fe-components/SKILL.md).
This skill adds a public contract in the design-system repository. Building a
screen from contracts that already exist is [`fe-components`](../fe-components/SKILL.md).

## When to use

You are adding or changing a public `fe-*` component: its spec, its CSS, and the
states a consumer must render.

## Workflow

- [ ] Step 1: Confirm the contract is new
- [ ] Step 2: Write `spec/components/<name>.md`
- [ ] Step 3: Author CSS with variables and logical properties
- [ ] Step 4: Show every state in the prototype
- [ ] Step 5: Verify

## Step 1: Confirm the contract is new

Read `spec/components/README.md` and the existing contracts. Extend a contract
that already covers the control. A second public name for the same control is a
duplicate.

## Step 2: Write `spec/components/<name>.md`

Document the markup, the class names, and the state matrix: default, hover,
focus or pressed, and disabled where the control has those states. Public classes
start with `fe-`.

## Step 3: Author CSS with variables and logical properties

Put platform-neutral styles in `css/utilities.css` (or `css/base.css` /
`css/typography.css` when that is the layer). Every value is a `var(--*)` from
`css/custom-properties.css`. Use logical properties (`margin-inline`,
`padding-block`). Breakpoints are mobile-first `min-width` at 640px, 768px, and
1024px. A component that responds to its column uses a container query.

```css
.fe-widget {
  padding-block: var(--spacing-4);
  padding-inline: var(--spacing-6);
  background: var(--color-background-default);
  color: var(--color-theme-2);
}

@media (min-width: 768px) {
  .fe-widget {
    padding-inline: var(--spacing-8);
  }
}
```

Host-platform selectors belong in `css/integrations/<target>.css` only. A change
under `css/` gets an `## [Unreleased]` changelog bullet.

## Step 4: Show every state in the prototype

Add an example that renders each state in the contract. The focused state is
visible with the keyboard.

## Step 5: Verify

Search the new CSS for raw values, then run the accessibility gate with the
prototype dev server up:

```sh
grep -nE '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(|font-family:|!important' css/utilities.css
cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e
```

The grep is clean for the rules you added. The axe run exits 0. The changelog
records the CSS change.

## Rules

1. One public contract per control, in `spec/components/<name>.md`.
2. CSS values are `var(--*)`. Properties are logical.
3. Shared breakpoints are `min-width` 640, 768, and 1024.
4. The prototype renders every state in the contract.
5. A `css/` change updates `## [Unreleased]`.

## Verify

The Step 5 commands are the gate. Also tab to the new control: focus is visible,
and the disabled example does not activate.

## Do not

- Invent a public class that the spec does not list.
- Put a host selector in `css/utilities.css`, `css/base.css`, or `css/typography.css`.
- Hand-edit `css/custom-properties.css`.
- Ship a control whose spec lists a state the prototype does not render.

## In your own project

Compose screens from the published `fe-*` classes. Product layout can use your
own class, and that class sets layout only:

```css
.signup-panel {
  display: grid;
  gap: var(--spacing-4);
}
```

```html
<section class="signup-panel">
  <button class="fe-btn-primary" type="submit">Join</button>
</section>
```

A new public `fe-*` name is added in this repository through Steps 1 to 5, then
consumed. Override a documented value with a token variable on your element when
the contract allows it.

## Canonical docs

- [`spec/components/README.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/components/README.md)
- [`docs/validation.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/validation.md)
- [`docs/visual-styles.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/visual-styles.md)
