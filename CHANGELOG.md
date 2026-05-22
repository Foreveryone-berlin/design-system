# Changelog

**Labels**

- **Build**, **Chore**, **CI**, **Docs**, **Enhance**, **Feat**, **Fix**, **Perf**, **Revert**, **Sec**, **Style**
- **(WIP)** — append when in progress

## [Unreleased]

## [0.13.0] - 2026-05-22

README and release infrastructure improvements. Hero image, acknowledgements section, shorter GitHub About, and an automated GitHub release workflow.

- **Docs**: README rewritten in community-focused voice aligned with foreveryone.berlin; hero image (`social-preview.jpg`, 1200×630) added at top; acknowledgements section added (WIP — team names to follow).
- **CI**: New `.github/workflows/release.yml` — on annotated tag push `v*.*.*`, extracts the matching CHANGELOG section and creates a GitHub Release with a bare `vX.Y.Z` title and bullets-only body.
- **Chore**: `package.json` version bumped to `0.13.0`.
- **Chore**: Prototype metadata description updated (removed stale "future home" copy).

## [0.12.0] - 2026-05-21

Brand-guide alignment release (2026 Quick Brand Guidelines, Ver 2.0). Orange is now decorative-only, Filson Pro italic is first-class, Young Serif is print-only, filled category icons are formalised, and an approved bg ⇄ text matrix is published. No raw hex changes — only role reassignments — so tokens remain backwards compatible.

- **Feat**: Tokens: semantic aliases `color.background-{default,soft,title,alert}` + `color.accent-{icon,border}` emit `--color-background-*` / `--color-accent-*`; `font.weight.italic` added with a new `.fe-em` utility; `scripts/build-css.js` emits the new vars and warns that `--font-family-accent` is print-only.
- **Feat**: Filled category icon system — `painting/pottery/wellness/language.svg` under `prototype/public/icons/categories/` + `CategoryIcon` component (`stroke="currentColor"`) wired into `.fe-card-category` (filled-icon chip on Warm White).
- **Feat**: `/tokens#color-combinations` renders the five valid bg ⇄ text pairs plus the disallowed orange-as-background case.
- **Enhance**: Header demo nav — filled-triangle glyphs replaced by a thin SVG chevron (`.fe-nav-chevron`, rotates 180° when open); desktop dropdown is Light Orange, offset `spacing-3` below the trigger, `width: max-content` (cap 320px), items in theme-4 → brand-primary + white on hover → focus-button on `:active`; mobile menu is full-bleed centered rows in regular weight with faint dividers, expanded triggers get a Light Orange bar, sub-items inline at Charcoal, CTA stretches with the panel.
- **Enhance**: Footer pattern — "For Everyone" promoted to a full-width bold brand line above the grid; "Explore"/"Support"/"Contact" use a dedicated `.fe-footer__column-title` (lg, medium); legal link `Terms` → `Impressum`.
- **Enhance**: Workshop card gets a 1px `--color-light-gray` border at rest; `#workshop-card` uses `overflow: visible` + padding so the drop-shadow renders on every side. Home `.ds-overview-card` hover adds a soft peach (`color-mix(--color-light-orange 30%, white)`). `.ds-section-title` bottom margin bumped to `spacing-6` for breathing room. Newsletter popup illustration swapped to `prototype/public/icons/megaphone.png` (added `scripts/process-popup-icon.mjs`). FAQ accordion content now animates open/close via `grid-template-rows` (`0fr ⇄ 1fr`) with opacity + padding transitions, replacing the previous `display: none/block` toggle.
- **Fix**: Restyle prior orange-bg + white-text components: `.fe-tag-pill.active` → Lime Green + Charcoal; `.fe-card-badge` → Warm White + Charcoal + orange border; Elementor accordion active tab → Soft Lavender + Charcoal. Filled-icon utilities reference `--color-accent-icon`. `.fe-h1--accent` drops Young Serif (print-only) and keeps the orange tint only. `.fe-nav-link` / Elementor `.elementor-nav-menu a` drop focus underline, stay Charcoal on mouse hover, draw a brand-secondary outline only on keyboard `:focus-visible`.
- **Chore**: `.fe-btn-primary` and `.ds-btn--orange` keep their pre-0.12.0 Orange + white look (live CTA visual deferred to a follow-up).
- **Chore**: Tokens: `brand-primary` description rewritten for the decorative-only rule (with the white-logo-on-orange exception); typography weight + family tokens carry full `$description` (regular/italic/medium/bold/black, Filson Pro digital+print, Young Serif print-only).
- **Docs**: New `docs/logo-usage.md` (X measurement, 1X safe zone, 32 px / 8 mm min sizes, white-on-orange exception); `docs/color-audit-2026.md` gains the approved bg ⇄ text combinations matrix; `docs/visual-styles.md` cross-links the category icon set + logo doc; `elementor/global-colors.md` marks Global 2 (Orange) DECORATIVE ONLY; `docs/AGENTS.md` index updated.
- **Docs**: Drop OpenAI Codex layering (`.codex/AGENTS.md` removed) and add Cursor agent layering (new `.cursor/AGENTS.md` precedence shim); root `AGENTS.md`, `docs/AGENTS.md`, `docs/agents/{README,agent-contract,runtime-policy}.md`, and `README.md` re-pointed; `.cursor/rules/*.mdc` unchanged. README rewritten for clarity (tighter lede, single Quick start, consolidated Integrations).

