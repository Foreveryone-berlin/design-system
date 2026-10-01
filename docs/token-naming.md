# Token Naming Conventions

This repository uses semantic and scale-based token naming.

## Core Rule

Use:

`{category}.{tier}.{variant}`

Examples:

- `color.orange.500`
- `color.lavender.400`
- `font.size.xl`
- `motion.transition.base`

## Naming Principles

- Ramp families are named by hue (`orange`, `green`, `blue`, `lavender`, `neutral`) with
  numeric tonal steps (`50`, `100`, `500`, …). `500` is the brand "main" step.
- Semantic names carry the purpose (`color.background-title`, `color.accent-icon`,
  `color.status.warning`) and **reference** the ramp step they use rather than repeating its
  value: `"$value": "{color.green.500}"`.
- Keep naming predictable between Figma (`/`) and repo (`.`).
- Avoid ambiguous size labels like `big` or `small`.

## Valid Categories in This Repo

- `color`
- `font`
- `spacing`
- `radius`
- `shadow`
- `motion`

## Figma Mapping Rule

Figma uses `/`, the repo uses `.`, and the family names differ. The real mapping:

| Figma variable | Repo token |
| --- | --- |
| `Primary/500` | `color.orange.500` |
| `Secondary/green/500_main` | `color.green.500` |
| `Secondary/blue/500` | `color.blue.500` |
| `Secondary/purple/500_Lavender_main` | `color.lavender.500` |
| `Neutral/900` | `color.neutral.900` |

Figma page text also uses two greys bound to no variable. They map to the nearest existing
token (deltaE OK in OKLCH; detail in [`figma-final-design-audit.md`](figma-final-design-audit.md)):

| Figma hex | Repo token | deltaE OK |
| --- | --- | --- |
| `#5C5C6F` | `color.neutral.600` | 0.053 |
| `#303044` | `color.neutral.800` | 0.061 |

Breakpoint-specific sizes take a `-mobile` suffix on the semantic role, so
`font.size.h1-mobile` and `font.size.h2-mobile` hold the heading sizes below 768px and the
scale steps (`font.size.4xl`, `font.size.3xl`) hold the desktop sizes.

If a new token is introduced, use this mapping and document the semantic reason in `$description`.
