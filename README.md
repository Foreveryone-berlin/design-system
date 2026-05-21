# ForEveryone Berlin Design System

Token-driven design system for [foreveryone.berlin](https://foreveryone.berlin/) — a WordPress + Elementor Pro site backed by a child theme. This repository holds the **source of truth for implementation**: design tokens, generated CSS custom properties, hand-authored CSS primitives, Elementor / Figma mappings, and a Next.js prototype that previews everything together.

Live prototype: **[design.foreveryone.berlin](https://design.foreveryone.berlin)** (legacy `fe-design-system.vercel.app` 301-redirects there).

## Quick start

```bash
# Build CSS custom properties from tokens
node scripts/build-css.js

# Run the prototype locally
cd prototype && npm install && npm run dev
# → http://localhost:3000
```

Root `package.json` exposes script aliases: `npm run build`, `npm test`, `npm run prototype:dev`, `npm run prototype:build`, `npm run prototype:lint`.

## How tokens work

1. Token values live in [`tokens/*.json`](tokens/) (W3C DTCG shape: `$value`, `$type`, `$description`).
2. [`scripts/build-css.js`](scripts/build-css.js) reads [`tokens/index.json`](tokens/index.json) imports.
3. The script generates [`css/custom-properties.css`](css/custom-properties.css) (the `:root` block of CSS custom properties). **Do not hand-edit it.**
4. Authored layers in [`css/*.css`](css/) consume the variables via `var(--…)`.
5. WordPress + Elementor and the Next.js prototype both read from the same generated file.

`scripts/build-css.test.js` validates the DTCG shape and smoke-checks the generated CSS.

## Repository layout

```text
foreveryone-design-system/
├── tokens/                       # Source-of-truth token JSON (DTCG)
├── css/                          # Generated + authored CSS
├── scripts/                      # Build + test + PR helpers
├── prototype/                    # Next.js preview app
├── elementor/                    # Global colors / fonts / custom CSS setup
├── figma/                        # Tokens Studio sync notes
├── docs/                         # Canonical agent narrative, guides, ADRs
│   ├── AGENTS.md                 #   ↳ full docs index + domain rules
│   ├── agents/                   #   ↳ cross-tool agent contract + runtime policy
│   ├── skills/                   #   ↳ repeatable workflows
│   ├── color-audit-2026.md, logo-usage.md, visual-styles.md, …
├── AGENTS.md                     # Repo-root mirror of docs/AGENTS.md
├── CLAUDE.md                     # Claude Code session entry
├── .cursor/{AGENTS.md, rules/}   # Cursor agent precedence + path-scoped rules
├── .claude/rules/                # Claude Code path-scoped rules
├── .github/                      # PR template + CI workflows
├── README.md                     # ← you are here
└── CHANGELOG.md
```

## Integrations

- **Figma + Tokens Studio:** [`figma/sync-guide.md`](figma/sync-guide.md) and [`figma/token-export-instructions.md`](figma/token-export-instructions.md).
- **Elementor:** Global colors [`elementor/global-colors.md`](elementor/global-colors.md), global fonts [`elementor/global-fonts.md`](elementor/global-fonts.md), child-theme CSS enqueue [`elementor/custom-css-setup.md`](elementor/custom-css-setup.md). Background WordPress + Elementor reference: [`docs/official-references.md`](docs/official-references.md).
- **Visual styles** (icons, blobs, photography, category icon set): [`docs/visual-styles.md`](docs/visual-styles.md).
- **Logo usage** (X measurement, safe zone, min sizes, white-on-orange exception): [`docs/logo-usage.md`](docs/logo-usage.md).
- **Color audit** (2026 brand-guide alignment + approved background ⇄ text combinations): [`docs/color-audit-2026.md`](docs/color-audit-2026.md).

## Git workflow

- `main` is the default branch (protected, release-ready). `develop` is the integration branch.
- Branch from `develop` using `feature/*`, `fix/*`, `docs/*`, `chore/*`.
- Use Conventional Commits.
- PRs use [`.github/PULL_REQUEST_TEMPLATE.md`](.github/PULL_REQUEST_TEMPLATE.md).
- Solo flow: `bash scripts/pr-and-merge.sh` pushes the current branch, opens a PR, and merges it. Detail in [`docs/pr-and-merge-workflow.md`](docs/pr-and-merge-workflow.md).
- Tag `main` with `vX.Y.Z` at release.

## AI coding assistants

- **Canonical context:** [`docs/AGENTS.md`](docs/AGENTS.md) (full documentation index + domain rules).
- **Repo-root mirror:** [`AGENTS.md`](AGENTS.md) — duplicated index for tools that only auto-load `AGENTS.md` at the repo root.
- **Cursor agent:** [`.cursor/AGENTS.md`](.cursor/AGENTS.md) precedence shim; path-scoped `.mdc` reminders in [`.cursor/rules/`](.cursor/rules/) auto-attach by file location.
- **Claude Code:** [`CLAUDE.md`](CLAUDE.md) at session start; path-scoped Markdown rules in [`.claude/rules/`](.claude/rules/).
- **Portable contract + runtime policy:** [`docs/agents/agent-contract.md`](docs/agents/agent-contract.md), [`docs/agents/runtime-policy.md`](docs/agents/runtime-policy.md).
- **Repeatable workflows:** [`docs/skills/`](docs/skills/) (token updates, Elementor mapping, releases).

## Contributing

See [`docs/contributing.md`](docs/contributing.md) for workflow, commit conventions, and PR expectations.

## License

Dual-licensed in a single [LICENSE](LICENSE) file (apply the section that matches what you reuse):

- **Software** (`scripts/`, `prototype/`): **MIT**.
- **Design system** (`tokens/`, `css/`, `figma/`, `elementor/`, `docs/`, root agent docs, `.claude/` and `.cursor/` rules): **CC BY-NC 4.0** ([summary](https://creativecommons.org/licenses/by-nc/4.0/)).

## Changelog

Project history is tracked in [`CHANGELOG.md`](CHANGELOG.md) using the Keep a Changelog format. GitHub Releases for each tag mirror the changelog entry.