### Migration notes

- Authored CSS should now reference `--color-background-*` / `--color-accent-*` for backgrounds and accents. Raw `var(--color-brand-primary)` background uses are intentionally retained for `.fe-btn-primary` and `.ds-btn--orange` (live CTA visual unchanged in this release).

### Known follow-ups (out of scope for 0.12.0)

- Webfont hosting for Filson Pro Regular / Italic / Medium / Bold (prototype still uses Outfit as fallback).
- Replace placeholder category SVGs with bespoke brand-aligned glyphs.
- Dedicated stacked + standalone logo SVG variants per `docs/logo-usage.md`.

## [0.11.1] - 2026-05-21

- **Enhance**: Prototype: header demo nav aligned to production menu (Workshops, EU Projects with 3 sub-items, About Us with 3 sub-items, Cafe, Blog, Contact).
- **Enhance**: Prototype: popup component restyled to match production newsletter modal (megaphone illustration, lede copy, pill input, full-width Subscribe button).
- **Enhance**: Prototype: workshop card uses dedicated `workshop-group.jpg` (1440x900, mozjpeg q82, ~242 KB) instead of reusing the hero image.
- **Enhance**: Prototype: hero asset renamed `hero.png` → `community-cafe.png` and `ASSETS.md` updated.
- **Fix**: Prototype: removed the "in the future it will live at design.foreveryone.berlin" sentence from the homepage (the prototype lives there now).
- **Chore**: Add `scripts/process-workshop-image.mjs` (sharp-based resize/compress helper for prototype assets).
- **Chore**: Gitignore brand guideline reference PDFs (`*_Brand_Guidelines.pdf`).

## [0.11.0] - 2026-05-15

- **Feat**: Prototype: redirect `fe-design-system.vercel.app` → `https://design.foreveryone.berlin` via `prototype/vercel.json` (301, host-based, path-preserving).
- **Feat**: New tokens, `shadow.header`, `color.soft-lavender`; `.fe-icon-btn--filled-brand` utility.
- **Enhance**: Open Graph / Twitter card image replaced with content-aligned community café photo at 1200×630 (1.91:1, mozjpeg q82, ~143 KB); switched extension to `.jpg`; descriptive `alt` added.
- **Enhance**: Homepage hero image replaced with blob-masked community café photo; descriptive `alt` added (was empty); intrinsic `width`/`height` updated to 1090×1094 to remove layout shift.
- **Fix**: Brand palette aligned to 7-color guide (Charcoal `#1E1E1E`, Warm white `#FDFCF7`, Lime `#D4E6A8`, Lavender `#D5C5FF`, new Soft lavender `#E5DCFF`); Elementor mapping updated.
- **Fix**: Typography tokens: rename Filson family value from `'Filson Pro'` to `'FilsonPro'` to match the production webfont.
- **Fix**: CSS: input focus rings use `color-mix()`; site header uses new `shadow.header` token; no raw values left in authored CSS.
- **Fix**: Patterns page: header dropdown no longer clipped by `.ds-section` overflow.
- **Style**: Footer and prototype wave use soft lavender; footer divider uses neutral border token.
- **Docs**: AI agent layout (canonical `docs/AGENTS.md`, root mirror, `CLAUDE.md`, `.codex/`, `docs/agents/`, `.claude/rules`); single root `LICENSE` (MIT + CC BY-NC 4.0); `docs/visual-styles.md`; `docs/color-audit-2026.md`; archive banners on `docs/audit.md` + `docs/cursor-plan-prompt.md`.
- **Docs**: `tokens/radius.json` and `tokens/motion.json`: `$description` on all entries; Cursor/Claude rule parity tweaks.
- **Chore**: Ignore Vercel CLI artifacts at repo root (`.vercel/` in root `.gitignore`).
- **Chore**: Prototype: `next.config.ts` sets `poweredByHeader: false` and image formats to AVIF + WebP.
- **Build**: Root `package.json` with `build` / `test` / `prototype:*` script aliases.
- **Test**: `scripts/build-css.test.js` validates DTCG shape (`$value`/`$type`) on every token leaf and smoke-checks generated `css/custom-properties.css` (header banner, `:root` block, 21 required custom properties). 103 assertions, dependency-free.
- **CI**: `.github/workflows/ci.yml` runs token build + test (with drift check on `css/custom-properties.css`) and prototype `next build` on PRs and pushes to `develop` / `main`.
- **Docs**: `docs/prototype-deploy.md` documents the Vercel project, the `vercel.json` redirect, and the lifecycle for removing the legacy `.vercel.app` URL. Cross-linked from `docs/skills/release.md` and `docs/visual-styles.md`.
- **Docs**: README points at the live `design.foreveryone.berlin` and references the deploy doc.

