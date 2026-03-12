# Elementor Global Colors Mapping

This guide maps ForEveryone design tokens to Elementor Global Colors.

Elementor reference: <https://elementor.com/help/theme-style-global-settings/>

## Before You Start

1. In WordPress admin, open **Elementor > Site Settings > Global Colors**.
2. Open [`css/custom-properties.css`](../css/custom-properties.css) to cross-check values.
3. Confirm the child theme is enqueueing the token CSS file (see [`elementor/custom-css-setup.md`](./custom-css-setup.md)).

## Global Color Slot Mapping

- **Primary** -> `color.primary.500` -> `#FF7A3A`
- **Primary Dark** -> `color.primary.600` -> `#CC622E`
- **Primary Light** -> `color.primary.300` -> `#FFAF89`
- **Secondary Blue** -> `color.secondary.blue.500` -> `#3F00EB`
- **Secondary Lavender** -> `color.secondary.lavender.400` -> `#D0D1FF`
- **Secondary Green** -> `color.secondary.green.500` -> `#D4E8A8`
- **Neutral Dark** -> `color.neutral.900` -> `#1E1E1E`
- **Neutral Mid** -> `color.neutral.500` -> `#737373`
- **Neutral Light** -> `color.neutral.100` -> `#F5F5F5`
- **White** -> `color.base.white` -> `#FFFFFF`
- **Error** -> `color.status.error` -> `#DC2626`

## Step-by-Step Setup

1. Go to **Elementor > Site Settings > Global Colors**.
2. Rename existing slots to match the names above.
3. Enter exact hex values from this mapping.
4. Save changes.
5. Open one page in Elementor editor and verify:
   - Buttons use **Primary** and **Primary Dark** for hover.
   - Text defaults to **Neutral Dark**.
   - Light sections use **Neutral Light**.
   - Error states use **Error**.

## Screenshot Checklist (for editors)

- Screenshot 1: Global Colors panel with all slot names visible.
- Screenshot 2: Primary/Secondary slots expanded with exact hex values.
- Screenshot 3: Example button widget using mapped Global Colors.

## Notes

- Elementor stores these values in database options, not in CSS variables.
- This mapping must stay aligned with `tokens/colors.json`.
- If token values change, update both Elementor Global Colors and `CHANGELOG.md`.
