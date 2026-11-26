---
name: fe-token-authoring
description: Author ForEveryone design tokens in this repository. Use when adding, changing, or removing a token and regenerating CSS variables.
metadata:
  foreveryone: ">=1.19.1 <2.0.0"
  requires: "fe-core, fe-tokens"
  docs: "tokens/brand-palette.json, docs/token-naming.md, docs/skills/token-update.md, spec/tokens.json"
  guide: "Add or change a design token and regenerate the CSS variables."
---

# Author a design token

Requires [`fe-core`](../fe-core/SKILL.md) and [`fe-tokens`](../fe-tokens/SKILL.md).
This skill edits `tokens/` in the design-system repository. Applying an existing
token in a product is [`fe-tokens`](../fe-tokens/SKILL.md).

## When to use

You are changing `tokens/*.json`, the generated custom properties, or a token's
public name.

## Workflow

- [ ] Step 1: Edit one DTCG token
- [ ] Step 2: Name it `{category}.{tier}.{variant}`
- [ ] Step 3: Regenerate CSS and record the changelog
- [ ] Step 4: Search before any deletion
- [ ] Step 5: Verify

## Step 1: Edit one DTCG token

Token files are W3C Design Token Community Group JSON. Each token has only
`$value`, `$type`, and `$description`. A colour token's `$description` states
the semantic role.

Valid `$type` values: `color`, `dimension`, `fontFamily`, `fontWeight`,
`duration`, `number`, `string`.

A value may reference another token: `{color.orange.500}`.

```json
"background-default": {
  "$value": "{color.accent}",
  "$type": "color",
  "$description": "Semantic: default page background. Pair with Charcoal text."
}
```

Every colour token must be classified in `tokens/brand-palette.json`
(`tokenClasses`, or a reference to a `color.brand.*` token); an unclassified colour
fails the build. A new brand colour is added only to `colors` in that file, by the
brand team's decision, then `npm run build` generates `tokens/brand.json`, the CSS
variable, and the palette docs. Never add a non-brand colour with a brand colour's name.
`docs/skills/token-update.md` lists the token file for each category.

## Step 2: Name it `{category}.{tier}.{variant}`

Follow `docs/token-naming.md`. The name states the role. It does not name a host
platform, a slot number, or a product.

## Step 3: Regenerate CSS and record the changelog

```sh
node scripts/build-css.js
```

Confirm the new or changed variable in `css/custom-properties.css`. The generator
owns that file. Add one bullet under `## [Unreleased]` in `CHANGELOG.md`.

## Step 4: Search before any deletion

Before removing a token, search for its name and CSS variable:

```sh
grep -rn -- 'color.orange.500' css prototype integrations spec
grep -rn -- '--color-brand-orange' css prototype integrations
```

Replace those uses, or keep the token.

## Step 5: Verify

`css/custom-properties.css` contains the variable the build should emit, and the
changelog has an `## [Unreleased]` bullet. A deletion search from Step 4 is clean.
Authored CSS still uses `var(--*)`.

## Rules

1. `$value`, `$type`, and `$description` are the only keys on a token.
2. Names follow `{category}.{tier}.{variant}`.
3. Run `node scripts/build-css.js` after a token edit.
4. Record the change under `## [Unreleased]`.
5. Search `css/`, `prototype/`, `integrations/`, and `spec/` before a deletion.

## Verify

```sh
node scripts/build-css.js
grep -n -- '--color-brand-orange' css/custom-properties.css
```

The build exits 0. The variable you added or changed is present. `git diff`
shows `css/custom-properties.css` changed only by the generator.

## Do not

- Hand-edit `css/custom-properties.css`.
- Add a key other than `$value`, `$type`, or `$description`.
- Name a token after a host platform or a product.
- Delete a token that still appears in `css/`, `prototype/`, or `integrations/`.

## In your own project

Keep this repository's `tokens/` unchanged. In the product, set layout with
variables that already exist:

```css
.panel {
  background: var(--color-background-default);
  color: var(--color-theme-2);
  padding: var(--spacing-4);
}
```

When no token matches, extend in your own stylesheet in OKLCH from a token you
name, holding its hue and lightness. Record that source token next to the
declaration. A product-only shade does not become a public token until it is
added here through Steps 1 to 5.

## Canonical docs

- [`docs/token-naming.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/token-naming.md)
- [`docs/skills/token-update.md`](https://github.com/Foreveryone-berlin/design-system/blob/main/docs/skills/token-update.md)
- [`spec/tokens.json`](https://github.com/Foreveryone-berlin/design-system/blob/main/spec/tokens.json)
