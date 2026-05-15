# ForEveryone Berlin Design System

Design system repository for the ForEveryone Berlin website (`https://foreveryone.berlin/`), built for a WordPress + Elementor Pro workflow with custom CSS and token-driven styling.

## Project Overview

This repository defines shared design foundations so designers, developers, and Elementor editors can work from the same system. It includes design tokens, generated CSS custom properties, reusable CSS primitives, and implementation documentation for WordPress + Elementor.

## Tech Stack

- WordPress (child theme integration)
- Elementor Pro (Global Colors, Global Fonts, Custom CSS)
- Plain CSS
- Node.js (single build script)
- Figma + Tokens Studio plugin

## Repository Structure

```text
foreveryone-design-system/
├── AGENTS.md                     # Mirror: retrieval index + pins (tools that only read repo root)
├── CLAUDE.md                     # Claude Code entry (pins + key docs; full index in docs/AGENTS.md)
├── .codex/
│   └── AGENTS.md                 # OpenAI Codex precedence shim
├── .claude/
│   └── rules/                    # Claude Code rules (mirrors .cursor/rules)
├── .cursor/
│   └── rules/                    # Cursor IDE rules (.mdc)
├── docs/                         # AGENTS.md, agents/, audit, onboarding, ADRs, skills, …
│   ├── AGENTS.md                 # Canonical agent narrative + full docs index
│   └── agents/                   # Cross-tool agent contract + README
├── tokens/                       # Source-of-truth token JSON files
├── css/                          # Generated vars + implementation CSS
├── elementor/                    # Elementor mapping and setup docs
├── figma/                        # Figma sync instructions
├── scripts/                      # Build scripts
├── .github/                      # PR template
├── README.md
├── CHANGELOG.md
└── .gitignore
```

## Quick Start

1. Clone the repository.
2. Install dependencies:
   - `npm install`
3. Build token CSS custom properties:
   - `node scripts/build-css.js`
4. Confirm output:
   - `css/custom-properties.css` was regenerated.

## Design system prototype

A Next.js app in `prototype/` previews the tokens and components. Live at [design.foreveryone.berlin](https://design.foreveryone.berlin) (the legacy `fe-design-system.vercel.app` URL 301-redirects there; see [docs/prototype-deploy.md](docs/prototype-deploy.md)). To run it locally:

1. From repo root, build token CSS: `node scripts/build-css.js`
2. `cd prototype && npm install && npm run dev`
3. Open [http://localhost:3000](http://localhost:3000) (or the port Next.js prints). In Cursor, you can ask the agent to “open the prototype in the Cursor browser” to view it there.

## How Tokens Work

1. Token values live in `tokens/*.json`.
2. `scripts/build-css.js` reads `tokens/index.json` imports.
3. Script generates `css/custom-properties.css` (`:root` custom properties).
4. Implementation styles in `css/*.css` consume variables via `var(--...)`.
5. Elementor and WordPress consume the same values through documented mappings.

## Figma Sync

Use Tokens Studio in Figma to mirror token sets and export/sync JSON:

- Setup and policy: [`figma/sync-guide.md`](figma/sync-guide.md)
- Export instructions: [`figma/token-export-instructions.md`](figma/token-export-instructions.md)

## Elementor Integration

- Global colors mapping: [`elementor/global-colors.md`](elementor/global-colors.md)
- Global fonts mapping: [`elementor/global-fonts.md`](elementor/global-fonts.md)
- Custom CSS + enqueue setup: [`elementor/custom-css-setup.md`](elementor/custom-css-setup.md)
- Visual styles (icons, blobs, photography): [`docs/visual-styles.md`](docs/visual-styles.md)

## Official References

Elementor and WordPress official docs used for this setup: [docs/official-references.md](docs/official-references.md) (Global Settings, Global Colors/Fonts, Custom CSS, child themes, `wp_enqueue_style`).

## Git Workflow

- `main`: default branch (repo setting), protected, release-ready
- `develop`: integration branch
- Branch from `develop` using:
  - `feature/*`
  - `fix/*`
  - `docs/*`
  - `chore/*`
- Use Conventional Commits.
- Merge `develop` -> `main` for release and tag semver versions.

## AI coding assistants

- **Canonical context:** [docs/AGENTS.md](docs/AGENTS.md) (full documentation index and domain rules).
- **Repo root [AGENTS.md](AGENTS.md):** duplicate index for tools that only auto-load root `AGENTS.md` (see [Vercel note on AGENTS.md](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)).
- **OpenAI Codex:** root `AGENTS.md` plus [.codex/AGENTS.md](.codex/AGENTS.md) (precedence order inside that file).
- **Anthropic Claude Code:** [CLAUDE.md](CLAUDE.md) at session start; [.claude/rules/](.claude/rules/) for topic reminders; Cursor uses [.cursor/rules/](.cursor/rules/).
- **Portable contract:** [docs/agents/agent-contract.md](docs/agents/agent-contract.md); **runtime / risk:** [docs/agents/runtime-policy.md](docs/agents/runtime-policy.md) (same idea as **parcellab-website** agent docs).

## Skills & Workflows

Repeatable workflows (token updates, Elementor mapping, releases): [docs/skills/](docs/skills/).

## Contributing

See [`docs/contributing.md`](docs/contributing.md) for contribution workflow, commit conventions, and PR expectations.

## License

Licensing is split by content type:

- **Software** (`scripts/`, `prototype/`): **MIT** — see the **MIT License** section in [LICENSE](LICENSE).
- **Design system** (`tokens/`, `css/`, `figma/`, `elementor/`, `docs/`, root documentation including `AGENTS.md` / `CLAUDE.md`, `.codex/`, and `.claude/` / `.cursor/` rules): **CC BY-NC 4.0** — [human-readable summary](https://creativecommons.org/licenses/by-nc/4.0/); full legal text under **Creative Commons Attribution-NonCommercial 4.0 International** in [LICENSE](LICENSE).

All terms live in that single file (dual licensing — apply the section that matches what you reuse).

## Changelog

Project history is tracked in [`CHANGELOG.md`](CHANGELOG.md) using Keep a Changelog format.
