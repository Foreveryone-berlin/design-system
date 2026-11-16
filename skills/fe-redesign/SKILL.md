---
name: fe-redesign
description: Restyle an existing web app to the ForEveryone Berlin design system. Use when replacing ad-hoc colours, fonts, and components with tokens and fe-* contracts from this repo.
metadata:
  foreveryone: ">=1.9.0 <2.0.0"
  requires: "fe-core"
  docs: "llms.txt, spec/principles.md, spec/tokens.json, docs/agents/redesign-from-this-system.md"
  guide: "Map an existing interface onto the design system."
---

# Redesign from this design system

Requires [`fe-core`](../fe-core/SKILL.md). The rule source is
[`docs/agents/redesign-from-this-system.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/agents/redesign-from-this-system.md).

## When to use

A developer points an agent at this repository (or an installed skill payload) and
asks it to restyle a web app to ForEveryone.

## Workflow

Work in order. After each step, search the project for leftovers before continuing.

- [ ] Step 1: Read the sources and import tokens
- [ ] Step 2: Map colours by role
- [ ] Step 3: Rebuild components to fe-* contracts
- [ ] Step 4: Apply type and layout rules
- [ ] Step 5: Verify

## Step 1: Read the sources and import tokens

Read, in order: `llms.txt`, `tokens.json` (or `spec/tokens.json`), `spec/principles.md`,
`spec/components/*.md`. Import `css/custom-properties.css` once at the app root.

Load [`fe-core`](../fe-core/SKILL.md) before editing styles.

## Step 2: Map colours by role

Replace ad-hoc colours with tokens by role: background, text, accent, border.
Use approved pairings from `spec/principles.md`. Extend a missing shade in OKLCH
(hold hue and lightness, step chroma).

Search for leftover colour literals. Ignore `node_modules` and generated
`css/custom-properties.css`.

```sh
grep -rnE --include='*.css' --include='*.scss' --include='*.tsx' --include='*.jsx' --include='*.vue' --include='*.html' '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(' .
```

A hit in authored UI CSS is still an ad-hoc colour.

## Step 3: Rebuild components to fe-* contracts

Rebuild buttons, cards, inputs, tags, and accordions to the `.fe-*` contracts,
including default, hover, focus or pressed, and disabled. Follow
[`fe-components`](../fe-components/SKILL.md).

```sh
grep -rnE --include='*.html' --include='*.tsx' --include='*.jsx' --include='*.vue' '<(button|input|textarea|select)\b' .
```

Each rebuilt control uses the class from its contract.

## Step 4: Apply type and layout rules

Filson Pro is the digital face. Body line-height is at least 1.5. Text is
left-aligned, with the spacing scale from the tokens. Print faces and print
colours stay off the web.

```sh
grep -rn --include='*.css' --include='*.scss' 'font-family:' .
grep -rnE --include='*.css' --include='*.scss' --include='*.tsx' --include='*.jsx' -- '--color-(print|doc)-|--font-family-accent' .
```

Authored `font-family` is a `var(--font-family-*)` digital token. A print-token
hit on a screen stylesheet is a failure.

## Step 5: Verify

Run the app. Tab through the changed screens. Focus is visible. With
`prefers-reduced-motion: reduce`, non-essential motion stops. Contrast uses a
documented pairing. Orange is not a text colour or a background behind text.
Blue text is pure white.

Repeat the three searches from Steps 2 to 4. Report a token-by-token mapping of
what changed, plus any search hit left in place and why.

## Rules

1. Read the sources in Step 1, then import `css/custom-properties.css`.
2. Map colours by role. Use approved pairings.
3. Extend missing shades in OKLCH. Keep new hex values out of authored CSS.
4. Rebuild buttons, cards, inputs, tags, and accordions to `.fe-*` contracts and states.
5. Apply Filson Pro on digital UI, body line-height at least 1.5, left alignment.
6. Leave `surface: "print"` tokens off the web.

## Verify

The checks in Step 5 are the gate. The restyle is done when the three searches
are clean for the files you changed, the state matrix for each rebuilt control
is on the page, and the browser resolves the imported variables:

```js
getComputedStyle(document.documentElement).getPropertyValue("--color-brand-primary").trim()
```

## Do not

- Skip `fe-core`.
- Invent hex values or font names.
- Use print tokens on the web.
- Put text on Orange, or white text on a light tint.
- Put any text but pure white on Blue, or use Blue in print.

## Ready-to-paste prompt

```text
You are restyling THIS web app to the ForEveryone Berlin design system.

Source of truth: the design-system repo (or the installed skill payload). Read, in
order: llms.txt, tokens.json or spec/tokens.json, spec/principles.md,
spec/components/*.md, and css/custom-properties.css. Load fe-core and fe-redesign.

Work in order. After each step, search for leftovers before continuing.
- Import css/custom-properties.css once at the app root.
- Replace every ad-hoc colour, font, radius, and spacing value with the nearest
  token by role. Search: grep -rnE '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\('
- Rebuild buttons, cards, inputs, tags, and accordions to the .fe-* contracts,
  including their states.
- Apply the colour, typography, and layout rules in spec/principles.md.
  Search font-family declarations and --color-print-, --color-doc-, --font-family-accent.

Leave print tokens off the web. Orange is never text or a background behind text.
Blue text is pure white. Extend palettes in OKLCH.

Then verify: run the app, check contrast, keyboard focus, prefers-reduced-motion,
confirm --color-brand-primary resolves, and report a token-by-token mapping.
```

## Canonical docs

- [`docs/agents/redesign-from-this-system.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/agents/redesign-from-this-system.md)
- [`llms.txt`](https://github.com/Foreveryone-berlin/design-system/blob/main/llms.txt)
- [`spec/principles.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/principles.md)
- [`spec/tokens.json`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/tokens.json)
