# Agents (foreveryone-design-system)

Canonical narrative + tables: **[docs/AGENTS.md](docs/AGENTS.md)**.

The blocks below are duplicated here so tools that only read repo-root `AGENTS.md`
still get the retrieval index and stack pin (see
[Vercel: AGENTS.md vs skills](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)).

**Maintenance:** When stack pins, commands, prototype baseline, or skill triggers change, update this file together with [CLAUDE.md](CLAUDE.md) and [.cursor/AGENTS.md](.cursor/AGENTS.md). See [docs/agents/agent-contract.md](docs/agents/agent-contract.md) (Cross-tool parity).

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

## Commands (repo root unless noted)

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

Skills live in `.claude/skills/`. Cursor IDE and CLI auto-load them (third-party skills compatibility). Triggers:

- **ship-release** — "ship it", "cut release", "release X.Y.Z", "ship to main"
- **optimize-prototype** — optimize, audit, or improve the prototype (performance, a11y, SEO, code quality)

Manual workflow fallbacks: [docs/skills/](docs/skills/).

## Prototype quality baseline

Keep these conventions in `prototype/` when adding pages or components:

- **Images:** raster images use `next/image` with explicit `width`/`height` (not `fill`). Inline SVGs stay as `<img>`.
- **Accessibility:** global `:focus-visible` ring, `.ds-skip-link` → `#main-content`, `prefers-reduced-motion`. Icon-only buttons need `aria-label`; nav links set `aria-current="page"`; dialog via native `<dialog>` in `Popup`; hidden mobile-nav regions use `inert`.
- **Metadata:** title template, canonical, OG/Twitter, Next 15 `viewport`. `robots: noindex, nofollow`; no sitemap.
- **Verify visually:** screenshot with `OUT_DIR=baseline` / `OUT_DIR=after`, then diff. CLI: `bash scripts/optimize-run.sh`. Full pass: `optimize-prototype` skill.

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
| Claude Code entry | [CLAUDE.md](CLAUDE.md) |
| PR / merge workflow | [docs/pr-and-merge-workflow.md](docs/pr-and-merge-workflow.md) |
| Token update skill | [docs/skills/token-update.md](docs/skills/token-update.md) |
| Cursor path-scoped rules | [.cursor/rules/](.cursor/rules/) |

## Retrieval-led reasoning

**IMPORTANT:** Prefer retrieval-led reasoning over pre-training-led reasoning for
any design-system, token, CSS, Elementor, Figma, or prototype (Next.js) tasks. Use the index below to open the right files instead of guessing.

**Coding agents:** [Cursor agent](https://docs.cursor.com/agent) reads this file plus [.cursor/AGENTS.md](.cursor/AGENTS.md) (precedence there) and auto-attaches [.cursor/rules/](.cursor/rules/) (`.mdc`) by path. [Cursor CLI](https://cursor.com/docs/cli/using) reads this file and [CLAUDE.md](CLAUDE.md) at the project root (not `.cursor/AGENTS.md`). [Claude Code](https://code.claude.com/docs) reads [CLAUDE.md](CLAUDE.md) and uses [.claude/rules/](.claude/rules/) (Markdown). Both tools auto-load skills from [.claude/skills/](.claude/skills/).

---

## [ForEveryone Design System Docs Index]

Paths are repo-relative from project root.

|root:{README.md,CHANGELOG.md,AGENTS.md,CLAUDE.md,llms.txt}
|docs:{AGENTS.md,audit.md,brand-book-references.md,color-audit-2026.md,contributing.md,cursor-plan-prompt.md,getting-started.md,logo-usage.md,official-references.md,pr-and-merge-workflow.md,prototype-deploy.md,token-naming.md,validation.md,visual-styles.md}
|docs/agents:{README.md,agent-contract.md,runtime-policy.md,redesign-from-this-system.md}
|spec:{tokens.json,principles.md}
|spec/components:{README.md,button.md,tag-pill.md,card.md,input.md,faq.md}
|spec/patterns:{README.md}
|docs/decisions:{001-token-format.md}
|docs/skills:{README.md,token-update.md,elementor-mapping.md,release.md}
|claude:{rules/git.md,rules/general.md,rules/css.md,rules/tokens.md,skills/ship-release/SKILL.md,skills/optimize-prototype/SKILL.md}
|cursor:{AGENTS.md,rules/git.mdc,rules/general.mdc,rules/css.mdc,rules/tokens.mdc}
|elementor:{global-colors.md,global-fonts.md,custom-css-setup.md}
|elementor/templates:{README.md}
|figma:{sync-guide.md,token-export-instructions.md}
|tokens:{index.json,colors.json,typography.json,spacing.json,radius.json,shadows.json,motion.json}
|css:{custom-properties.css,base.css,typography.css,utilities.css,elementor-overrides.css}
|scripts:{build-css.js,build-css.test.js,pr-and-merge.sh}
|prototype:{README.md,next.config.ts,package.json,tsconfig.json,playwright.config.ts}
|prototype/app:{layout.tsx,page.tsx,globals.css,manifest.ts,FaqDemo.tsx}
|prototype/app/_components:{FeIcon.tsx,CodeBlock.tsx,HeaderDemo.tsx,MobileNav.tsx,MotionSpecimens.tsx,Navigation.tsx,ObfuscatedEmail.tsx,OnThisPage.tsx,Popup.tsx,StatCounter.tsx,TestimonialCard.tsx,ViewTransitions.tsx}
|prototype/app:{components,patterns,foundations,guidelines,governance,accessibility,credits,brand,logo,visual-elements,print}/page.tsx
|prototype/content:{site-copy.ts}
|prototype/tests:{a11y.spec.ts,smoke.spec.ts}
|prototype/scripts:{screenshot.mjs,build-og-card.mjs}
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

**Workflows:** Token changes → `docs/skills/token-update.md`. Elementor sync → `docs/skills/elementor-mapping.md`. Release → `docs/skills/release.md` (automated via `ship-release` skill in `.claude/skills/ship-release/`; Cursor auto-loads). Prototype audit → `optimize-prototype` skill in `.claude/skills/optimize-prototype/`.

**Prototype:** Next.js app under `prototype/` previews tokens/components; uses `app/globals.css` and design-system CSS patterns — consult `prototype/README.md` and match framework version in `prototype/package.json` when touching App Router/APIs.