## [0.9.1] - 2026-03-30

- **Feat**: Prototype: replace header/sidebar text branding with ForEveryone logo.
- **Enhance**: Prototype: calmer transitions; remove hero CTAs; improve demo polish (icons, footer pattern radius).
- **Fix**: Prototype: disable route fade replay on Firefox to avoid flicker; prevent tokens code blocks from forcing horizontal scroll on mobile; remove popup backdrop blur.
- **Style**: CSS: button focus ring only on keyboard (`:focus-visible`); accordion active state uses gray theme; benefit/get-involved cards use light green.

## [0.9.0] - 2026-03-27

- **Feat**: Deployment with Vercel.
- **Enhance**: Synced prototype favicon assets and social preview image from foreveryone.berlin.

## [0.8.0] - 2026-03-23

- **Feat**: `noindex, nofollow` meta on all prototype pages.
- **Feat**: `robots.txt` AI bot block list via [ai-robots-txt](https://github.com/ai-robots-txt/ai.robots.txt).
- **Feat**: Interactive header pattern: animated hamburger, slide-down mobile nav, desktop dropdown sub-menus.
- **Feat**: View transitions (fade-in) between pages.
- **Enhance**: Homepage: third CTA "View Patterns".
- **Fix**: Color tokens: replaced placeholder scales with actual site palette (~24 named colors).
- **Fix**: Tokens page: color swatches reordered light→dark, brand trio pinned first.
- **Fix**: Play button: shrunk to 3rem (48px).
- **Fix**: Color swatch grid: fluid responsive columns.
- **Fix**: Footer pattern: stacking newsletter + bottom bar on narrow screens.
- **Fix**: Site footer: mobile-safe padding.
- **Fix**: Responsive: header stacks at 1300px, header shadow, compact newsletter input.
- **Fix**: CodeBlock hydration mismatch: `language-*` class and `tabIndex` set at render.
- **Docs**: Elementor global-colors doc rewritten with new token names.
- **Docs**: CHANGELOG rewritten with tag-label format.

## [0.7.0] - 2026-03-20

- **Feat**: Tokens page: PrismJS syntax-highlighted code blocks.
- **Feat**: Testimonial card component (centered quote marks, attribution).
- **Feat**: Popup modal (`<dialog>`, contact form, blurred backdrop).
- **Fix**: Tokens page: restored hero-style headline from v0.5.x.

## [0.6.0] - 2026-03-20

- **Feat**: Multi-page structure: `/`, `/tokens`, `/components`, `/patterns`.
- **Feat**: Sidebar nav (desktop, sticky) with active-state highlighting.
- **Feat**: Mobile hamburger nav (<768px) with dropdown.
- **Feat**: Shared layout with persistent nav and footer.
- **Feat**: Overview page: hero, stats strip, card grid.

## [0.5.1] - 2026-03-16

- **Fix**: FAQ accordion: primary background on active item so text is visible.

## [0.5.0] - 2026-03-16

- **Feat**: Extended spacing tokens (14–32, 8pt grid).
- **Feat**: Icon/play buttons, FAQ accordion, dropdown, header/footer, workshop card, category tags, input states, card benefit/get-involved.
- **Build**: `build-css.js`: full color scales + spacing + font-size output.
- **Feat**: Elementor overrides: accordion, nav menu, form labels.

## [0.4.0] - 2026-03-12

- **Feat**: Site copy module, hero + mission + stats, public assets.
- **Feat**: Hero with image, radius/shadow/motion demos, icons, wave section, footer with semver.
- **Enhance**: Copy refocused on design system; agnostic stats; simplified hero image.

## [0.3.1] - 2026-03-12

- **Fix**: Hydration error from Cursor `data-cursor-ref` injection; `suppressHydrationWarning` on layout root.
- **Docs**: README: prototype run instructions.

## [0.3.0] - 2026-03-12

- **Docs**: `docs/pr-and-merge-workflow.md`.
- **CI**: `pr-and-merge.yml`: `workflow_dispatch` only; `main` default branch.

## [0.2.0] - 2026-03-12

- **Feat**: Prototype scaffold (Next.js, tokens, buttons, cards, form, chips, blockquote, hero, Outfit).
- **CI**: `scripts/pr-and-merge.sh` and workflow; Cursor merge-to-develop rule.

## [0.1.0] - 2026-03-12

- **Feat**: Design system scaffold (WordPress + Elementor): W3C DTCG tokens, `build-css.js`, CSS layers, Elementor docs, Figma sync guide, Git/PR template, contributing guides, ADR 001.
