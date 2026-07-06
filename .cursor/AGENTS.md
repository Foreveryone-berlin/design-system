# Cursor agent instructions — foreveryone-design-system

Precedence shim for the **Cursor agent** (IDE agent mode). Path-scoped reminders live in [`.cursor/rules/*.mdc`](rules/) and are auto-attached by Cursor. Full index and domain rules: **[docs/AGENTS.md](../docs/AGENTS.md)**.

**Maintenance:** When stack pins, commands, prototype baseline, or skill triggers change, update this file together with [CLAUDE.md](../CLAUDE.md) and root [AGENTS.md](../AGENTS.md). See [docs/agents/agent-contract.md](../docs/agents/agent-contract.md) (Cross-tool parity).

## Precedence

If any instruction conflicts, use this order:

1. [`docs/AGENTS.md`](../docs/AGENTS.md)
2. [`docs/agents/agent-contract.md`](../docs/agents/agent-contract.md)
3. [`docs/agents/runtime-policy.md`](../docs/agents/runtime-policy.md)
4. [`docs/pr-and-merge-workflow.md`](../docs/pr-and-merge-workflow.md)
5. Repo root [`AGENTS.md`](../AGENTS.md) (mirror / retrieval index)

## Mandatory reads for Cursor agent

- Runtime context, docs index, token/CSS/Elementor rules: **`docs/AGENTS.md`**
- Task shape and verification: **`docs/agents/agent-contract.md`**
- Sandbox / autonomy and risk tiers: **`docs/agents/runtime-policy.md`**
- Merge-to-develop solo workflow: **`docs/pr-and-merge-workflow.md`**
- Path-scoped reminders: **`.cursor/rules/*.mdc`** (auto-attached by Cursor)

## What this repo is

Design system for [foreveryone.berlin](https://foreveryone.berlin/) — WordPress + Elementor Pro + child theme on the live site; **this repo** holds tokens, CSS, Elementor/Figma docs, and a **Next.js prototype** (`prototype/`). Figma = visual source of truth; repo = implementation source of truth.

## Stack pin

```text
Tokens|W3C DTCG JSON ($value, $type, $description) | refs {category.tier.variant}
CSS|authored: var(--*) only | css/custom-properties.css GENERATED — edit tokens + build
Classes|fe-* | Elementor bp: mobile <767 | tablet 768–1024 | desktop >1025
Prototype|Next.js — see prototype/package.json
```

Common mistakes:

- Editing `css/custom-properties.css` by hand — run `node scripts/build-css.js` after token changes.
- Hardcoding hex or `font-family` in authored CSS — use variables from `custom-properties.css`.
- Skipping `CHANGELOG.md` when touching `tokens/` or implementation `css`.

## Commands

| Task | Command |
| --- | --- |
| Build CSS from tokens (repo root) | `node scripts/build-css.js` |
| Build agent token spec (repo root) | `node scripts/build-spec.js` → `spec/tokens.json` |
| Build both (CSS + spec) | `npm run build` |
| Prototype dev | `cd prototype && npm install && npm run dev` |
| Screenshot key pages at 3 breakpoints | `cd prototype && OUT_DIR=baseline BASE_URL=http://localhost:3100 node scripts/screenshot.mjs` |
| Prototype e2e + axe (LOCAL, not prod) | with dev server up: `cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e` |
| Solo PR + merge to `develop` | `bash scripts/pr-and-merge.sh` |
| Ship a full release (develop→main→tag→Vercel) | `ship-release` skill (`.claude/skills/ship-release/`); triggers: "ship it", "cut release" |

## Skills

Skills live in `.claude/skills/`. Cursor IDE auto-loads them (third-party skills compatibility). Triggers:

- **ship-release** — "ship it", "cut release", "release X.Y.Z", "ship to main"
- **optimize-prototype** — optimize, audit, or improve the prototype (performance, a11y, SEO, code quality)

Manual workflow fallbacks: [docs/skills/](../docs/skills/).

## Prototype quality baseline

An optimization pass (performance, accessibility, SEO, code quality) established these conventions in `prototype/`. Keep them when adding pages or components:

- **Images:** raster images use `next/image` with explicit `width`/`height` (not `fill`, since the wrappers have no fixed height). Inline SVGs stay as `<img>` (no `dangerouslyAllowSVG`).
- **Accessibility:** `globals.css` provides a global `:focus-visible` ring, a `.ds-skip-link` (its target is `#main-content` on `<main>` in `layout.tsx`), and a `prefers-reduced-motion` block. Icon-only buttons need `aria-label`; nav links set `aria-current="page"`; the dialog is a native `<dialog>` via `Popup`; hidden mobile-nav regions use `inert`.
- **Metadata:** `layout.tsx` holds a title template, canonical, OG/Twitter, and a Next 15 `export const viewport` (theme-color). `app/manifest.ts` is the web manifest. The site is intentionally `robots: noindex, nofollow` (internal design system); do not make it indexable, and do not add a sitemap.
- **Verify visually:** run the screenshot command into `OUT_DIR=baseline` before changes and `OUT_DIR=after` post-change, then diff. CLI full pass: `bash scripts/optimize-run.sh`. IDE: `optimize-prototype` skill (`.claude/skills/optimize-prototype/`).

## Git and PR rules

- Branch from **`develop`**, not `main`. Prefixes: `feature/`, `fix/`, `docs/`, `chore/`.
- Conventional Commits; use `.github/PULL_REQUEST_TEMPLATE.md` for PRs.
- When the user explicitly asks to ship / merge to develop / open and merge a PR, use `bash scripts/pr-and-merge.sh` (see `docs/pr-and-merge-workflow.md`).

## Key docs

| Topic | File |
| --- | --- |
| Full docs index + condensed domain | `docs/AGENTS.md` |
| Task contract + verification | `docs/agents/agent-contract.md` |
| Runtime / risk tiers | `docs/agents/runtime-policy.md` |
| Cross-tool map | `docs/agents/README.md` |
| PR workflow | `docs/pr-and-merge-workflow.md` |
| Token pipeline skill | `docs/skills/token-update.md` |
| Elementor mapping skill | `docs/skills/elementor-mapping.md` |
| Release skill | `docs/skills/release.md` |
| Icons, blobs, photography | `docs/visual-styles.md` |

## Retrieval-led reasoning

**IMPORTANT:** For tokens, CSS, Elementor, Figma, or Next.js prototype tasks, follow retrieval-led reasoning from **`docs/AGENTS.md`** (and the files it indexes) before relying on model memory.

Path-scoped reminders: [`.cursor/rules/`](rules/) (`.mdc`). Claude parity: [`.claude/rules/`](../.claude/rules/) (Markdown).
