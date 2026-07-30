# Claude Code — ForEveryone Berlin design system

Focused entry for [Claude Code](https://code.claude.com/docs). Full index and rules: **[docs/AGENTS.md](docs/AGENTS.md)**. Do not duplicate long indexes here; read that file for retrieval paths.

**Maintenance:** When stack pins, commands, or git summary change, update this file, root [AGENTS.md](AGENTS.md), and [.cursor/AGENTS.md](.cursor/AGENTS.md), plus matching sections in [docs/AGENTS.md](docs/AGENTS.md) as needed.

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
- Skipping `CHANGELOG.md` when touching `tokens/` or implementation `css/`.

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

Cursor IDE and CLI auto-load project skills from `.claude/skills/`.

## Git and PR rules

- Branch from **`develop`**, not `main`. Prefixes: `feature/`, `fix/`, `docs/`, `chore/`.
- Conventional Commits; use `.github/PULL_REQUEST_TEMPLATE.md` for PRs.
- Never add Claude co-author trailers or "Generated with Claude Code" attribution unless the user explicitly asks.
- When the user explicitly asks to ship / merge to develop / open and merge a PR, use `bash scripts/pr-and-merge.sh` (see `docs/pr-and-merge-workflow.md`).
- Changelog: any `tokens/` or `css/` change → update `## [Unreleased]` in `CHANGELOG.md`.

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

**IMPORTANT:** For tokens, CSS, Elementor, Figma, or Next.js work, open files from **`docs/AGENTS.md`** (documentation index) instead of relying on training data alone.

Path-scoped reminders: [`.claude/rules/`](.claude/rules/). Cursor parity: [`.cursor/rules/`](.cursor/rules/) (`.mdc`).
