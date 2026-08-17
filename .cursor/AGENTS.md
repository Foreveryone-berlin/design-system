# Cursor agent instructions — foreveryone-design-system

Precedence shim for the **Cursor agent** (IDE agent mode). Path-scoped reminders live in [`.cursor/rules/*.mdc`](rules/) and are auto-attached by Cursor. Full index and domain rules: **[docs/AGENTS.md](../docs/AGENTS.md)**.

**Maintenance:** When stack pins, commands, or skill triggers change, update this file together with [CLAUDE.md](../CLAUDE.md) and root [AGENTS.md](../AGENTS.md). See [docs/agents/agent-contract.md](../docs/agents/agent-contract.md) (Cross-tool parity).

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
| Build CSS from tokens | `node scripts/build-css.js` |
| Build agent token spec | `node scripts/build-spec.js` → `spec/tokens.json` |
| Build both | `npm run build` |
| Prototype dev | `cd prototype && npm install && npm run dev` |
| Screenshot key pages | `cd prototype && OUT_DIR=baseline BASE_URL=http://localhost:3100 node scripts/screenshot.mjs` |
| Prototype e2e + axe (LOCAL) | with dev server up: `cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e` |
| Solo merge to `develop` | `bash scripts/pr-and-merge.sh` |
| Ship release | `ship-release` skill (`.claude/skills/ship-release/`); triggers: "ship it", "cut release" |

Cursor IDE auto-loads project skills from `.claude/skills/`.

## Git and PR rules

- Branch from **`develop`**, not `main`. Prefixes: `feature/`, `fix/`, `docs/`, `chore/`.
- Conventional Commits; use `.github/PULL_REQUEST_TEMPLATE.md` for PRs.
- When the user explicitly asks to ship / merge to develop / open and merge a PR, use `bash scripts/pr-and-merge.sh` (see `docs/pr-and-merge-workflow.md`).
- Never add agent attribution (`Co-authored-by: Cursor`, `@cursoragent`, Made/Generated with Cursor). Hard fail.
- Changelog: any `tokens/` or `css/` change → update `## [Unreleased]` in `CHANGELOG.md`.

## Key docs

| Topic | File |
| --- | --- |
| Full index + domain | `docs/AGENTS.md` |
| Task contract | `docs/agents/agent-contract.md` |
| Runtime / risk tiers | `docs/agents/runtime-policy.md` |
| Cross-tool map | `docs/agents/README.md` |
| PR workflow | `docs/pr-and-merge-workflow.md` |
| Token workflow | `docs/skills/token-update.md` |
| Release workflow | `docs/skills/release.md` |
| Visual styles | `docs/visual-styles.md` |

## Retrieval-led reasoning

**IMPORTANT:** For tokens, CSS, Elementor, Figma, or Next.js prototype tasks, follow retrieval-led reasoning from **`docs/AGENTS.md`** (and the files it indexes) before relying on model memory.

Path-scoped reminders: [`.cursor/rules/`](rules/) (`.mdc`). Claude parity: [`.claude/rules/`](../.claude/rules/) (Markdown).
