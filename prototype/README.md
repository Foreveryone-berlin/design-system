# Design system prototype

Next.js (React, TypeScript) app that showcases the ForEveryone Berlin design tokens. Future home: **design.foreveryone.berlin**.

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
