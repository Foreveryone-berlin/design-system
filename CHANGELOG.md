# Changelog

## [Unreleased]

## [0.3.1] - 2026-03-12

### Fixed

- Prototype: hydration error when Cursor browser (or extensions) inject `data-cursor-ref` into the DOM; added `suppressHydrationWarning` on layout root.

### Added

- README: prototype section with how to run and open the design system app.

## [0.3.0] - 2026-03-12

### Added

- `docs/pr-and-merge-workflow.md`: run pr-and-merge script locally (workflow is manual-only).

### Changed

- Workflow `pr-and-merge.yml`: trigger `workflow_dispatch` only (no push) so CI does not need PR-create permission.
- README & contributing: document that `main` is the default branch.
- GitHub release v0.2.0 set as latest on releases page.

## [0.2.0] - 2026-03-12

### Added

- Design system prototype in `prototype/` (Next.js, React, TypeScript): tokens, buttons, cards, form, chips, blockquote; hero with clamp(); Outfit font.
- `scripts/pr-and-merge.sh`: push, create PR into develop (template body), merge. Idempotent.
- Workflow `pr-and-merge.yml` (manual trigger). Cursor rule: “merge this branch into develop” → run script.

### Changed

- PR body in script follows `.github/PULL_REQUEST_TEMPLATE.md`.

## [0.1.0] - 2026-03-12

### Added

- Initial design system scaffold for ForEveryone Berlin (WordPress + Elementor Pro)
- Token files (W3C DTCG format): colors, typography, spacing, radius, shadows, motion; master index at `tokens/index.json`
- CSS build script (`scripts/build-css.js`) generating `css/custom-properties.css` from tokens
- CSS layers: `base.css`, `typography.css`, `utilities.css`, `elementor-overrides.css` using design tokens
- Elementor integration documentation: global colors, global fonts, custom CSS setup and child-theme enqueue
- Figma sync guide and token export instructions (Tokens Studio)
- Git workflow and branch strategy; PR template in `.github/PULL_REQUEST_TEMPLATE.md`
- Cursor AI rules: `.cursor/rules/` (general, tokens, css, git)
- Contribution and onboarding docs: `docs/contributing.md`, `docs/getting-started.md`, `docs/token-naming.md`
- Architecture decision record: `docs/decisions/001-token-format.md`
- Canonical project brief: `docs/cursor-plan-prompt.md`
- Excluded `.cursor/plans/` from version control via `.gitignore`
