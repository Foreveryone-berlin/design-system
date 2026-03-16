# Changelog

## [Unreleased]

### Added

- LICENSE file (CC BY-NC 4.0 International).
- README: license section.

## [0.5.1] - 2026-03-16

### Fixed

- FAQ accordion: active item content area now has primary-500 background so white text is visible (was white-on-white).

## [0.5.0] - 2026-03-16

### Added

- Tokens: spacing 14, 18, 22, 26, 30, 32 (56px–128px, 8pt grid).
- Build: `build-css.js` emits full color scales (primary 50–900, secondary green/blue/lavender 50–900), all spacing tokens, and font-size lg/2xl.
- CSS: `.fe-icon-btn`, `.fe-play-btn`; `.fe-faq-item` (accordion); `.fe-dropdown`, `.fe-dropdown-item`; `.fe-nav-link`; `.fe-header` (desktop + mobile); `.fe-footer` (grid, newsletter, social, legal); `.fe-card-badge`, `.fe-card-category`, `.fe-card-meta`, `.fe-card-price`, `.fe-card-get-involved`; `.fe-tag-pill--green`, `--orange`, `--lavender`, `--blue`; `.fe-input-group`, `.fe-input:disabled`, `.fe-input-error-msg`.
- Elementor overrides: accordion (`.elementor-accordion`), nav menu (`.elementor-nav-menu a`), form labels (`.elementor-widget-form .elementor-field-group`).
- Prototype: full color palette (50–900 by family), icon buttons + play button, FAQ accordion demo, header/footer demos, workshop card (badge, category, meta, price), category tag variants, input states (default, error, disabled), dropdown and card benefit/get-involved demos; `utilities.css` import.

### Changed

- `css/custom-properties.css`: regenerated with full color and spacing output.

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
