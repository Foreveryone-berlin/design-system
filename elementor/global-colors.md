# Elementor Global Colors Mapping

This guide maps ForEveryone design tokens to Elementor Global Colors and Custom Colors.

Elementor reference: <https://elementor.com/help/theme-style-global-settings/>

## Before You Start

1. In WordPress admin, open **Elementor > Site Settings > Global Colors**.
2. Open [`css/custom-properties.css`](../css/custom-properties.css) to cross-check values.
3. Confirm the child theme is enqueueing the token CSS file (see [`elementor/custom-css-setup.md`](./custom-css-setup.md)).

## Global Color Slot Mapping

- **Global 1 — Brand Secondary** -> `color.brand-secondary` -> `#3F00EB` (Blue, alerts/announcements only; pair with white text)
- **Global 2 — Brand Primary** -> `color.brand-primary` -> `#FF7A3A` ⚠️ **DECORATIVE ONLY** (Brand Book v1.0, June 2026, p.16). Use for filled-icon fills, blob shapes, borders, and accents. **Never use as a section/button/background color, and never pair with text.** The only structural exceptions are the QR-code border (p.33) and the standalone white logo icon on an orange background for social profile images and print covers (no text on that background, p.12).
- **Global 3 — Brand Dark** -> `color.brand-dark` -> `#1E1E1E` (Charcoal; primary text on light backgrounds)
- **Global 4 — Accent** -> `color.accent` -> `#FDFCF7` (Warm white; default text-heavy content background)

## Custom Color Slot Mapping

- **Custom 1 — Focus Button** -> `color.focus-button` -> `#CC622E`
- **Custom 2 — Light Purple** -> `color.light-purple` -> `#D5C5FF` (Lavender)
- **Custom 3 — Light Green** -> `color.light-green` -> `#D4E6A8` (Lime green)
- **Custom 4 — Light Orange** -> `color.light-orange` -> `#FFD7C4`
- **Custom 5 — Pink** -> `color.pink` -> `#F39EBC`
- **Custom 6 — Teal** -> `color.teal` -> `#03C9D3`
- **Custom 7 — Purple** -> `color.purple` -> `#DA83DA`
- **Custom 8 — Very Light Gray** -> `color.very-light-gray` -> `#F7F7F7`
- **Custom 9 — Light Gray** -> `color.light-gray` -> `#D9D9D9`

### Additional token (Elementor UI)

Add a **Custom** or **Global** swatch in Elementor if your plan allows more slots:

- **Soft Lavender** -> `color.soft-lavender` -> `#E5DCFF` — large readable lavender backgrounds (social/layout); pair with Charcoal text.

Until that slot exists in Elementor, the value still ships in `css/custom-properties.css` as `--color-soft-lavender` for the child theme / custom CSS.

## WordPress / Elementor Theme Colors

These are the Astra/Elementor theme-level colors used by the site:

- **Theme Color 1** -> `color.theme-1` -> `#0170B9`
- **Theme Color 2** -> `color.theme-2` -> `#1E1E1E` (Charcoal-aligned)
- **Theme Color 3** -> `#1E1E1E` (duplicate of Theme 2 / Charcoal)
- **Theme Color 4** -> `color.theme-4` -> `#4B4F58`
- **Theme Color 5** -> `color.theme-5` -> `#F5F5F5`
- **Theme Color 6** -> `#FFFFFF` (same as `color.base.white`)
- **Theme Color 7** -> `color.theme-7` -> `#E5E5E5`
- **Theme Color 8** -> `color.theme-8` -> `#1E1E1E` (Charcoal-aligned)

## Step-by-Step Setup

1. Go to **Elementor > Site Settings > Global Colors**.
2. Rename existing slots to match the names above.
3. Enter exact hex values from this mapping.
4. Save changes.
5. Open one page in Elementor editor and verify:
   - Buttons use **Brand Primary** and **Focus Button** for hover.
   - Text defaults to **Brand Dark** or **Theme Color 2** (Charcoal).
   - Light sections use **Theme Color 5** or **Accent** (Warm white).
   - **Brand Secondary** panels use **white** text.
   - Error states use `#DC2626` (status-error).

## Screenshot Checklist (for editors)

- Screenshot 1: Global Colors panel with all slot names visible.
- Screenshot 2: Custom Colors expanded with exact hex values.
- Screenshot 3: Example button widget using mapped Global Colors.

## Notes

- Elementor stores these values in database options, not in CSS variables.
- This mapping must stay aligned with `tokens/colors.json`.
- If token values change, update both Elementor Global Colors and `CHANGELOG.md`.
- Brand palette audit: [`docs/color-audit-2026.md`](../docs/color-audit-2026.md).
- Brand authority matrix: [`docs/brand-book-references.md`](../docs/brand-book-references.md) (Brand Book v1.0 is the source of truth).
