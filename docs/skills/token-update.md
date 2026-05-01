# Token Update Workflow

Use this when adding or changing design tokens (colors, typography, spacing, radius, shadows, motion).

## Steps

1. **Edit the right token file** in `tokens/`:
   - `colors.json`, `typography.json`, `spacing.json`, `radius.json`, `shadows.json`, or `motion.json`.
2. **Follow W3C DTCG format**: each token has `$value`, `$type`, and optionally `$description`. Use existing entries as a template.
   - New **flat** brand color (e.g. `color.soft-lavender`): add the object under `color` in `colors.json`, then add the same key string to the `FLAT_COLOR_KEYS` array in `scripts/build-css.js` so `--color-*` is emitted.
3. **Run the build**:
   ```bash
   node scripts/build-css.js
   ```
4. **Confirm** `css/custom-properties.css` was updated and contains the new or changed variable(s).
5. **Use the variable** in `css/` (e.g. `typography.css`, `utilities.css`, `elementor-overrides.css`) via `var(--name-from-build)`.
6. **Update Elementor** if the token maps to a Global Color or Global Font (see [Elementor mapping](elementor-mapping.md)).
7. **Update CHANGELOG.md** under the current in-flight version section with the token change.
8. **Sync Figma** if design source changed (see `figma/sync-guide.md`).

## Naming

- Pattern: `{category}.{tier}.{variant}` (e.g. `color.primary.500`, `font.size.xl`).
- See [docs/token-naming.md](../token-naming.md).
