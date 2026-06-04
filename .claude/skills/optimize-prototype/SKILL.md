---
name: optimize-prototype
description: Run a full performance, accessibility, SEO, and code-quality audit of the Next.js prototype in prototype/, fixing issues with parallel agents and guarding against visual regressions with before/after screenshots. Use when the user asks to optimize, audit, or improve the prototype across these dimensions.
---

# Optimize the prototype (performance, a11y, SEO, code quality)

Audits and fixes the `prototype/` Next.js app across four dimensions in parallel, then verifies nothing broke visually. Mirrors the pass that established the conventions in `CLAUDE.md` > "Prototype quality baseline".

## When to use

The user wants to optimize/audit the prototype for performance, accessibility, SEO, or code quality (any subset or all four), and wants visual safety checks around the changes.

## Hard rules (carry into every step and every subagent)

- Never use the em-dash character (U+2014), in prose, code, comments, or strings. Use comma, colon, or semicolon.
- No "Generated with Claude" attribution or co-author trailers.
- Do not commit, push, or branch unless the user explicitly asks; leave changes uncommitted for review.
- Authored CSS uses `var(--token)` custom properties only (no raw hex or font-family), logical properties, mobile-first min-width, no `!important`. `css/custom-properties.css` is generated; never hand-edit it.
- The prototype is intentionally `robots: noindex, nofollow`; keep it that way and do not add a sitemap.

## Workflow

### 1. Capture baseline screenshots (before any edit)

Start the dev server on a non-default port and screenshot all key pages at three breakpoints.

```bash
cd prototype
PORT=3100 npm run dev   # run in background; wait for "Ready"
OUT_DIR=baseline BASE_URL=http://localhost:3100 node scripts/screenshot.mjs
```

`scripts/screenshot.mjs` captures `/`, `/tokens`, `/components`, `/patterns` at desktop (1440), tablet (768), mobile (390) into `test-results/screenshots/<OUT_DIR>/<breakpoint>/`. Open one baseline image to confirm it rendered (not blank). Keep the server running for the rest of the pass.

### 2. Run four audit+fix agents IN PARALLEL with disjoint file ownership

Launch all four in a single message (general-purpose subagents). Parallel edits are only safe because each agent owns a non-overlapping file set. Tell every agent: edit only your files; report (do not fix) issues in other files; a shared dev server is on :3100, do not start another; run `npx tsc --noEmit` and fix only type errors in your own files. Skip a dimension the user did not ask for.

- **Performance/build** owns: `next.config.ts`, `app/page.tsx`, `app/tokens/page.tsx`, `app/components/page.tsx`, `app/patterns/page.tsx`, `app/FaqDemo.tsx`. Focus: `next/image` with explicit `width`/`height` (not `fill`, the wrappers have no fixed height), CLS, unneeded `"use client"`, bundle, safe `next.config` options only.
- **Accessibility** owns: `app/_components/**`, `app/globals.css`. Focus: accessible names, `aria-current`, native `<dialog>` semantics + focus return, `inert` for hidden regions, `:focus-visible` ring, `.ds-skip-link`, `prefers-reduced-motion`.
- **SEO** owns: `app/layout.tsx`, `public/robots.txt`, new `app/manifest.ts`, optional `app/sitemap.ts`. Focus: title template, canonical, OG/Twitter, Next 15 `export const viewport` (theme-color), manifest. Keep noindex; do not add a sitemap.
- **Code quality** owns: `content/site-copy.ts`, `tsconfig.json`, `package.json`, ESLint config. Focus: remove genuinely unused exports (grep first), tighten types, lint/tsc hygiene. Do not add/remove deps or bump versions.

### 3. Integrate cross-file handoffs (orchestrator, after agents return)

Agents report issues in files they do not own. Wire those up yourself, e.g. the skip-link CSS needs `<a href="#main-content" className="ds-skip-link">` plus `id="main-content"` + `tabIndex={-1}` on `<main>` in `layout.tsx`. If an agent used `fill`, confirm the wrapper has a fixed height; if not, switch to `width`/`height`. Then run `npx tsc --noEmit` and curl the routes.

### 4. Capture after screenshots and diff

```bash
OUT_DIR=after BASE_URL=http://localhost:3100 node scripts/screenshot.mjs
```

Compare PNG dimensions for every page/breakpoint pair (a height change signals a layout shift); flag any width change or height delta over a few px. Visually open the image-affected pages at all three breakpoints and confirm they match baseline. Small file-size deltas on image pages are expected from image re-encoding.

### 5. Document and report

Update `CLAUDE.md` > "Prototype quality baseline" if conventions changed. Summarize per-dimension what changed and confirm zero visual regressions. Leave changes uncommitted unless the user asks to ship (then `bash scripts/pr-and-merge.sh`).
