# Integrations

The design system is platform-neutral: tokens in `tokens/`, generated custom properties in [`css/custom-properties.css`](../css/custom-properties.css), and `fe-*` classes in [`css/utilities.css`](../css/utilities.css). Anything that only makes sense for one host platform lives here.

Start from [`docs/getting-started.md`](../docs/getting-started.md) for the three consumption paths, then use the table below for the target you are wiring up.

| Target | Entry doc | Status |
| --- | --- | --- |
| Any framework or plain CSS | [`docs/getting-started.md`](../docs/getting-started.md) | Supported. Import the generated custom properties plus the authored layers; no platform-specific code needed. |
| React / Next.js | [`prototype/README.md`](../prototype/README.md) | Supported. The app in `prototype/` is the working reference implementation and imports `css/` directly. |
| WordPress + Elementor Pro | [`elementor/`](elementor/) | Supported. Powers the live marketing site at [foreveryone.berlin](https://foreveryone.berlin/). |

## Before each release

Run the platform-neutral checks in [`docs/integration-checklist.md`](../docs/integration-checklist.md) against every target you ship, then the target's own steps from the table above.

## WordPress + Elementor Pro

| File | Purpose |
| --- | --- |
| [`elementor/setup.md`](elementor/setup.md) | Load the token CSS from the child theme, or paste the `:root` block into Elementor Custom CSS. |
| [`elementor/global-colors.md`](elementor/global-colors.md) | Token to Global / Custom / Theme colour slot mapping. The single home for slot numbers. |
| [`elementor/global-fonts.md`](elementor/global-fonts.md) | Token to Global Font slot mapping, plus font-loading prerequisites. |
| [`elementor/mapping.md`](elementor/mapping.md) | The sync workflow to run after token changes. |
| [`elementor/references.md`](elementor/references.md) | Official Elementor and WordPress documentation links. |
| [`../css/integrations/elementor.css`](../css/integrations/elementor.css) | Low-specificity overrides that map Elementor's own DOM onto design-system values. |

Notes for this target:

- Elementor stores globals in the database, not in CSS variables, so colour and font slots are synced by hand after any token change.
- `css/integrations/elementor.css` targets the legacy `.elementor-section` markup, not the current `.e-con` container model. It is hand-copied into the child theme; no build step emits it.
- Elementor's editor breakpoints (mobile under 767px, tablet 768 to 1024px, desktop over 1025px) are the editor's own configuration. They are not the design system's breakpoints, which are mobile-first `min-width` at 640px, 768px, and 1024px.
- `!important` is acceptable only to beat Elementor's inline styles, and needs a comment saying why.

## Adding a target

1. Add a row to the table above.
2. Put everything platform-specific under `integrations/<target>/`; keep `tokens/`, `css/` (except `css/integrations/`), `spec/`, and `docs/` neutral.
3. If the target needs its own stylesheet, put it in `css/integrations/<target>.css` and keep selector specificity low.
4. Note in the PR which integration needs a manual follow-up (the PR template asks).
