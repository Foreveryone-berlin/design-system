# Figma <> Repository Sync Guide

This document defines how ForEveryone design tokens are synchronized between Figma and this repository.

## Source-of-Truth Policy

- Figma is source of truth for design decisions.
- Repository token files are source of truth for implementation.
- Approved design updates must be reflected in both places in the same change cycle.

## Tooling

- Plugin: **Tokens Studio for Figma** (free tier supported).
- Repo token format: W3C Design Token Community Group style JSON.
- Build step: `node scripts/build-css.js`.

## Initial Plugin Setup

1. Open the project Figma file.
2. Install/open **Tokens Studio for Figma**.
3. Create token sets matching repository files:
   - `colors`
   - `typography`
   - `spacing`
   - `radius`
   - `shadows`
   - `motion`
4. Configure naming with slash-separated paths (Figma style) that map to dot-separated repo paths.

## Variable Group Mapping

- Figma `color/primary/500` -> repo `color.primary.500`
- Figma `color/secondary/lavender/400` -> repo `color.secondary.lavender.400`
- Figma `font/family/heading` -> repo `font.family.heading`
- Figma `spacing/6` -> repo `spacing.6`
- Figma `radius/pill` -> repo `radius.pill`
- Figma `shadow/card` -> repo `shadow.card`
- Figma `motion/transition/base` -> repo `motion.transition.base`

## Sync Flow

1. Designer updates tokens in Figma (with review).
2. Export/sync JSON from Tokens Studio.
3. Update corresponding files in `tokens/`.
4. Run `node scripts/build-css.js`.
5. Verify `css/custom-properties.css` and affected CSS/components.
6. Update docs if token semantics changed.
7. Log changes in `CHANGELOG.md`.

## Recommended Sync Cadence

- During active design sprint: at least once per week.
- Before release: mandatory sync and verification pass.
- After emergency visual bug fix: immediate sync to avoid drift.

## Divergence Handling

If Figma and repo diverge:

1. Create an issue documenting the mismatch.
2. Determine intended source for that change:
   - Design intent change: update repo tokens to Figma.
   - Implementation bug: revert implementation to token values.
3. Apply fix in one PR with:
   - token changes (if any)
   - rebuilt `css/custom-properties.css`
   - changelog entry
4. Confirm in Elementor UI global mappings still match.
