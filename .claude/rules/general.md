# General (mirrors `.cursor/rules/general.mdc`)

- This is a WordPress/Elementor design system repo for ForEveryone Berlin (https://foreveryone.berlin/)
- Canonical long-form agent context: `docs/AGENTS.md`; root `AGENTS.md` mirrors the retrieval index for tools that only load repo-root `AGENTS.md`
- The stack is: WordPress + Elementor Pro + custom CSS + child theme
- Figma is source of truth for visual decisions. The repo is source of truth for implementation.
- Never modify files in `tokens/` without updating `CHANGELOG.md`
- Never hardcode hex values or font names in CSS files — always use CSS custom properties from `css/custom-properties.css`
- All token names follow the pattern: `{category}.{tier}.{variant}`
- When in doubt, read `docs/token-naming.md` before naming anything
