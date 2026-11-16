---
name: fe-core
description: Core conventions for consuming the ForEveryone Berlin design system. Use when importing CSS variables, resolving tokens, choosing fe-* classes, or deciding whether a colour or font is allowed.
metadata:
  foreveryone: ">=1.9.0 <2.0.0"
  requires: ""
  docs: "llms.txt, spec/principles.md, spec/tokens.json"
  guide: "Use the shared CSS, approved colours, typography, and brand rules."
---

# ForEveryone core conventions

This file is the convention set. An installed copy does not need
`_shared/conventions.md`.

## When to use

Any task that styles UI with ForEveryone tokens or `fe-*` classes. Every other
ForEveryone consumer skill assumes these rules.

## Workflow

- [ ] Step 1: Import the custom properties once
- [ ] Step 2: Resolve every value from a token
- [ ] Step 3: Verify

## Step 1: Import the custom properties once

Import `css/custom-properties.css` once at the app root. Authored CSS uses
`var(--*)` only.

## Step 2: Resolve every value from a token

Resolve every colour, type, spacing, radius, shadow, and motion value from
`tokens.json` (shipped next to these skills, or `spec/tokens.json` in a clone).
Prefer `fe-*` contracts in `spec/components/*.md`. Keep product CSS to layout.

The full rule set:

1. Never invent hex values or font names.
2. On the web, use digital-surface tokens only. Filson Pro is digital. Young Serif
   is print only. Leave `--font-family-accent`, `--color-print-*`, and
   `--color-doc-*` unused on screen.
3. `--color-brand-primary` (Orange) is accent only: never text, a button, a link,
   or a background behind text. Orange icons always carry a text label. Structural
   exceptions: a QR-code border, and a white standalone logo icon on orange with no text.
4. `--color-brand-secondary` (Blue) is digital only. It works for backgrounds and
   primary buttons, always with pure white text. White and Charcoal are never full
   backgrounds; use Warm White.
5. Body text is Charcoal on light backgrounds. Body line-height is at least 1.5.
   Letter-spacing is 0%. Use only the approved background and text pairings in
   `spec/principles.md`.
6. Public classes are `fe-*`. Do not invent a public class outside
   `spec/components/*.md`.
7. If a shade is missing, extend in OKLCH: hold hue and lightness, step chroma.
8. Keep visible keyboard focus. Honour `prefers-reduced-motion`.

## Rules

1. Import `css/custom-properties.css` once. Authored CSS uses `var(--*)` only.
2. Resolve values from `tokens.json` or `spec/tokens.json`.
3. Prefer documented `fe-*` contracts for buttons, cards, inputs, tags, FAQ,
   header, footer, and related patterns.
4. Use only approved background and text pairings from `spec/principles.md`.
5. Orange is accent only. Blue text is pure white. Print tokens stay off the web.

## Verify

From the project root, search authored styles. Ignore `node_modules` and the
generated `css/custom-properties.css`.

```sh
grep -rnE --include='*.css' --include='*.scss' --include='*.tsx' --include='*.jsx' --include='*.vue' --include='*.html' '#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(' .
grep -rn --include='*.css' --include='*.scss' 'font-family:' .
grep -rnE --include='*.css' --include='*.scss' --include='*.tsx' --include='*.jsx' -- '--color-(print|doc)-|--font-family-accent' .
```

A hit in authored CSS is a failure. Then load the page and confirm the variables
resolved:

```js
getComputedStyle(document.documentElement).getPropertyValue("--color-brand-primary").trim()
```

The result is an `oklch()` colour. An empty string means `css/custom-properties.css`
did not load.

## Do not

- Invent hex values or font names.
- Use `surface: "print"` tokens on the web.
- Put text on an Orange background, or white text on a light tint.
- Put any text but pure white on Blue, or use Blue in print.
- Drop visible keyboard focus or ignore `prefers-reduced-motion`.

## Canonical docs

- [`llms.txt`](https://github.com/Foreveryone-berlin/design-system/blob/main/llms.txt): agent entry and hard rules
- [`spec/principles.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/principles.md): deterministic colour, type, layout
- [`spec/tokens.json`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/tokens.json): flattened token list with CSS names
- Skill index: <https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/index.json>
