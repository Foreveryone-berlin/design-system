# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
Versioning: [Semantic Versioning](https://semver.org/)

## [Unreleased]

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
