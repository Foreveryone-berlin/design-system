# Agents (foreveryone-design-system)

Canonical narrative + tables: **[docs/AGENTS.md](docs/AGENTS.md)**.

The blocks below are duplicated here so tools that only read repo-root `AGENTS.md`
still get the retrieval index and stack pin (see
[Vercel: AGENTS.md vs skills](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)).

## What this repo is

Design system for [foreveryone.berlin](https://foreveryone.berlin/) — WordPress + Elementor Pro + child theme + tokens and CSS **in this repo**. Figma = visual source of truth; this repo = implementation source of truth. Includes a **Next.js prototype** under `prototype/` (preview only).

## Stack pin

```text
[Stack] WordPress+Elementor (production site) | W3C DTCG tokens JSON | CSS var(--*) in authored layers | Next.js prototype
[Mistakes] hand-edit custom-properties.css | raw hex/font in authored CSS | skip CHANGELOG on tokens/css changes | branch from `main` instead of `develop`
```

## Commands (repo root unless noted)

| Task | Command |
| --- | --- |
| Regenerate `css/custom-properties.css` from tokens | `node scripts/build-css.js` |
| Prototype dev server | `cd prototype && npm install && npm run dev` |
| Solo merge current branch to `develop` | `bash scripts/pr-and-merge.sh` |

## Git and PR rules (summary)

- Branch from **`develop`**, never `main`. Names: `feature/*`, `fix/*`, `docs/*`, `chore/*`.
- Conventional Commits. PRs use `.github/PULL_REQUEST_TEMPLATE.md`.
- **Solo ship to develop:** when the user asks to merge / ship to develop / open PR and merge, run `bash scripts/pr-and-merge.sh` (see `docs/pr-and-merge-workflow.md`).
- **Changelog:** any `tokens/` or `css/` change → update the current in-flight section in `CHANGELOG.md` (e.g. `## [0.10.0] - Unreleased`).

Full detail: [docs/AGENTS.md](docs/AGENTS.md), [docs/agents/agent-contract.md](docs/agents/agent-contract.md).

## Key docs

| Topic | File |
| --- | --- |
| Full agent index + domain | [docs/AGENTS.md](docs/AGENTS.md) |
| Cross-tool contract | [docs/agents/agent-contract.md](docs/agents/agent-contract.md) |
| Runtime / risk policy | [docs/agents/runtime-policy.md](docs/agents/runtime-policy.md) |
| Agent file map | [docs/agents/README.md](docs/agents/README.md) |
| Cursor agent precedence shim | [.cursor/AGENTS.md](.cursor/AGENTS.md) |
| PR / merge workflow | [docs/pr-and-merge-workflow.md](docs/pr-and-merge-workflow.md) |
| Token update skill | [docs/skills/token-update.md](docs/skills/token-update.md) |
| Cursor path-scoped rules | [.cursor/rules/](.cursor/rules/) |

## Retrieval-led reasoning

**IMPORTANT:** Prefer retrieval-led reasoning over pre-training-led reasoning for
any design-system, token, CSS, Elementor, Figma, or prototype (Next.js) tasks. Use the index below to open the right files instead of guessing.

**Coding agents:** [Cursor agent](https://docs.cursor.com/agent) reads this file plus [.cursor/AGENTS.md](.cursor/AGENTS.md) (precedence there) and auto-attaches [.cursor/rules/](.cursor/rules/) (`.mdc`) by path. [Claude Code](https://code.claude.com/docs) reads [CLAUDE.md](CLAUDE.md) and uses [.claude/rules/](.claude/rules/) (Markdown).

---

## [ForEveryone Design System Docs Index]

Paths are repo-relative from project root.

|root:{README.md,CHANGELOG.md,AGENTS.md,CLAUDE.md}
|docs:{AGENTS.md,audit.md,color-audit-2026.md,contributing.md,cursor-plan-prompt.md,getting-started.md,official-references.md,pr-and-merge-workflow.md,token-naming.md,validation.md,visual-styles.md}
|docs/agents:{README.md,agent-contract.md,runtime-policy.md}
|docs/decisions:{001-token-format.md}
|docs/skills:{README.md,token-update.md,elementor-mapping.md,release.md}
|elementor:{global-colors.md,global-fonts.md,custom-css-setup.md}
|elementor/templates:{README.md}
|figma:{sync-guide.md,token-export-instructions.md}
|tokens:{index.json,colors.json,typography.json,spacing.json,radius.json,shadows.json,motion.json}
|css:{custom-properties.css,base.css,typography.css,utilities.css,elementor-overrides.css}
|scripts:{build-css.js,pr-and-merge.sh}
|prototype:{README.md,next.config.ts,package.json,tsconfig.json}
|prototype/app:{layout.tsx,page.tsx,globals.css,FaqDemo.tsx}
|prototype/app/components:{page.tsx,Navigation.tsx,MobileNav.tsx}
|prototype/app/patterns:{page.tsx}
|prototype/app/tokens:{page.tsx}
|prototype/content:{site-copy.ts}
|prototype/public/images:{ASSETS.md}

---

## Condensed domain knowledge (read full files when editing)

**Token pipeline:** `tokens/*.json` (W3C DTCG: only `$value`, `$type`, `$description` per token) → run `node scripts/build-css.js` → regenerates `css/custom-properties.css` (`:root` vars). Never hand-edit `custom-properties.css`.

**References:** Tokens may reference others with `{category.tier.variant}` (e.g. `{color.primary.500}`). Valid `$type`: color, dimension, fontFamily, fontWeight, duration, number, string. Color tokens need `$description`.

**Naming:** `{category}.{tier}.{variant}`. Categories in use: color, font, spacing, radius, shadow, motion. Figma paths use `/`; repo uses `.` (e.g. Figma `color/primary/500` → `color.primary.500`). See `docs/token-naming.md`.

**CSS layers:** `base.css` reset/body; `typography.css` heading/body/label/tag utilities (`.fe-h1`, `.fe-body`, …); `utilities.css` components (buttons, cards, inputs, FAQ, dropdown, header, footer, nav, sections); `elementor-overrides.css` low-specificity `.elementor-*` tweaks. All authored values use `var(--…)` from custom properties — no raw hex or font-family names outside generated file.

**Prefix:** Public classes use `fe-` (ForEveryone). Examples in `utilities.css`: `.fe-btn-primary`, `.fe-btn-secondary`, `.fe-icon-btn`, `.fe-icon-btn--filled-brand`, `.fe-play-btn`, `.fe-card`, `.fe-card-benefit`, `.fe-card-get-involved`, `.fe-input` (+ error/disabled), `.fe-faq-item`, `.fe-dropdown`, `.fe-nav-link`, `.fe-header`, `.fe-footer`, `.fe-tag-pill` (+ variants), `.fe-section`, `.fe-container`. Visual rules for icons/blobs/photos: `docs/visual-styles.md`.

**Elementor:** Breakpoints — mobile under 767px, tablet 768–1024px, desktop over 1025px. Prefer logical properties; mobile-first min-width. `!important` only to beat Elementor inline styles; comment why. Globals live in DB; align with tokens per `elementor/global-colors.md` and `elementor/global-fonts.md`.

**Changelog:** Any change under `tokens/` or `css/` requires a `CHANGELOG.md` update under the current in-flight version section (e.g. `## [0.10.0] - Unreleased`) (per project rules).

**Git:** Branch from `develop` (not `main`). Conventional Commits. PRs use `.github/PULL_REQUEST_TEMPLATE.md`. Solo merge to develop: `bash scripts/pr-and-merge.sh` from repo root.

**Workflows:** Token changes → `docs/skills/token-update.md`. Elementor sync → `docs/skills/elementor-mapping.md`. Release → `docs/skills/release.md`.

**Prototype:** Next.js app under `prototype/` previews tokens/components; uses `app/globals.css` and design-system CSS patterns — consult `prototype/README.md` and match framework version in `prototype/package.json` when touching App Router/APIs.
