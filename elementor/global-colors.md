# Elementor Global Colors Mapping

This guide maps ForEveryone design tokens to Elementor Global Colors and Custom Colors.

Elementor reference: <https://elementor.com/help/theme-style-global-settings/>

## Before You Start

1. In WordPress admin, open **Elementor > Site Settings > Global Colors**.
2. Open [`css/custom-properties.css`](../css/custom-properties.css) to cross-check values.
3. Confirm the child theme is enqueueing the token CSS file (see [`elementor/custom-css-setup.md`](./custom-css-setup.md)).

## Global Color Slot Mapping

- **Global 1 — Brand Secondary** -> `color.brand-secondary` -> `#3F00EB`
- **Global 2 — Brand Primary** -> `color.brand-primary` -> `#FF7A3A`
- **Global 3 — Brand Dark** -> `color.brand-dark` -> `#404040`
- **Global 4 — Accent** -> `color.accent` -> `#F1F1EA`

## Custom Color Slot Mapping

- **Custom 1 — Focus Button** -> `color.focus-button` -> `#CC622E`
- **Custom 2 — Light Purple** -> `color.light-purple` -> `#D9CCFB`
- **Custom 3 — Light Green** -> `color.light-green` -> `#F1F7E5`
- **Custom 4 — Light Orange** -> `color.light-orange` -> `#FFD7C4`
- **Custom 5 — Pink** -> `color.pink` -> `#F39EBC`
- **Custom 6 — Teal** -> `color.teal` -> `#03C9D3`
- **Custom 7 — Purple** -> `color.purple` -> `#DA83DA`
- **Custom 8 — Very Light Gray** -> `color.very-light-gray` -> `#F7F7F7`
- **Custom 9 — Light Gray** -> `color.light-gray` -> `#D9D9D9`

## WordPress / Elementor Theme Colors

These are the Astra/Elementor theme-level colors used by the site:

- **Theme Color 1** -> `color.theme-1` -> `#0170B9`
- **Theme Color 2** -> `color.theme-2` -> `#3A3A3A`
- **Theme Color 3** -> `#3A3A3A` (duplicate of Theme 2)
- **Theme Color 4** -> `color.theme-4` -> `#4B4F58`
- **Theme Color 5** -> `color.theme-5` -> `#F5F5F5`
- **Theme Color 6** -> `#FFFFFF` (same as `color.base.white`)
- **Theme Color 7** -> `color.theme-7` -> `#E5E5E5`
- **Theme Color 8** -> `color.theme-8` -> `#424242`

## Step-by-Step Setup

1. Go to **Elementor > Site Settings > Global Colors**.
2. Rename existing slots to match the names above.
3. Enter exact hex values from this mapping.
4. Save changes.
5. Open one page in Elementor editor and verify:
   - Buttons use **Brand Primary** and **Focus Button** for hover.
   - Text defaults to **Brand Dark** or **Theme Color 2**.
   - Light sections use **Theme Color 5** or **Accent**.
   - Error states use `#DC2626` (status-error).

## Screenshot Checklist (for editors)

- Screenshot 1: Global Colors panel with all slot names visible.
- Screenshot 2: Custom Colors expanded with exact hex values.
- Screenshot 3: Example button widget using mapped Global Colors.

## Notes

- Elementor stores these values in database options, not in CSS variables.
- This mapping must stay aligned with `tokens/colors.json`.
- If token values change, update both Elementor Global Colors and `CHANGELOG.md`.
