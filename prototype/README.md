# Design system prototype

Next.js (React, TypeScript) app that showcases the ForEveryone Berlin design tokens and components. Live at **[design.foreveryone.berlin](https://design.foreveryone.berlin)**.

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
