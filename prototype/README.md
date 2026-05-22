# Design system prototype

Next.js (React, TypeScript) app that showcases the For Everyone Berlin design tokens and components. Live at **[design.foreveryone.berlin](https://design.foreveryone.berlin)**.

- **Copy and imagery** are sourced from [foreveryone.berlin](https://foreveryone.berlin) for the prototype; see `content/site-copy.ts` and `public/images/ASSETS.md`.
- **Favicon** and **icons** live in `public/favicon.svg` and `public/icons/`.
- **Footer** shows the design system version (semver from `package.json`).

## Run locally

1. From repo root, build token CSS (if needed):
   ```bash
   node scripts/build-css.js
   ```
2. Install and start:
   ```bash
   cd prototype && npm install && npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000).

The app imports CSS from `../css/` (custom-properties, base, typography) and uses only token-driven styles.
