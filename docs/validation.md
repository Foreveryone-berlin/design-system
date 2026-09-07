# Validation Checklist

What is checked in this repository before release or merge.

## Automated (run locally)

| Check | Command / action | Expected |
|-------|-------------------|----------|
| Token build | `node scripts/build-css.js` | Exit 0; `css/custom-properties.css` updated |
| Token JSON | Parse each `tokens/*.json` with Node | Valid JSON, no parse errors |
| Linting | Editor/IDE linter on repo files | No errors |
| Prototype accessibility e2e | With dev server on `:3100`: `cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npx playwright test tests/a11y.spec.ts tests/interaction-a11y.spec.ts tests/alt.spec.ts --project=chromium` | Exit 0; no serious/critical axe violations; interaction and alt checks pass |

CI runs the same accessibility suite on pull requests to `develop` and `main`.

## Manual / external

- **Any consuming target**: Run [integration-checklist.md](integration-checklist.md) (token CSS loaded, skip link, focus order, icon labels, accordion semantics, alt text, layout spot check), then that target's own steps from [integrations/README.md](../integrations/README.md).
- **Keyboard walkthrough**: Tab through header, mobile menu, search, FAQ accordion, and popup on `/components` and `/patterns`; confirm visible focus and logical order.
- **Screen reader spot check** (optional): VoiceOver or NVDA on homepage hero, workshop card, and mobile navigation.
- **Figma**: If tokens or components changed, sync with [figma/sync-guide.md](../figma/sync-guide.md).
- **Known gaps**: Review [a11y-conformance.md](a11y-conformance.md) before claiming full conformance.
