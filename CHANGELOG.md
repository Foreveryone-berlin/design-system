# Changelog

**Labels**

- **Build**, **Chore**, **CI**, **Docs**, **Enhance**, **Feat**, **Fix**, **Perf**, **Revert**, **Sec**, **Style**
- **(WIP)** — append when in progress

## [0.12.0] - 2026-05-21

Brand-guide alignment release. Implements the 2026 Quick Brand Guidelines (Ver 2.0, April 2026): orange is now decorative-only, Filson Pro italic is first-class, Young Serif is print-only, filled category icons are formalised, and a small approved-combinations matrix is published. No raw hex values changed — only role reassignments — so tokens remain backwards compatible.

- **Feat**: Tokens: add semantic aliases — `color.background-default|soft|title|alert`, `color.accent-icon|border` — and emit `--color-background-*` / `--color-accent-*` CSS variables. Use these instead of raw brand colors for backgrounds and accents.
- **Feat**: Tokens: typography `font.weight.italic` added (style, not weight; pairs with `font-style: italic`). New `.fe-em` utility for publication names / artwork titles / emphasis.
- **Feat**: Filled category icon system — `painting.svg`, `pottery.svg`, `wellness.svg`, `language.svg` under `prototype/public/icons/categories/`, plus `CategoryIcon` React component (`stroke="currentColor"`, inherits orange/white styling from `.fe-card-category__icon`).
- **Feat**: Patterns page: new "Approved color combinations" section renders the five valid bg ⇄ text pairs plus the disallowed orange-as-background case.
- **Fix**: `.fe-btn-primary` restyled — Soft Lavender background + Charcoal text + 2px orange decorative border. Eliminates orange-bg + white-text contrast violation flagged by the brand guide.
- **Fix**: `.fe-tag-pill.active` switched to Lime Green background + Charcoal text.
- **Fix**: `.fe-card-badge` switched to Warm White background + Charcoal text + orange border (no more white-on-orange).
- **Fix**: `.fe-card-category` restyled as a filled-icon chip (Warm White surface, Charcoal label, orange icon shape with white glyph).
- **Fix**: Elementor accordion active tab — Soft Lavender background + Charcoal text.
- **Fix**: `.ds-btn--orange` demo button — Warm White surface + Charcoal text + orange inset border (kept as a swatch, no longer a CTA).
- **Fix**: `.fe-h1--accent` no longer pulls in `--font-family-accent` (Young Serif is print-only); keeps the brand-orange tint on the primary heading family.
- **Fix**: Filled-icon utilities (`.fe-icon-btn:hover`, `.fe-icon-btn--filled-brand`) now reference `--color-accent-icon` instead of raw `--color-brand-primary` so future grep guards stay clean.
- **Docs**: New `docs/logo-usage.md` — X measurement, 1X safe zone, 32 px / 8 mm min sizes, white-on-orange exception (social profiles + print covers, no text).
- **Docs**: `docs/color-audit-2026.md` — append approved background ⇄ text combinations matrix with token aliases.
- **Docs**: `docs/visual-styles.md` — category icon set + `CategoryIcon` component cross-link, logo-usage cross-link.
- **Docs**: `elementor/global-colors.md` — Global 2 (Orange) marked DECORATIVE ONLY with the white-logo-on-orange exception spelled out for editors.
- **Docs**: `docs/AGENTS.md` index updated with `logo-usage.md`.
- **Chore**: `tokens/colors.json` `brand-primary` description rewritten to spell out the decorative-only rule and the only allowed orange-background exception.
- **Chore**: `tokens/typography.json` — all weight tokens and family tokens carry full `$description` covering brand-guide intent (regular, italic style, medium, bold, black; Filson Pro digital+print, Young Serif print-only).
- **Build**: `scripts/build-css.js` emits the new semantic color + italic-weight variables and warns inline that `--font-family-accent` is print-only.

### Migration notes

- `.fe-btn-primary` looks materially different (Soft Lavender vs orange). The WordPress child theme on `foreveryone.berlin` is a separate rollout — this design system can ship 0.12.0 first; align the live site in a follow-up.
- Authored CSS should now reference `--color-background-*` / `--color-accent-*` for backgrounds and accents. Raw `var(--color-brand-primary)` background uses will be flagged by `grep -nE 'background[^:]*:\s*var\(--color-brand-primary\)'`.

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
