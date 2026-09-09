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
- Read access for agents: the **Figma MCP server**, declared in `.mcp.json` (see below).

## Figma MCP server (read access)

`.mcp.json` declares a `figma` HTTP MCP server at `https://mcp.figma.com/mcp`, and
`.claude/settings.json` pre-approves it so nobody has to enable it by hand. It lets an agent
read the file's structure, variables, text styles, and effects directly, so verifying tokens
against Figma no longer needs a manual export.

- Authorization is per person over OAuth on first use. No Figma token is stored in the repo.
- It is read access for auditing. It does **not** replace the flow below: changes to
  `tokens/` still land through a reviewed PR, and writes back into Figma stay a designer's
  job.
- If you also run Figma's MCP server at user level (via the Figma plugin or desktop app),
  its tools appear a second time under a different prefix. Disable one of the two.
- Reads work on the current `starter` plan; Code Connect needs a Dev or Full seat on an
  Organization or Enterprise plan. See `docs/figma-final-design-audit.md`.

Entry points in the website file (`U6oj7xy85cfOQV1o0XtTKC`):

| Node | What it is |
| --- | --- |
| `876:5564` | the `Final Design` canvas: every page design, desktop and mobile |
| `938:7171` | the `Style Guide` section: components, colours, typography, spacing |
| `937:7300` | the Buttons component set |

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

Figma uses `/`, the repo uses `.`, and the colour family names differ. The mapping as it
actually stands in the website file:

| Figma variable | Repo token |
| --- | --- |
| `Primary/50…900` | `color.orange.50…900` |
| `Secondary/green/50…800` | `color.green.50…800` |
| `Secondary/blue/50…900` | `color.blue.50…900` |
| `Secondary/purple/50…900` | `color.lavender.50…900` |
| `Neutral/50…1000` | `color.neutral.50…900`, `color.base.black` |

There is no `color.primary.*` or `color.secondary.*` in `tokens/`. Semantic names
(`color.brand-primary`, `color.background-title`, `color.accent-icon`, …) reference the ramp
step they use rather than repeating its value.

Non-colour categories map one to one on name, with `/` becoming `.`: `font.family.heading`,
`spacing.6`, `radius.pill`, `shadow.card`, `motion.transition.base`. Note that the Figma file
currently defines **no** spacing or radius variables, so those repo tokens have no Figma
counterpart to sync against.

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
4. Confirm any host-platform global mappings still match (see [integrations/README.md](../integrations/README.md)).
