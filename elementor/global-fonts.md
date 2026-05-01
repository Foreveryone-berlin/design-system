# Elementor Global Fonts Mapping

This guide maps typography tokens to Elementor Global Fonts.

Elementor reference: <https://elementor.com/help/view-and-edit-global-fonts/>

## Font Loading Prerequisite

- `Filson Pro` must be loaded by the WordPress theme or a font plugin.
- `Young Serif` can be loaded via Google Fonts.
- If `Filson Pro` is unavailable, heading and body rendering will fall back to sans-serif and must be treated as a configuration issue.
- **CSS family-name string:** the production webfont on foreveryone.berlin registers itself as `'FilsonPro'` (no space). Authored CSS in `css/` and `tokens/typography.json` use that exact string so `font-family` matches the loaded face. The human-readable typeface name "Filson Pro" is kept in this doc and the Elementor UI for editor discoverability only.

## Global Font Slot Mapping

- **Primary** -> `typography.h1.main` -> Filson Pro, 900, 84px, line-height 80%, letter-spacing -2%
- **Secondary** -> `typography.h1.additional` -> Young Serif, 900, 84px, line-height 80%, letter-spacing -2%
- **Body** -> `typography.body.regular` -> Filson Pro, 400, 16px, line-height 140%, letter-spacing 0%
- **Accent** -> `typography.h2.default` -> Filson Pro, 700, 48px, line-height 100%, letter-spacing -2%

## Step-by-Step Setup

1. Go to **Elementor > Site Settings > Global Fonts**.
2. Set each slot to match the mapping above.
3. Save changes.
4. Validate in editor preview:
   - Hero headings can mix **Primary** and **Secondary** by span-level styling.
   - Body text uses **Body**.
   - Section headings use **Accent**.

## Screenshot Checklist (for editors)

- Screenshot 1: Global Fonts panel with slot names.
- Screenshot 2: Primary and Secondary font settings expanded.
- Screenshot 3: A hero heading demonstrating mixed font pattern.

## Notes

- Mixed H1 typography (Filson Pro + Young Serif) is intentional and should be preserved.
- Do not replace slot names ad hoc; update docs and token references first.
