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

If a new token is introduced, use this mapping and document the semantic reason in `$description`.
