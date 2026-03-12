# Token Naming Conventions

This repository uses semantic and scale-based token naming.

## Core Rule

Use:

`{category}.{tier}.{variant}`

Examples:

- `color.primary.500`
- `color.secondary.lavender.400`
- `font.size.xl`
- `motion.transition.base`

## Naming Principles

- Prefer semantic purpose over visual color names.
- Use numeric scales for tonal steps (`50`, `100`, `500`, etc.).
- Keep naming predictable between Figma (`/`) and repo (`.`).
- Avoid ambiguous labels like `big`, `small`, `orange`, `purple`.

## Valid Categories in This Repo

- `color`
- `font`
- `spacing`
- `radius`
- `shadow`
- `motion`

## Figma Mapping Rule

- Figma: `color/primary/500`
- Repo: `color.primary.500`

If a new token is introduced, use this mapping and document the semantic reason in `$description`.
