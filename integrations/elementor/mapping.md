# Elementor sync workflow

Keep Elementor Global Colors and Global Fonts aligned with this repo's tokens. Elementor stores globals in the database, so this step is manual and does not happen at build time.

One target among several: see [`integrations/README.md`](../README.md) for the full list.

## When to use

- After changing token values that are mapped to Elementor (e.g. primary color, body font).
- When onboarding a new site or restoring Global Settings from this design system.

## Steps

1. **Check the mapping tables** in this repo:
   - [global-colors.md](./global-colors.md)
   - [global-fonts.md](./global-fonts.md)
2. **Icon / layout classes**: When using HTML or Button widgets with DS classes (e.g. `.fe-icon-btn`, `.fe-icon-btn--filled-brand`), see [docs/visual-styles.md](../../docs/visual-styles.md) and [setup.md](./setup.md).
3. **In WordPress**: go to **Elementor → Site Settings → Global Colors** (or **Global Fonts**).
4. **Set each slot** to the hex value or font/size/weight from the mapping table.
5. **Ensure token CSS is loaded**: either enqueue `css/custom-properties.css` from the child theme (see [setup.md](./setup.md)) or paste the `:root` block into Elementor Custom CSS as fallback.
6. **Verify** in the editor: buttons, headings, and body text use the expected colors and fonts.
7. **Run the checklist**: [docs/integration-checklist.md](../../docs/integration-checklist.md) on a staging page, then the Elementor-specific validation steps in [setup.md](./setup.md).

Known accessibility gaps and scope: [docs/a11y-conformance.md](../../docs/a11y-conformance.md).

## Official docs

- [references.md](./references.md) — links to Elementor Global Settings, Global Colors, Global Fonts, Custom CSS, and the WordPress child-theme and enqueue documentation.
