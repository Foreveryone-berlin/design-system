# Agents — ForEveryone Berlin design system

Canonical narrative, documentation index, and domain rules for this repository.

**Repo root [`AGENTS.md`](../AGENTS.md)** duplicates the retrieval index and condensed rules for tools that only read `AGENTS.md` at the repository root (see [Vercel: AGENTS.md vs skills](https://vercel.com/blog/agents-md-outperforms-skills-in-our-agent-evals)).

**Coding agents:** [Cursor agent](https://docs.cursor.com/agent) loads repo guidance via root [`AGENTS.md`](../AGENTS.md) and [`.cursor/AGENTS.md`](../.cursor/AGENTS.md) (precedence there), and auto-attaches [`.cursor/rules/`](../.cursor/rules/) (`.mdc`) by path. [Cursor CLI](https://cursor.com/docs/cli/using) reads root [`AGENTS.md`](../AGENTS.md) and [`CLAUDE.md`](../CLAUDE.md) plus [`.cursor/rules/`](../.cursor/rules/); it does not load `.cursor/AGENTS.md`. [Claude Code](https://code.claude.com/docs) reads [`CLAUDE.md`](../CLAUDE.md) at session start and uses [`.claude/rules/`](../.claude/rules/) (Markdown). Both Cursor and Claude auto-load project skills from [`.claude/skills/`](../.claude/skills/). **Update this file** when changing shared narrative; then refresh the root mirror, `CLAUDE.md`, and `.cursor/AGENTS.md` pins if needed (see [agents/agent-contract.md](agents/agent-contract.md) Cross-tool parity).

Portable task contract: [agents/agent-contract.md](agents/agent-contract.md).

**IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning** for any design-system, token, CSS, integration, Figma, or prototype (Next.js) tasks. Open the indexed files below instead of guessing APIs, token paths, or host-platform behavior.

**What this repo is:** a platform-neutral design system. `tokens/`, `spec/`, `docs/`, and the shared `css/*.css` layers carry no platform-specific selectors, slot numbers, or product names. Everything that targets one host platform lives in `integrations/<target>/` and `css/integrations/<target>.css`. Current targets: the Next.js prototype in `prototype/`, any framework or plain-CSS consumer, and the host platforms in [integrations/README.md](../integrations/README.md).

---

## [ForEveryone Design System Docs Index]

Paths are repo-relative from project root unless noted.

|root:{README.md,CHANGELOG.md,AGENTS.md,CLAUDE.md,llms.txt}
|docs:{AGENTS.md,a11y-conformance.md,brand-book-references.md,canva-icon-gap-audit.md,color-audit-2026.md,contributing.md,figma-final-design-audit.md,getting-started.md,integration-checklist.md,logo-usage.md,pr-and-merge-workflow.md,prototype-deploy.md,token-naming.md,validation.md,visual-styles.md}
|docs/agents:{README.md,agent-contract.md,runtime-policy.md,redesign-from-this-system.md}
|spec:{tokens.json,principles.md}
|spec/components:{README.md,button.md,tag-pill.md,card.md,input.md,faq.md,header.md,footer.md,dropdown.md,popup.md,testimonial.md}
|spec/patterns:{README.md}
|docs/decisions:{001-token-format.md}
|docs/skills:{README.md,token-update.md,release.md}
|.claude:{settings.json,rules/git.md,rules/general.md,rules/css.md,rules/tokens.md,skills/optimize-prototype/SKILL.md}
|cursor:{AGENTS.md,rules/git.mdc,rules/general.mdc,rules/css.mdc,rules/tokens.mdc}
|integrations:{README.md}
|integrations/elementor:{setup.md,global-colors.md,global-fonts.md,mapping.md,references.md}
|figma:{sync-guide.md,token-export-instructions.md}
|tokens:{index.json,colors.json,typography.json,spacing.json,radius.json,shadows.json,motion.json}
|css:{custom-properties.css,base.css,typography.css,utilities.css}
|css/integrations:{elementor.css}
|scripts:{build-css.js,build-css.test.js,build-spec.js,pr-and-merge.sh,optimize-run.sh,import-figma-elements.mjs,import-desktop-elements.mjs,svg-normalize.mjs}
|prototype:{README.md,next.config.ts,package.json,tsconfig.json,playwright.config.ts}
|prototype/app:{layout.tsx,page.tsx,globals.css,manifest.ts,FaqDemo.tsx}
|prototype/app/_components:{FeIcon.tsx,CodeBlock.tsx,HeaderDemo.tsx,MobileNav.tsx,MotionSpecimens.tsx,Navigation.tsx,ObfuscatedEmail.tsx,OnThisPage.tsx,Popup.tsx,Search.tsx,HeadingAnchors.tsx,EventsWorkshopsSwitcher.tsx,NavigationHistory.tsx,AssetTile.tsx,LogoClearSpace.tsx,StatCounter.tsx,TestimonialCard.tsx,TestimonialSlider.tsx,ViewTransitions.tsx,ui-glyphs.ts,ui-glyph-markup.ts,page-headings.ts,nav-sections.ts,search-index.ts,slugify.ts}
|prototype/app:{components,patterns,foundations,guidelines,governance,accessibility,credits,brand,logo,visual-elements,print}/page.tsx
|prototype/content:{site-copy.ts}
|prototype/tests:{a11y.spec.ts,smoke.spec.ts}
|prototype/scripts:{screenshot.mjs,screenshot-patterns-tones.mjs,build-og-card.mjs}
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
| Screenshot key pages at 3 breakpoints | `cd prototype && OUT_DIR=baseline BASE_URL=http://localhost:3100 node scripts/screenshot.mjs` |
| Solo merge current branch to `develop` (PR + merge via `gh`) | `bash scripts/pr-and-merge.sh` (repo root) |
| Ship a full release (develop→main→tag→Vercel) | user-level `ship` skill; triggers: "ship it", "cut release", "release X.Y.Z". Manual fallback: `docs/skills/release.md` |

---

## Condensed domain knowledge (read full files when editing)

**Token pipeline:** `tokens/*.json` (W3C DTCG: only `$value`, `$type`, `$description` per token) → run `node scripts/build-css.js` → regenerates `css/custom-properties.css` (`:root` vars). Never hand-edit `custom-properties.css`.

**References:** Tokens may reference others with `{category.tier.variant}` (e.g. `{color.orange.500}`; semantic names such as `color.background-title` reference their ramp step this way). Valid `$type`: color, dimension, fontFamily, fontWeight, duration, number, string. Color tokens need `$description`.

**Naming:** `{category}.{tier}.{variant}`. Categories in use: color, font, spacing, radius, shadow, motion. Figma paths use `/`; repo uses `.`, and the colour families are named differently (Figma `Primary/500` → repo `color.orange.500`). See `docs/token-naming.md`.

**CSS layers:** `base.css` reset/body; `typography.css` heading/body/label/tag utilities (`.fe-h1`, `.fe-body`, …); `utilities.css` components (buttons, cards, inputs, FAQ, dropdown, header, footer, nav, sections). These three are platform-neutral. Per-target layers live in `css/integrations/` (currently `elementor.css`, low-specificity `.elementor-*` tweaks, loaded only by that target). All authored values use `var(--…)` from custom properties — no raw hex or font-family names outside generated file.

**Prefix:** Public classes use `fe-` (ForEveryone). Examples in `utilities.css`: `.fe-btn-primary`, `.fe-btn-secondary`, `.fe-icon-btn`, `.fe-icon-btn--filled-brand`, `.fe-play-btn`, `.fe-card`, `.fe-card-benefit`, `.fe-card-get-involved`, `.fe-facts-card` (+ `__grid`/`__label`/`__value`), `.fe-steps` (+ `.fe-step`, `.fe-step__connector`), `.fe-split-list` (+ `__items`/`__item`), `.fe-person` (+ `__photo`/`__name`/`__role`/`__bio`, `--card`), `.fe-people-grid` (+ `--cards`), `.fe-input` (+ error/disabled), `.fe-faq-item`, `.fe-dropdown`, `.fe-nav-link`, `.fe-header`, `.fe-footer`, `.fe-tag-pill` (+ variants), `.fe-testimonial` (+ `__marks`/`__quote`/`__attribution`, `--quote`), `.fe-testimonial-grid`, `.fe-testimonial-slider` (+ `__viewport`/`__track`/`__slide`/`__dots`/`__dot`), `.fe-section`, `.fe-container`. Prototype-only documentation chrome uses `ds-` and lives in `prototype/app/globals.css`, never in `css/`. Visual rules for icons/blobs/photos: `docs/visual-styles.md`.

**Breakpoints:** Mobile-first `min-width` only. The shared layer breaks at **640px, 768px, 1024px** (`css/utilities.css`); the `ds-` prototype chrome additionally uses 1200px and 1600px plus container queries (`prototype/app/globals.css`). There are no breakpoint tokens. Prefer logical properties (`margin-inline`, `padding-block`). Where a component must respond to its own column rather than the viewport, use a container query, not a media query. A host platform's own editor breakpoints are that target's config, not the system's: see `integrations/README.md`.

**Integrations:** Platform-specific code and docs live in `integrations/<target>/` plus `css/integrations/<target>.css`; nothing platform-specific belongs in `tokens/`, `spec/`, `docs/`, or the shared `css/*.css`. `!important` only to beat a host platform's inline styles; comment why. Target list and sync workflows: `integrations/README.md`. Pre-release checks for any consuming surface: `docs/integration-checklist.md`.

**Changelog:** Any change under `tokens/` or `css/` requires a `CHANGELOG.md` update under the current in-flight version section (e.g. `## [Unreleased]`).

**Git:** Branch from `develop` (not `main`). Conventional Commits. PRs use `.github/PULL_REQUEST_TEMPLATE.md`. Never add agent attribution (`Co-authored-by: Cursor`, `@cursoragent`, Made/Generated with Cursor). Solo merge to develop: `bash scripts/pr-and-merge.sh` from repo root. Detail: `docs/pr-and-merge-workflow.md`.

**Workflows:** Token changes → `docs/skills/token-update.md`. Per-target sync → `integrations/README.md`. Release → `docs/skills/release.md`, driven end-to-end by the user-level `ship` skill (there is no project release skill; deploy is Vercel on push to `main`, `release.yml` only creates the GitHub Release). Prototype audit → `optimize-prototype` skill (`.claude/skills/optimize-prototype/`).

**Prototype:** Next.js app under `prototype/` previews tokens/components; uses `app/globals.css` and design-system CSS patterns — consult `prototype/README.md` and match framework version in `prototype/package.json` when touching App Router/APIs.
