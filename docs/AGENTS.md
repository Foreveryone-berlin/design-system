# Agents — ForEveryone Berlin design system

Canonical narrative, documentation index, and domain rules for this repository.

**Repo root [`AGENTS.md`](../AGENTS.md)** duplicates the retrieval index and condensed rules for tools that only read `AGENTS.md` at the repository root (see [Vercel: AGENTS.md vs skills](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)).

**Coding agents:** [Cursor agent](https://docs.cursor.com/agent) loads repo guidance via root [`AGENTS.md`](../AGENTS.md) and [`.cursor/AGENTS.md`](../.cursor/AGENTS.md) (precedence there), and auto-attaches [`.cursor/rules/`](../.cursor/rules/) (`.mdc`) by path. [Claude Code](https://code.claude.com/docs) reads [`CLAUDE.md`](../CLAUDE.md) at session start and uses [`.claude/rules/`](../.claude/rules/) (Markdown). **Update this file** when changing shared narrative; then refresh the root mirror + `CLAUDE.md` "Key docs" / pins if needed.

Portable task contract: [agents/agent-contract.md](agents/agent-contract.md).

**IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning** for any design-system, token, CSS, Elementor, Figma, or prototype (Next.js) tasks. Open the indexed files below instead of guessing APIs, token paths, or Elementor behavior.

---

## [ForEveryone Design System Docs Index]

Paths are repo-relative from project root unless noted.

|root:{README.md,CHANGELOG.md,AGENTS.md,CLAUDE.md,llms.txt}
|docs:{AGENTS.md,audit.md,brand-book-references.md,color-audit-2026.md,contributing.md,cursor-plan-prompt.md,getting-started.md,logo-usage.md,official-references.md,pr-and-merge-workflow.md,prototype-deploy.md,token-naming.md,validation.md,visual-styles.md}
|docs/agents:{README.md,agent-contract.md,runtime-policy.md,redesign-from-this-system.md}
|spec:{tokens.json,principles.md}
|spec/components:{README.md,button.md,tag-pill.md,card.md,input.md,faq.md}
|docs/decisions:{001-token-format.md}
|docs/skills:{README.md,token-update.md,elementor-mapping.md,release.md}
|elementor:{global-colors.md,global-fonts.md,custom-css-setup.md}
|elementor/templates:{README.md}
|figma:{sync-guide.md,token-export-instructions.md}
|tokens:{index.json,colors.json,typography.json,spacing.json,radius.json,shadows.json,motion.json}
|css:{custom-properties.css,base.css,typography.css,utilities.css,elementor-overrides.css}
|scripts:{build-css.js,build-css.test.js,pr-and-merge.sh}
|prototype:{README.md,next.config.ts,package.json,tsconfig.json,playwright.config.ts}
|prototype/app:{layout.tsx,page.tsx,globals.css,manifest.ts,FaqDemo.tsx}
|prototype/app/_components:{CategoryIcon.tsx,CodeBlock.tsx,HeaderDemo.tsx,MobileNav.tsx,MotionSpecimens.tsx,Navigation.tsx,ObfuscatedEmail.tsx,OnThisPage.tsx,Popup.tsx,StatCounter.tsx,TestimonialCard.tsx,ViewTransitions.tsx}
|prototype/app:{components,patterns,foundations,guidelines,governance,accessibility,credits,brand,logo,visual-elements,print}/page.tsx
|prototype/content:{site-copy.ts}
|prototype/tests:{a11y.spec.ts,smoke.spec.ts}
|prototype/scripts:{screenshot.mjs,build-og-card.mjs}
|prototype/public/images:{ASSETS.md}

---

## Commands

| Task | Command |
| --- | --- |
| Regenerate CSS custom properties from tokens | `node scripts/build-css.js` (repo root) |
| Regenerate the machine-readable token spec for agents | `node scripts/build-spec.js` (repo root) — writes `spec/tokens.json` |
| Build both (CSS + spec) | `npm run build` (repo root) |
| Prototype dev server | `cd prototype && npm install && npm run dev` |
| Prototype e2e + axe (against LOCAL, not prod) | `cd prototype` then with the dev server up: `PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e` |
| Solo merge current branch to `develop` (PR + merge via `gh`) | `bash scripts/pr-and-merge.sh` (repo root) |

---

## Condensed domain knowledge (read full files when editing)

**Token pipeline:** `tokens/*.json` (W3C DTCG: only `$value`, `$type`, `$description` per token) → run `node scripts/build-css.js` → regenerates `css/custom-properties.css` (`:root` vars). Never hand-edit `custom-properties.css`.

**References:** Tokens may reference others with `{category.tier.variant}` (e.g. `{color.primary.500}`). Valid `$type`: color, dimension, fontFamily, fontWeight, duration, number, string. Color tokens need `$description`.

**Naming:** `{category}.{tier}.{variant}`. Categories in use: color, font, spacing, radius, shadow, motion. Figma paths use `/`; repo uses `.` (e.g. Figma `color/primary/500` → `color.primary.500`). See `docs/token-naming.md`.

**CSS layers:** `base.css` reset/body; `typography.css` heading/body/label/tag utilities (`.fe-h1`, `.fe-body`, …); `utilities.css` components (buttons, cards, inputs, FAQ, dropdown, header, footer, nav, sections); `elementor-overrides.css` low-specificity `.elementor-*` tweaks. All authored values use `var(--…)` from custom properties — no raw hex or font-family names outside generated file.

**Prefix:** Public classes use `fe-` (ForEveryone). Examples in `utilities.css`: `.fe-btn-primary`, `.fe-btn-secondary`, `.fe-icon-btn`, `.fe-icon-btn--filled-brand`, `.fe-play-btn`, `.fe-card`, `.fe-card-benefit`, `.fe-card-get-involved`, `.fe-input` (+ error/disabled), `.fe-faq-item`, `.fe-dropdown`, `.fe-nav-link`, `.fe-header`, `.fe-footer`, `.fe-tag-pill` (+ variants), `.fe-section`, `.fe-container`. Visual rules for icons/blobs/photos: `docs/visual-styles.md`.

**Elementor:** Breakpoints — mobile under 767px, tablet 768–1024px, desktop over 1025px. Prefer logical properties; mobile-first min-width. `!important` only to beat Elementor inline styles; comment why. Globals live in DB; align with tokens per `elementor/global-colors.md` and `elementor/global-fonts.md`.

**Changelog:** Any change under `tokens/` or `css/` requires a `CHANGELOG.md` update under the current in-flight version section (e.g. `## [0.10.0] - Unreleased`) (per project rules).

**Git:** Branch from `develop` (not `main`). Conventional Commits. PRs use `.github/PULL_REQUEST_TEMPLATE.md`. Solo merge to develop: `bash scripts/pr-and-merge.sh` from repo root. Detail: `docs/pr-and-merge-workflow.md`.

**Workflows:** Token changes → `docs/skills/token-update.md`. Elementor sync → `docs/skills/elementor-mapping.md`. Release → `docs/skills/release.md` (automated end-to-end via the `ship-release` skill, `.claude/skills/ship-release/`; deploy is Vercel on push to `main`, `release.yml` only creates the GitHub Release).

**Prototype:** Next.js app under `prototype/` previews tokens/components; uses `app/globals.css` and design-system CSS patterns — consult `prototype/README.md` and match framework version in `prototype/package.json` when touching App Router/APIs.
