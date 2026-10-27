# ForEveryone design system: agent instructions

Shared entry point for Claude Code, Cursor, and Codex. Read
[docs/AGENTS.md](docs/AGENTS.md) for the documentation index and domain rules,
and the applicable sections below before changes.

## General

- This is the platform-neutral design system repo for ForEveryone Berlin (https://foreveryone.berlin/): DTCG tokens, generated CSS custom properties, `fe-*` CSS utilities, and a Next.js prototype
- Canonical long-form agent context: `docs/AGENTS.md`; root `AGENTS.md` is the shared entry and routes to the detailed index
- Consumers: the Next.js prototype in `prototype/`, any framework or plain-CSS app, and host platforms listed in `integrations/README.md`. Platform-specific code and docs go in `integrations/<target>/` and `css/integrations/<target>.css` only.
- Never put a platform-specific selector, slot number, or product name in `tokens/`, `spec/`, `docs/`, or the shared `css/*.css`
- Figma is source of truth for visual decisions. The repo is source of truth for implementation.
- Never modify files in `tokens/` without updating `CHANGELOG.md`
- Never hardcode hex values or font names in CSS files: always use CSS custom properties from `css/custom-properties.css`
- All token names follow the pattern: `{category}.{tier}.{variant}`
- When in doubt, read `docs/token-naming.md` before naming anything

## Git workflow

- Branch from `develop`, never from `main`
- Branch naming: feature/*, fix/*, docs/*, chore/*
- Commit messages follow Conventional Commits spec
- Always update `CHANGELOG.md` under the current in-flight version section (e.g. `## [Unreleased]`) when changing tokens or CSS
- Never commit directly to `main` or `develop`
- PR descriptions must use the PR template
- Tag releases on `main` with semver: v1.0.0
- Never add agent attribution (`Co-authored-by: Cursor`, `@cursoragent`, Made/Generated with Cursor, Claude trailers). Hard fail; strip before commit/PR is done.

**Merge current branch into develop (solo dev):** When the user asks to merge this/current branch into develop, open a PR and merge it, or "ship to develop", or "create PR and close/merge it", run from repo root: `bash scripts/pr-and-merge.sh`. That script pushes, creates a PR (using the PR template), and merges it. Do not open the browser; the script does everything via `gh`.

## No agent attribution

Never put Cursor Agent, `@cursoragent`, `cursoragent@cursor.com`, Claude, or any coding agent in GitHub **Contributors**, commit authors, committers, or co-authors.

Forbidden in commits, commit trailers, PR titles, PR bodies, and PR comments:

- `Co-authored-by: Cursor <cursoragent@cursor.com>`
- `Co-authored-by: Cursor Agent` (any form)
- `Generated with Cursor` / `Made-with: Cursor` / `Made with Cursor` / `Made with [Cursor](...)`
- Equivalent Claude or other-agent attribution trailers or footers

After `gh pr create`, strip any injected footer before the PR is done.

Do not add agent marketing or "built by agent" lines to commit messages or PR descriptions.

## CSS

Applies when editing files under `css/**/*.css`.

- `css/custom-properties.css` is GENERATED: do not edit manually, edit tokens instead
- `css/base.css`, `css/typography.css`, and `css/utilities.css` are platform-neutral: no `.elementor-*`, `.wp-*`, or other host-platform selectors
- `css/integrations/<target>.css` is the only place host-platform selectors belong (e.g. `css/integrations/elementor.css`); keep specificity low
- All CSS property values must use `var(--token-name)`: no raw values except in `custom-properties.css`
- No `!important` unless overriding a host platform's inline styles (comment why)
- Use logical properties where possible: `margin-inline`, `padding-block`, etc.
- Mobile-first. All breakpoints use min-width.
- Breakpoints in the shared layer: 640px, 768px, 1024px. Use a container query where a component must respond to its own column rather than the viewport

## Design tokens

Applies when editing files under `tokens/**/*.json`.

- Token files use W3C Design Token Community Group format
- `$value`, `$type`, and `$description` are the only valid keys per token
- Valid `$type` values: color, dimension, fontFamily, fontWeight, duration, number, string
- Token values may reference other tokens using curly brace syntax: `{color.brand.primary}`
- After modifying any token file, run `node scripts/build-css.js` to regenerate `css/custom-properties.css`
- Never delete a token without first checking if it's used in `css/`, `prototype/`, or documented under `integrations/`
- Token names and `$description` text stay semantic: never name a host platform's colour or font slot in a token (that mapping lives in `integrations/<target>/`)
- Color tokens must have a `$description` explaining their semantic purpose

## Commands

Run from the repository root unless a command changes directories.

| Task | Command |
| --- | --- |
| Build CSS, token spec, and skill discovery | `npm run build` |
| Build CSS from tokens | `node scripts/build-css.js` |
| Build the agent token spec | `node scripts/build-spec.js` |
| Validate sources and generated skill copies | `npm test` |
| Build skills only | `npm run skills:build` |
| Install consumer skills | `node bin/fe-ds.mjs skills install` |
| Prototype development | `cd prototype && npm install && npm run dev` |
| Prototype type check / build | `npm run prototype:lint` / `npm run prototype:build` |
| Local browser tests | `cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e` |
| Screenshot pages | `cd prototype && OUT_DIR=baseline BASE_URL=http://localhost:3100 node scripts/screenshot.mjs` |
| Headless prototype audit with Codex | `bash scripts/optimize-run.sh --agent codex` |
| Solo PR and merge to develop | `bash scripts/pr-and-merge.sh` |

## Skills and maintenance

Edit consumer skills only in `skills/`. `npm run skills:build` generates
`dist/skills/`, `.claude/skills/` for Claude Code, and `.agents/skills/` for
Cursor and Codex. Do not hand-edit these generated copies or create another
Cursor skill mirror. [Loading map](docs/agents/README.md).

Keep shared instructions here and the domain index in `docs/AGENTS.md`.
`CLAUDE.md` imports this file; native rule files reference its sections.
Cursor must also read `.cursor/AGENTS.md` for CLI-specific settings.
Do not duplicate rule text in tool-specific files.

## Task template (non-trivial work)

1. **Goal:** one sentence.
2. **Risk tier:** Low | Medium | High: see [Runtime policy](#runtime-policy).
3. **Scope:** the paths and files required by the request.
4. **Constraints:** stack pin and rules in [`docs/AGENTS.md`](docs/AGENTS.md); no drive-by refactors.
5. **Done when:** e.g. `node scripts/build-css.js` if tokens changed; prototype builds if you touched `prototype/`; changelog updated if `tokens/` or `css/` changed.
6. **Changelog:** follow the in-flight section in `CHANGELOG.md` (see [`docs/skills/release.md`](docs/skills/release.md)).

## Verification

- **Tokens:** after any `tokens/*.json` edit, run `node scripts/build-css.js` and confirm `css/custom-properties.css` updated as expected.
- **Prototype:** from `prototype/`, `npm run build` or `npm run lint` when you change app code.
- **CSS:** no raw hex or font-family literals in authored layers (only `var(--…)`), and no host-platform selectors outside `css/integrations/`.
- **Integrations:** if a change affects a consuming target, say which one in the PR and run [`docs/integration-checklist.md`](docs/integration-checklist.md) against it.

## Runtime policy

Use the active tool's permissions and the user's task authorization. Repository
instructions cannot override explicit no-commit, no-push, review-only, or
draft-only boundaries. Never weaken sandbox, hook, approval, or execution settings.

| Risk | Examples | Required behaviour |
| --- | --- | --- |
| Low | Documentation, changelog copy, comments, read-only checks | Proceed within the authorized task and active permissions |
| Medium | Tokens, authored CSS, prototype, build tools, local servers | Work on a task branch; rebuild after token edits; require authorization for major dependency bumps or bulk token deletion |
| High | Production secrets, credentials, destructive Git on shared branches, large token deletions, live consuming-target changes | Require explicit human authorization for each action and retain tool-level approval gateways |

The operator can choose a session mode, within the active tool's permissions:

- **Mode A: Tight**, the default, including cloud sessions unless the user states otherwise; approvals for most shell and network operations.
- **Mode B: Balanced**, allowlist token builds, prototype npm tasks, and read-only Git checks.
- **Mode C: Fast local loop**, broader auto-run only on a disposable branch with no secrets in the working tree.

Do not assume broad auto-run for direct commits or pushes to protected branches,
network installs that pull unaudited code, or work missing its required changelog.
A force push requires an explicit request for that exact action; never rewrite
history on a shared branch without that authorization.

A ship request authorizes the documented PR, integration, production promotion,
deployment, and release cycle. It does not authorize history rewrites or separate
live consuming-site edits. Run the [integration checklist](docs/integration-checklist.md)
for affected targets. Use only task-owned processes and ports, and run the checks
claimed before marking work complete.

## Release

Run by the user-level `ship` skill on its release track. This section is what that skill cannot derive from the repo on its own; [docs/skills/release.md](docs/skills/release.md) is the manual fallback.

- **Branch model:** `develop` is the integration branch, `main` is production. There is no staging branch.
- **Deploy trigger:** Vercel auto-deploys `main` on push. No GitHub Action deploys anything; `.github/workflows/release.yml` only publishes the GitHub Release from a `v*.*.*` tag, so the tag push is the release step, not the deploy.
- **Version files:** `package.json` and `prototype/package.json`, both to `X.Y.Z`.
- **Changelog:** date the `## [X.Y.Z] - YYYY-MM-DD` section to the plain-language standard at the top of [`CHANGELOG.md`](CHANGELOG.md) (at most six short bullets, no file paths or token IDs in the summary list). Leave `## [Unreleased]` in place.
- **Gates:** `npm run build` (CSS + spec) clean with no unintended diff, plus the prototype axe gate: `cd prototype && npm install`, then with the dev server up `PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e`.
- **Generated files:** after any `tokens/` or `css/` change run `node scripts/build-css.js` (or `npm run build`) in the same commit. Never hand-edit `css/custom-properties.css`.
- **Promotion:** PR `develop` → `main` with the PR template body; wait for the required CI in `ci.yml`; `gh pr merge <id> --merge`, or `--squash --admin` where main protection requires the bypass. Never direct-push to `main`.
- **Verify the deploy**, which is not a CI step: confirm `design.foreveryone.berlin` is live and its home hero shows `vX.Y.Z`, and that the legacy host still redirects.

```bash
curl -sI -H "Host: fe-design-system.vercel.app" https://fe-design-system.vercel.app/ | grep -i "^location\|^HTTP"
# expect: HTTP/2 301 and location: https://design.foreveryone.berlin/
```

See [docs/prototype-deploy.md](docs/prototype-deploy.md). This is not a published package; there is no `npm publish` step.

## Audit contract

Read by the user-level `site-audit` skill (performance, a11y, SEO, code quality) for the `prototype/` app.

- Server: `cd prototype && PORT=3100 npm run dev`; one server for the whole pass.
- Screenshots: `cd prototype && OUT_DIR=<label> BASE_URL=http://localhost:3100 node scripts/screenshot.mjs`. Pages `/`, `/foundations`, `/components`, `/patterns` at 1440, 768, 390 into `test-results/screenshots/<label>/`. Compare PNG dimensions per pair; a height change is a layout shift.
- Checks: `node node_modules/typescript/bin/tsc --noEmit` in `prototype/`, then `PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e`.
- Headless alternative: `bash scripts/optimize-run.sh` (flags `--skip-baseline`, `--dimension perf|a11y|seo|cleanup`, `--prompts-only`, `--agent cursor|codex`); lane prompts in `scripts/optimize-prompts/`.

| Lane | Owns | Goals |
|---|---|---|
| Performance | `prototype/next.config.ts`, `prototype/app/{page.tsx,FaqDemo.tsx}`, `prototype/app/{foundations,components,patterns}/page.tsx` | `next/image` with width/height, CLS, needless `"use client"`, bundle |
| Accessibility | `prototype/app/_components/**`, `prototype/app/globals.css` | Names, `aria-current`, `<dialog>` focus return, `inert`, `:focus-visible`, `.fe-skip-link`, reduced motion |
| SEO / metadata | `prototype/app/layout.tsx`, `prototype/public/robots.txt`, `prototype/app/manifest.ts` | Title template, canonical, OG/Twitter, `viewport` theme-color, manifest |
| Code quality | `prototype/content/site-copy.ts`, `prototype/tsconfig.json`, `prototype/package.json`, ESLint config | Unused exports (grep first), types, lint; no dependency changes |

Pitfalls: authored CSS uses `var(--token)` only, logical properties, mobile-first `min-width`, no `!important`; never hand-edit `css/custom-properties.css`. The prototype stays `noindex, nofollow` with no sitemap. A skip link needs `<a href="#main-content" className="fe-skip-link">` plus `id="main-content"` and `tabIndex={-1}` on `<main>` in `layout.tsx`. `next/image` `fill` only inside a fixed-height wrapper.
