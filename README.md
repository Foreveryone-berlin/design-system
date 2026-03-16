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
├── .cursor/
│   └── rules/                    # AI desktop rules
├── tokens/                       # Source-of-truth token JSON files
├── css/                          # Generated vars + implementation CSS
├── elementor/                    # Elementor mapping and setup docs
├── figma/                        # Figma sync instructions
├── docs/                         # Audit, onboarding, conventions, ADRs
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

A Next.js app in `prototype/` previews the tokens and components (future design.foreveryone.berlin). To run it:

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

## Skills & Workflows

Repeatable workflows (token updates, Elementor mapping, releases): [docs/skills/](docs/skills/).

## Contributing

See [`docs/contributing.md`](docs/contributing.md) for contribution workflow, commit conventions, and PR expectations.

## License

This work is licensed under [Creative Commons Attribution-NonCommercial 4.0 International (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/). See [LICENSE](LICENSE) for the full text.

## Changelog

Project history is tracked in [`CHANGELOG.md`](CHANGELOG.md) using Keep a Changelog format.
