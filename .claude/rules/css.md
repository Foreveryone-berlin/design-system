# CSS (mirrors `.cursor/rules/css.mdc`)

Applies when editing files under `css/**/*.css`.

- `css/custom-properties.css` is GENERATED — do not edit manually, edit tokens instead
- `css/elementor-overrides.css` may use `.elementor-*` selectors but keep specificity low
- All CSS property values must use `var(--token-name)` — no raw values except in `custom-properties.css`
- No `!important` unless overriding Elementor's inline styles (comment why)
- Use logical properties where possible: `margin-inline`, `padding-block`, etc.
- Mobile-first. All breakpoints use min-width.
- Elementor breakpoints: mobile < 767px, tablet 768–1024px, desktop > 1025px
