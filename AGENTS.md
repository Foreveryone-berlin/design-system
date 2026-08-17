# Agents (foreveryone-design-system)

Canonical narrative + tables: **[docs/AGENTS.md](docs/AGENTS.md)**.

This repo-root mirror exists for tools that only read `AGENTS.md` at the repository root. For the full documentation index, commands, and domain rules, open **[docs/AGENTS.md](docs/AGENTS.md)**.

**Maintenance:** When stack pins, commands, or skill triggers change, update this file together with [CLAUDE.md](CLAUDE.md) and [.cursor/AGENTS.md](.cursor/AGENTS.md). See [docs/agents/agent-contract.md](docs/agents/agent-contract.md) (Cross-tool parity).

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
| Build CSS from tokens | `node scripts/build-css.js` |
| Build agent token spec | `node scripts/build-spec.js` → `spec/tokens.json` |
| Build both | `npm run build` |
| Prototype dev | `cd prototype && npm install && npm run dev` |
| Prototype e2e + axe (LOCAL) | with dev server up: `cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e` |
| Screenshot key pages | `cd prototype && OUT_DIR=baseline BASE_URL=http://localhost:3100 node scripts/screenshot.mjs` |
| Solo merge to `develop` | `bash scripts/pr-and-merge.sh` |
| Ship release | `ship-release` skill (`.claude/skills/ship-release/`); triggers: "ship it", "cut release" |

## Git and PR rules (summary)

- Branch from **`develop`**, never `main`. Names: `feature/*`, `fix/*`, `docs/*`, `chore/*`.
- Conventional Commits. PRs use `.github/PULL_REQUEST_TEMPLATE.md`.
- Never add agent attribution (`Co-authored-by: Cursor`, `@cursoragent`, Made/Generated with Cursor).
- Solo merge to develop: `bash scripts/pr-and-merge.sh` (see [docs/pr-and-merge-workflow.md](docs/pr-and-merge-workflow.md)).
- Changelog: any `tokens/` or `css/` change → update `## [Unreleased]` in `CHANGELOG.md`.

Full detail: [docs/AGENTS.md](docs/AGENTS.md), [docs/agents/agent-contract.md](docs/agents/agent-contract.md).

## Key docs

| Topic | File |
| --- | --- |
| Full index + domain | [docs/AGENTS.md](docs/AGENTS.md) |
| Task contract | [docs/agents/agent-contract.md](docs/agents/agent-contract.md) |
| Runtime policy | [docs/agents/runtime-policy.md](docs/agents/runtime-policy.md) |
| PR / merge workflow | [docs/pr-and-merge-workflow.md](docs/pr-and-merge-workflow.md) |
| Token update workflow | [docs/skills/token-update.md](docs/skills/token-update.md) |
| Cursor agent precedence shim | [.cursor/AGENTS.md](.cursor/AGENTS.md) |
| Claude Code entry | [CLAUDE.md](CLAUDE.md) |

## Retrieval-led reasoning

**IMPORTANT:** Prefer retrieval-led reasoning from **[docs/AGENTS.md](docs/AGENTS.md)** for any design-system, token, CSS, Elementor, Figma, or prototype (Next.js) tasks. Use the index below to find the right file instead of guessing.

---

## [ForEveryone Design System Docs Index]

Paths are repo-relative from project root.

|root:{README.md,CHANGELOG.md,AGENTS.md,CLAUDE.md,llms.txt}
|docs:{AGENTS.md,brand-book-references.md,color-audit-2026.md,contributing.md,getting-started.md,logo-usage.md,official-references.md,pr-and-merge-workflow.md,prototype-deploy.md,token-naming.md,validation.md,visual-styles.md}
|docs/agents:{README.md,agent-contract.md,runtime-policy.md,redesign-from-this-system.md}
|spec:{tokens.json,principles.md}
|spec/components:{README.md,button.md,tag-pill.md,card.md,input.md,faq.md,header.md,footer.md,dropdown.md,popup.md}
|spec/patterns:{README.md}
|docs/decisions:{001-token-format.md}
|docs/skills:{README.md,token-update.md,elementor-mapping.md,release.md}
|.claude:{rules/git.md,rules/general.md,rules/css.md,rules/tokens.md,skills/ship-release/SKILL.md,skills/optimize-prototype/SKILL.md}
|cursor:{AGENTS.md,rules/git.mdc,rules/general.mdc,rules/css.mdc,rules/tokens.mdc}
|elementor:{global-colors.md,global-fonts.md,custom-css-setup.md}
|elementor/templates:{README.md}
|figma:{sync-guide.md,token-export-instructions.md}
|tokens:{index.json,colors.json,typography.json,spacing.json,radius.json,shadows.json,motion.json}
|css:{custom-properties.css,base.css,typography.css,utilities.css,elementor-overrides.css}
|scripts:{build-css.js,build-css.test.js,build-spec.js,pr-and-merge.sh,optimize-run.sh,import-figma-elements.mjs,import-desktop-elements.mjs,svg-normalize.mjs}
|prototype:{README.md,next.config.ts,package.json,tsconfig.json,playwright.config.ts}
|prototype/app:{layout.tsx,page.tsx,globals.css,manifest.ts,FaqDemo.tsx}
|prototype/app/_components:{FeIcon.tsx,CodeBlock.tsx,HeaderDemo.tsx,MobileNav.tsx,MotionSpecimens.tsx,Navigation.tsx,ObfuscatedEmail.tsx,OnThisPage.tsx,Popup.tsx,Search.tsx,HeadingAnchors.tsx,EventsWorkshopsSwitcher.tsx,NavigationHistory.tsx,AssetTile.tsx,LogoClearSpace.tsx,StatCounter.tsx,TestimonialCard.tsx,ViewTransitions.tsx,ui-glyphs.ts,ui-glyph-markup.ts,page-headings.ts,nav-sections.ts,search-index.ts,slugify.ts}
|prototype/app:{components,patterns,foundations,guidelines,governance,accessibility,credits,brand,logo,visual-elements,print}/page.tsx
|prototype/content:{site-copy.ts}
|prototype/tests:{a11y.spec.ts,smoke.spec.ts}
|prototype/scripts:{screenshot.mjs,screenshot-patterns-tones.mjs,build-og-card.mjs}
|prototype/public/images:{ASSETS.md}
