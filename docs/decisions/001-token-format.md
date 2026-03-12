# ADR 001: Token Format

- Status: Accepted
- Date: 2026-03-12

## Context

ForEveryone needs a maintainable design token system that can be used by:

- Developers implementing CSS and WordPress theme styles
- Elementor editors applying global settings
- Designers working in Figma with Tokens Studio

The format must be readable, portable, and tooling-friendly without a complex build stack.

## Decision

Use W3C Design Token Community Group style JSON with:

- `$value`
- `$type`
- `$description` (where needed, required for color semantics)

Organize tokens into domain files:

- `tokens/colors.json`
- `tokens/typography.json`
- `tokens/spacing.json`
- `tokens/radius.json`
- `tokens/shadows.json`
- `tokens/motion.json`

Use `tokens/index.json` as the master import manifest for build tooling.

## Consequences

- Positive:
  - Consistent naming and easier cross-team collaboration
  - Deterministic CSS generation from one source
  - Direct compatibility with token-sync workflows from Figma
- Tradeoffs:
  - Manual discipline required for documentation and changelog updates
  - Team must avoid ad-hoc style values in implementation layers
