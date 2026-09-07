# CSS (mirrors `.cursor/rules/css.mdc`)

Applies when editing files under `css/**/*.css`.

- `css/custom-properties.css` is GENERATED — do not edit manually, edit tokens instead
- `css/base.css`, `css/typography.css`, and `css/utilities.css` are platform-neutral: no `.elementor-*`, `.wp-*`, or other host-platform selectors
- `css/integrations/<target>.css` is the only place host-platform selectors belong (e.g. `css/integrations/elementor.css`); keep specificity low
- All CSS property values must use `var(--token-name)` — no raw values except in `custom-properties.css`
- No `!important` unless overriding a host platform's inline styles (comment why)
- Use logical properties where possible: `margin-inline`, `padding-block`, etc.
- Mobile-first. All breakpoints use min-width.
- Breakpoints in the shared layer: 640px, 768px, 1024px. Use a container query where a component must respond to its own column rather than the viewport
