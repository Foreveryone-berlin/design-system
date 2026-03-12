# Changelog

## [0.4.0] - 2026-03-12

### Added

- Prototype: site copy module, hero + mission + stats; `public/` (favicon, icons, images/ASSETS.md).
- Prototype: hero with image, stats strip, radius/shadow/motion demos, icons section, wave section, footer with semver; layout metadata + favicon.

### Changed

- Prototype: copy refocused on design system; agnostic stats (24, 8, 12+, 3); hero uses `<img>`, future-site link; hero image styling simplified (no blob/outline); page order and README.

## [0.3.1] - 2026-03-12

### Fixed

- Prototype: hydration error from Cursor injecting `data-cursor-ref`; `suppressHydrationWarning` on layout root.

### Added

- README: prototype run instructions.

## [0.3.0] - 2026-03-12

### Added

- `docs/pr-and-merge-workflow.md`; workflow manual-only.

### Changed

- `pr-and-merge.yml`: `workflow_dispatch` only; README/contributing note `main` default branch; v0.2.0 set latest release.

## [0.2.0] - 2026-03-12

### Added

- Prototype in `prototype/` (Next.js, tokens, buttons, cards, form, chips, blockquote, hero, Outfit); `scripts/pr-and-merge.sh` and workflow; Cursor rule for merge-to-develop.

### Changed

- PR body in script uses template.

## [0.1.0] - 2026-03-12

### Added

- Design system scaffold (WordPress + Elementor): tokens (W3C DTCG), `scripts/build-css.js`, CSS layers, Elementor docs, Figma sync guide, Git/PR template, `.cursor/rules/`, contributing/getting-started/token-naming, ADR 001, cursor-plan-prompt, `.gitignore` for `.cursor/plans/`.
