# Prototype SEO domain

Audit and fix SEO metadata in `prototype/`. Read repo `AGENTS.md`, `CLAUDE.md`, and the `## Audit contract` in `CLAUDE.md`.

## Hard rules

- Never use em-dash (U+2014). No agent attribution trailers (Codex, Cursor, Claude, `@cursoragent`, Made/Generated with Cursor).
- Prototype stays **`robots: noindex, nofollow`**; do not add a sitemap.
- Dev server is on **:3100**; do not start another.
- Edit **only your files**; report issues in other files without fixing them.
- Run `node node_modules/typescript/bin/tsc --noEmit` in `prototype/` and fix type errors **only in your files**.

## Owns

`prototype/app/layout.tsx`, `prototype/public/robots.txt`, `prototype/app/manifest.ts` (create if missing).

## Focus

Title template, canonical, OG/Twitter, Next 15 `export const viewport` (theme-color), manifest. Keep noindex.
