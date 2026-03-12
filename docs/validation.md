# Validation Checklist

What is checked in this repository before release or merge.

## Automated (run locally)

| Check | Command / action | Expected |
|-------|-------------------|----------|
| Token build | `node scripts/build-css.js` | Exit 0; `css/custom-properties.css` updated |
| Token JSON | Parse each `tokens/*.json` with Node | Valid JSON, no parse errors |
| Linting | Editor/IDE linter on repo files | No errors |

## Manual / external

- **Elementor**: Global Colors and Global Fonts match [elementor/global-colors.md](../elementor/global-colors.md) and [elementor/global-fonts.md](../elementor/global-fonts.md).
- **Live site**: After enqueueing design system CSS, verify buttons, headings, inputs, and section spacing on a few pages.
- **Figma**: If tokens or components changed, sync with [figma/sync-guide.md](../figma/sync-guide.md).
