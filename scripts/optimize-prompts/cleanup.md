# Prototype code quality domain

Audit and fix code quality in `prototype/`. Read repo `AGENTS.md`, `CLAUDE.md`, and the `## Audit contract` in `CLAUDE.md`.

## Hard rules

- Never use em-dash (U+2014). No agent attribution trailers (Codex, Cursor, Claude, `@cursoragent`, Made/Generated with Cursor).
- Dev server is on **:3100**; do not start another.
- Edit **only your files**; report issues in other files without fixing them.
- Do **not** add/remove deps or bump versions.
- Run `node node_modules/typescript/bin/tsc --noEmit` in `prototype/` and fix type errors **only in your files**.

## Owns

`prototype/content/site-copy.ts`, `prototype/tsconfig.json`, `prototype/package.json`, ESLint config in `prototype/`.

## Focus

Remove genuinely unused exports (grep first), tighten types, lint/tsc hygiene.
