# Prototype performance domain

Audit and fix performance in `prototype/`. Read repo `AGENTS.md`, `CLAUDE.md`, and optimize skill hard rules.

## Hard rules

- Never use em-dash (U+2014). No Claude attribution trailers.
- Authored CSS uses `var(--token)` only; logical properties; mobile-first; no `!important`.
- Do not hand-edit `css/custom-properties.css` (generated).
- Prototype stays `robots: noindex, nofollow`; do not add a sitemap.
- Dev server is on **:3100**; do not start another.
- Edit **only your files**; report issues in other files without fixing them.
- Run `npx tsc --noEmit` in `prototype/` and fix type errors **only in your files**.

## Owns

`prototype/next.config.ts`, `prototype/app/page.tsx`, `prototype/app/tokens/page.tsx`, `prototype/app/components/page.tsx`, `prototype/app/patterns/page.tsx`, `prototype/app/FaqDemo.tsx`.

## Focus

`next/image` with explicit `width`/`height` (not `fill` unless wrapper has fixed height), CLS, unneeded `"use client"`, bundle, safe `next.config` options only.
