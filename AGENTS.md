# ForEveryone Berlin — AI agent context

Design system for https://foreveryone.berlin/ — WordPress + Elementor Pro + child theme + repo tokens/CSS. Figma = visual source of truth; this repo = implementation source of truth.

**IMPORTANT: Prefer retrieval-led reasoning over pre-training-led reasoning** for any design-system, token, CSS, Elementor, Figma, or prototype (Next.js) tasks. Open the indexed files below instead of guessing APIs, token paths, or Elementor behavior.

---

## [ForEveryone Design System Docs Index]

Paths are repo-relative from project root.

|root:{README.md,CHANGELOG.md}
|.github:{PULL_REQUEST_TEMPLATE.md}
|docs:{audit.md,contributing.md,cursor-plan-prompt.md,getting-started.md,official-references.md,pr-and-merge-workflow.md,token-naming.md,validation.md}
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

**Prefix:** Public classes use `fe-` (ForEveryone). Examples in `utilities.css`: `.fe-btn-primary`, `.fe-btn-secondary`, `.fe-icon-btn`, `.fe-play-btn`, `.fe-card`, `.fe-card-benefit`, `.fe-card-get-involved`, `.fe-input` (+ error/disabled), `.fe-faq-item`, `.fe-dropdown`, `.fe-nav-link`, `.fe-header`, `.fe-footer`, `.fe-tag-pill` (+ variants), `.fe-section`, `.fe-container`.

**Elementor:** Breakpoints — mobile under 767px, tablet 768–1024px, desktop over 1025px. Prefer logical properties; mobile-first min-width. `!important` only to beat Elementor inline styles; comment why. Globals live in DB; align with tokens per `elementor/global-colors.md` and `elementor/global-fonts.md`.

**Changelog:** Any change under `tokens/` or `css/` requires `CHANGELOG.md` update under `[Unreleased]` (per project rules).

**Git:** Branch from `develop` (not `main`). Conventional Commits. PRs use `.github/PULL_REQUEST_TEMPLATE.md`. Solo merge to develop: `bash scripts/pr-and-merge.sh` from repo root.

**Workflows:** Token changes → `docs/skills/token-update.md`. Elementor sync → `docs/skills/elementor-mapping.md`. Release → `docs/skills/release.md`.

**Prototype:** Next.js app under `prototype/` previews tokens/components; uses `app/globals.css` and design-system CSS patterns — consult `prototype/README.md` and match framework version in `prototype/package.json` when touching App Router/APIs.
