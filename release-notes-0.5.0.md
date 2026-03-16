# Release 0.5.0 (2026-03-16)

## Added

- Tokens: spacing 14, 18, 22, 26, 30, 32 (56px–128px, 8pt grid).
- Build: `build-css.js` emits full color scales (primary 50–900, secondary green/blue/lavender 50–900), all spacing tokens, and font-size lg/2xl.
- CSS: `.fe-icon-btn`, `.fe-play-btn`; `.fe-faq-item` (accordion); `.fe-dropdown`, `.fe-dropdown-item`; `.fe-nav-link`; `.fe-header` (desktop + mobile); `.fe-footer` (grid, newsletter, social, legal); `.fe-card-badge`, `.fe-card-category`, `.fe-card-meta`, `.fe-card-price`, `.fe-card-get-involved`; `.fe-tag-pill--green`, `--orange`, `--lavender`, `--blue`; `.fe-input-group`, `.fe-input:disabled`, `.fe-input-error-msg`.
- Elementor overrides: accordion (`.elementor-accordion`), nav menu (`.elementor-nav-menu a`), form labels (`.elementor-widget-form .elementor-field-group`).
- Prototype: full color palette (50–900 by family), icon buttons + play button, FAQ accordion demo, header/footer demos, workshop card (badge, category, meta, price), category tag variants, input states (default, error, disabled), dropdown and card benefit/get-involved demos; `utilities.css` import.

## Changed

- `css/custom-properties.css`: regenerated with full color and spacing output.
