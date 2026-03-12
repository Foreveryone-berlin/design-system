# Elementor Mapping Workflow

Keep Elementor Global Colors and Global Fonts aligned with this repo’s tokens.

## When to use

- After changing token values that are mapped to Elementor (e.g. primary color, body font).
- When onboarding a new site or restoring Global Settings from this design system.

## Steps

1. **Check the mapping tables** in this repo:
   - [elementor/global-colors.md](../../elementor/global-colors.md)
   - [elementor/global-fonts.md](../../elementor/global-fonts.md)
2. **In WordPress**: go to **Elementor → Site Settings → Global Colors** (or **Global Fonts**).
3. **Set each slot** to the hex value or font/size/weight from the mapping table.
4. **Ensure token CSS is loaded**: either enqueue `css/custom-properties.css` from the child theme (see [elementor/custom-css-setup.md](../../elementor/custom-css-setup.md)) or paste the `:root` block into Elementor Custom CSS as fallback.
5. **Verify** in the editor: buttons, headings, and body text use the expected colors and fonts.

## Official docs

- [docs/official-references.md](../official-references.md) — links to Elementor Global Settings, Global Colors, Global Fonts, Custom CSS.
