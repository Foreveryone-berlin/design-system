# Elementor Global Fonts Mapping

This guide maps typography tokens to Elementor Global Fonts.

Elementor reference: <https://elementor.com/help/view-and-edit-global-fonts/>

## Font Loading Prerequisite

- `Filson Pro` must be loaded by the WordPress theme or a font plugin. The production webfont on `foreveryone.berlin` registers itself as `'FilsonPro'` (no space); authored CSS and token values use that exact string so `font-family` matches the loaded face.
- `Young Serif` is **print-only** per `tokens/typography.json`, `spec/principles.md`, and `docs/agents/redesign-from-this-system.md`. Do **not** load it on the web or map it to an Elementor Global Font slot.
- If `Filson Pro` is unavailable, heading and body rendering will fall back to sans-serif and must be treated as a configuration issue.

## Global Font Slot Mapping

Map each Elementor slot to the matching token path. Values are from the current `tokens/typography.json`.

| Slot | Tokens | Result |
| --- | --- | --- |
| **Primary** | `font.family.heading` + `font.weight.bold` + `font.size.4xl` + `lineHeight.tight` + `letterSpacing.tight` | FilsonPro, 700, 84px, line-height 80%, letter-spacing -2% |
| **Secondary** | *Not used on the web.* | Leave unset or map to the same as Primary. Young Serif is print-only. |
| **Body** | `font.family.body` + `font.weight.regular` + `font.size.base` + `lineHeight.normal` + `letterSpacing.normal` | FilsonPro, 400, 16px, line-height 150%, letter-spacing 0% |
| **Accent** | `font.family.heading` + `font.weight.bold` + `font.size.3xl` + `lineHeight.snug` + `letterSpacing.tight` | FilsonPro, 700, 48px, line-height 100%, letter-spacing -2% |

## Step-by-Step Setup

1. Go to **Elementor > Site Settings > Global Fonts**.
2. Set **Primary**, **Body**, and **Accent** to match the table above.
3. Leave **Secondary** unset (or map it to the same values as Primary). Do not assign Young Serif to any web slot.
4. Save changes.
5. Validate in editor preview:
   - Hero headings use **Primary**.
   - Body text uses **Body**.
   - Section headings use **Accent**.

## Notes

- The legacy mixed H1 typography (Filson Pro + Young Serif) is a print pattern; it is not implemented on the web.
- Do not replace slot names ad hoc; update docs and token references first.
