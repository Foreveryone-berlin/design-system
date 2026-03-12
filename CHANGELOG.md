# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
Versioning: [Semantic Versioning](https://semver.org/)

## [Unreleased]

## [0.2.0] - 2026-03-12

### Added

- Design system prototype (Next.js, React, TypeScript) in `prototype/` for future design.foreveryone.berlin: light-only layout, token-driven colors/typography/spacing/radius/shadows/motion, buttons (blue CTA + orange), cards, form elements, chips, blockquote; hero headline with clamp(); Google Fonts (Outfit) in place of Filson Pro for prototype only
- Script `scripts/pr-and-merge.sh`: push branch, create PR into develop with PR template body, merge (idempotent); supports solo-dev workflow
- GitHub Action `.github/workflows/pr-and-merge.yml`: on push to branches other than develop/main, create PR into develop and merge automatically
- Cursor rule (git.mdc): when user asks to merge current branch into develop, run `scripts/pr-and-merge.sh`

### Changed

- PR body in pr-and-merge script now follows `.github/PULL_REQUEST_TEMPLATE.md` (token impact, Elementor, Figma, tested, CHANGELOG checkboxes)

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
