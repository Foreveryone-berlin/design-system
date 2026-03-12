# Token Export Instructions

This guide covers exporting design tokens from Figma using Tokens Studio.

## Option A: GitHub Sync (Recommended)

1. Open Tokens Studio in Figma.
2. Configure remote storage with GitHub.
3. Select repository and target token paths (`tokens/*.json`).
4. Push token updates from Figma to a branch.
5. Open PR and review token diffs.
6. Run `node scripts/build-css.js` after pull/merge.

## Option B: Manual JSON Export

1. In Tokens Studio, export token set JSON files.
2. Replace corresponding files in `tokens/`:
   - `colors.json`
   - `typography.json`
   - `spacing.json`
   - `radius.json`
   - `shadows.json`
   - `motion.json`
3. Validate naming and `$type` consistency.
4. Run `node scripts/build-css.js`.

## Post-Export Validation

1. Confirm token file syntax is valid JSON.
2. Confirm key paths still follow `{category}.{tier}.{variant}`.
3. Confirm generated `css/custom-properties.css` changed as expected.
4. Smoke-check key UI classes in:
   - `css/typography.css`
   - `css/utilities.css`
   - `css/elementor-overrides.css`
5. Update `CHANGELOG.md` under `[Unreleased]`.

## Common Pitfalls

- Exporting renamed token groups that break existing variable names.
- Changing value formats (for example numbers vs strings) unexpectedly.
- Forgetting to rebuild generated CSS after token edits.
- Updating Figma only without repository update (or vice versa).
