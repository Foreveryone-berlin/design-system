[![ForEveryone Design System card: a bold "ForEveryone Design System" headline on a lime-green ground, underlined with an orange hand-drawn stroke, with sprout, smiley, and swirl doodles on the right and a warm-white wave along the bottom.](prototype/public/images/readme-hero.png)](https://design.foreveryone.berlin)

# ForEveryone Design System

This is the shared look and feel for [foreveryone.berlin](https://foreveryone.berlin/), an open, inclusive community space in Berlin. It keeps the brand's colours, type, and reusable building blocks in one place, so everything we make looks like it belongs together, whatever it is built with. It is here for designers, developers, and anyone curious about how the brand fits together.

You can see it all in action on the live preview: **[design.foreveryone.berlin](https://design.foreveryone.berlin)**

### Tech stack

- **Tokens:** W3C DTCG JSON in `tokens/`, built into `css/custom-properties.css` by `scripts/build-css.js`.
- **CSS:** authored layers in `css/*.css`, variables only.
- **Prototype:** Next.js 16 + TypeScript in `prototype/`, hosted on Vercel at `design.foreveryone.berlin`.
- **CI:** GitHub Actions for build, tests, and tag-triggered releases.

### Quick start

Requires **Node 24+**.

```bash
# Build CSS custom properties from tokens
node scripts/build-css.js

# Run the prototype locally
cd prototype && npm install && npm run dev
# → http://localhost:3000
```

Root `package.json` script aliases: `npm run build`, `npm test`, `npm run prototype:dev`, `npm run prototype:build`, `npm run prototype:lint`.

### How design tokens work

1. Token values live in [`tokens/*.json`](tokens/) (W3C DTCG shape: `$value`, `$type`, `$description`).
2. [`scripts/build-css.js`](scripts/build-css.js) reads [`tokens/index.json`](tokens/index.json) imports.
3. The script generates [`css/custom-properties.css`](css/custom-properties.css) (the `:root` block). **Do not hand-edit it.**
4. Authored layers in [`css/*.css`](css/) consume variables via `var(--…)`.
5. Every consumer reads from the same generated file.

`scripts/build-css.test.js` validates the DTCG shape and smoke-checks the generated CSS.

### Repository layout

```text
foreveryone-design-system/
├── tokens/          # Source-of-truth token JSON (DTCG)
├── css/             # Generated + authored CSS
│   └── integrations/#   ↳ per-platform override layers
├── scripts/         # Build, test, and PR helpers
├── bin/             # fe-ds CLI (skills install, etc.)
├── skills/          # Consumer agent skills (fe-core, fe-redesign, …)
├── dist/skills/     # Built skill payload, read by agents from GitHub
├── prototype/       # Next.js preview app
├── integrations/    # Per-platform guides (see integrations/README.md)
├── figma/           # Tokens Studio sync notes
├── spec/            # Agent-facing principles + flattened tokens
├── docs/            # Guides, ADRs, agent contracts
│   ├── AGENTS.md    #   ↳ full docs index + domain rules
│   └── skills/      #   ↳ maintainer workflows (tokens, releases)
├── .cursor/         # Cursor agent (AGENTS.md + path-scoped rules)
├── .claude/         # Claude Code rules, shared explicitly with Codex
├── .agents/skills/  # Codex skill discovery (generated from skills/)
├── AGENTS.md        # Repo-root mirror of docs/AGENTS.md
├── CLAUDE.md        # Claude Code session entry
├── llms.txt         # Agent entry + hard rules
└── CHANGELOG.md
```

## Integrations

- **Consume the system** (plain CSS, React/Next.js, or a CMS): [`docs/getting-started.md`](docs/getting-started.md), then [`integrations/README.md`](integrations/README.md).
- **Pre-release checks:** [`docs/integration-checklist.md`](docs/integration-checklist.md).
- **Figma + Tokens Studio:** [`figma/sync-guide.md`](figma/sync-guide.md).
- **Brand rules:** [`docs/brand-book-references.md`](docs/brand-book-references.md), [`docs/visual-styles.md`](docs/visual-styles.md), [`docs/logo-usage.md`](docs/logo-usage.md).
- **For AI agents:** [`docs/agent-skills.md`](docs/agent-skills.md) (`node bin/fe-ds.mjs skills install`) and [`llms.txt`](llms.txt).

## Git workflow

- Branch from `develop` (`feature/*`, `fix/*`, `docs/*`, `chore/*`) with Conventional Commits; `main` is release-ready.
- `bash scripts/pr-and-merge.sh` opens and merges the PR into `develop`; releases are tagged `vX.Y.Z` on `main` ([`docs/skills/release.md`](docs/skills/release.md)).

## Changelog

Full history in [`CHANGELOG.md`](CHANGELOG.md). GitHub Releases for each tag mirror the matching changelog section.

## Contributing

See [`docs/contributing.md`](docs/contributing.md) for workflow, commit conventions, and PR expectations.

## Acknowledgements

This design system is a community effort. Built with care by the people who make ForEveryone Berlin what it is: a warm, open space where everyone belongs.

With thanks to Rie, Roxana, Marco, Pedram, Angelina, and Didem.

## License

Dual-licensed in a single [LICENSE](LICENSE) file:

- **Software** (`scripts/`, `bin/`, `prototype/`): MIT License. You may use, modify, and distribute the software.
- **Design system materials** (`tokens/`, `css/`, `figma/`, `integrations/`, `docs/`, `skills/`, agent docs, `.agents/` skills, `.claude/` and `.cursor/` rules): CC BY-NC 4.0. You may share and adapt these materials for non-commercial use with attribution. See the [license summary](https://creativecommons.org/licenses/by-nc/4.0/).
- See the [`LICENSE`](LICENSE) file for the complete terms.
