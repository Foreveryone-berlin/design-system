# Design system prototype

Next.js (React, TypeScript) app that showcases the ForEveryone Berlin design tokens and components. Live at **[design.foreveryone.berlin](https://design.foreveryone.berlin)**. Overview statistics count [color-token definitions](../tokens/colors.json), including aliases; distinct types in the [component catalogue](app/components/page.tsx), excluding variants and duplicate state demos; specimens in the [pattern catalogue](app/patterns/page.tsx); and [installable agent skills](../skills/), excluding `_shared`. The 15 component types are buttons, icon buttons, play buttons, inputs, dropdowns, category tags, chips, badges, label cards, navigation links, cards, testimonials, testimonial sliders, accordions, and popups.

- **Copy and imagery** are sourced from [foreveryone.berlin](https://foreveryone.berlin) for the prototype; see `content/site-copy.ts` and `public/images/ASSETS.md`.
- **Favicon** and **UI icons** live in `public/favicon.svg` and `public/icons/`.
- **Workshop icons, illustrations, accents, blobs, and waves** live under `public/icons/categories/` and `public/illustrations/`. Official Figma element exports are normalized with `node scripts/import-figma-elements.mjs` (repo root); see [docs/visual-styles.md](../docs/visual-styles.md).
- **Footer** shows the design system version (semver from `package.json`).

## Run locally

1. From repo root, build token CSS (if needed):
   ```bash
   node scripts/build-css.js
   ```
2. After updating Figma element SVGs (optional):
   ```bash
   unzip -o ForEveryone_Elements.zip -d .
   node scripts/import-figma-elements.mjs
   ```
3. Install and start:
   ```bash
   cd prototype && npm install && npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000).

The app imports CSS from `../css/` (custom-properties, base, typography) and uses only token-driven styles.
