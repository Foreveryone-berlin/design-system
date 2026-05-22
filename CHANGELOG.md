# Changelog

**Labels**

- **Build**, **Chore**, **CI**, **Docs**, **Enhance**, **Feat**, **Fix**, **Perf**, **Revert**, **Sec**, **Style**
- **(WIP)** append when in progress

## [Unreleased]

## [0.13.0] - 2026-05-22

- **Docs**: README rewritten in community voice; hero image `social-preview.jpg` (1200x630) added; acknowledgements section (WIP, team names to follow).
- **Docs**: Tech stack section added to README (DTCG tokens, generated CSS, Next.js prototype on Vercel, Elementor target).
- **CI**: `.github/workflows/release.yml`: on tag push `v*.*.*`, extracts the matching CHANGELOG section and creates a GitHub Release (bare `vX.Y.Z` title, bullets-only body).
- **Chore**: `package.json` and `prototype/package.json` bumped to `0.13.0`; stale "future home" copy removed from prototype.

## [0.12.0] - 2026-05-21

- **Feat**: Semantic tokens `color.background-{default,soft,title,alert}` and `color.accent-{icon,border}`; `font.weight.italic` plus `.fe-em` utility; `build-css.js` warns that `--font-family-accent` is print-only.
- **Feat**: Filled category icon system (`painting/pottery/wellness/language.svg`, `CategoryIcon` component, `.fe-card-category` chip on Warm White).
- **Feat**: `/tokens#color-combinations` renders the five valid bg/text pairs plus the disallowed orange-bg case.
- **Enhance**: Header nav: SVG chevrons replace filled triangles; desktop dropdown Light Orange (offset, max-width 320px); mobile menu full-bleed centered rows with dividers and a Light Orange active bar.
- **Enhance**: Footer: "For Everyone" promoted to full-width brand line; column titles use `.fe-footer__column-title`; legal link `Terms` renamed to `Impressum`.
- **Enhance**: Workshop card 1px border with visible overflow for shadow; home overview card peach hover; section-title margin bumped; newsletter popup uses a megaphone illustration; FAQ accordion animates via `grid-template-rows`.
- **Fix**: Retire orange-bg + white-text pairings: `.fe-tag-pill.active` (Lime + Charcoal), `.fe-card-badge` (Warm White + Charcoal + orange border), Elementor accordion active (Soft Lavender + Charcoal). `.fe-h1--accent` drops Young Serif. Nav links keep Charcoal on hover; brand-secondary outline only on `:focus-visible`.
- **Chore**: `.fe-btn-primary` and `.ds-btn--orange` keep pre-0.12.0 Orange + white (live CTA visual deferred).
- **Chore**: `brand-primary` description rewritten for the decorative-only rule; typography weight and family tokens get full `$description`.
- **Docs**: New `docs/logo-usage.md` (X measure, safe zone, min sizes); bg/text matrix in `docs/color-audit-2026.md`; `elementor/global-colors.md` marks Global 2 (Orange) DECORATIVE ONLY.
- **Docs**: Drop OpenAI Codex layering; add Cursor agent layering (`.cursor/AGENTS.md`); README tightened (single Quick start, consolidated Integrations).
- **Migration**: Author CSS against `--color-background-*` and `--color-accent-*`; raw `--color-brand-primary` background retained only for `.fe-btn-primary` and `.ds-btn--orange`.

## [0.11.1] - 2026-05-21

- **Enhance**: Prototype header demo nav aligned to production menu (Workshops, EU Projects, About Us, Cafe, Blog, Contact).
- **Enhance**: Prototype popup restyled to match production newsletter modal (megaphone, pill input, full-width Subscribe).
- **Enhance**: Workshop card uses dedicated `workshop-group.jpg` (1440x900, ~242 KB).
- **Enhance**: Hero asset renamed `hero.png` to `community-cafe.png`; `ASSETS.md` updated.
- **Fix**: Removed "future home" sentence from prototype homepage.
- **Chore**: Added `scripts/process-workshop-image.mjs` (sharp resize/compress helper); gitignore brand-guideline PDFs.

## [0.11.0] - 2026-05-15

- **Feat**: Redirect `fe-design-system.vercel.app` to `https://design.foreveryone.berlin` via `prototype/vercel.json` (301, path-preserving).
- **Feat**: New tokens `shadow.header`, `color.soft-lavender`; `.fe-icon-btn--filled-brand` utility.
- **Enhance**: OG / Twitter card image swapped to community cafe photo (1200x630, ~143 KB) with descriptive `alt`.
- **Enhance**: Homepage hero photo (blob-masked) with `alt` and intrinsic 1090x1094 to remove CLS.
- **Fix**: Brand palette aligned to 7-color guide (Charcoal, Warm white, Lime, Lavender, new Soft lavender); Elementor mapping updated.
- **Fix**: Typography family value renamed `'Filson Pro'` to `'FilsonPro'`.
- **Fix**: Authored CSS uses `color-mix()` rings and `shadow.header` token; no raw values left.
- **Fix**: Patterns page header dropdown no longer clipped by `.ds-section` overflow.
- **Style**: Footer and prototype wave use soft lavender; footer divider uses neutral border token.
- **Docs**: AI agent layout (`docs/AGENTS.md`, root mirror, `CLAUDE.md`, `.codex/`, `.claude/rules/`); root `LICENSE` (MIT + CC BY-NC 4.0); new `docs/visual-styles.md`, `docs/color-audit-2026.md`; archive banners on `docs/audit.md` and `docs/cursor-plan-prompt.md`.
- **Docs**: `tokens/radius.json` and `tokens/motion.json`: `$description` on every entry; Cursor / Claude rule parity.
- **Docs**: `docs/prototype-deploy.md` documents the Vercel project and redirect lifecycle; README points at `design.foreveryone.berlin`.
- **Chore**: Ignore root `.vercel/`; prototype `next.config.ts` sets `poweredByHeader: false`, image formats AVIF + WebP.
- **Build**: Root `package.json` with `build` / `test` / `prototype:*` script aliases.
- **Test**: `scripts/build-css.test.js` (103 assertions, dependency-free) validates DTCG shape and generated `custom-properties.css`.
- **CI**: `.github/workflows/ci.yml` runs token build + test (with drift check) and prototype `next build` on PRs and pushes to `develop` / `main`.

## [0.10.0] - 2026-05-01

- **Fix**: Brand palette aligned to 7-color guide (Charcoal `#1E1E1E`, Warm white `#FDFCF7`, Lime `#D4E6A8`, Lavender `#D5C5FF`, Soft lavender `#E5DCFF`); Elementor mapping updated.
- **Fix**: Typography family value renamed `'Filson Pro'` to `'FilsonPro'`.
- **Fix**: `css/utilities.css` uses `color-mix()` focus rings and the `shadow.header` token; no raw values left.
- **Fix**: Patterns header dropdown no longer clipped by `.ds-section` overflow.
- **Feat**: New tokens `shadow.header`, `color.soft-lavender`; `.fe-icon-btn--filled-brand` utility.
- **Docs**: AI agent layout (canonical `docs/AGENTS.md`, root mirror, `CLAUDE.md`, `.codex/`, `docs/agents/`, `.claude/rules/`); root `LICENSE` (MIT + CC BY-NC 4.0); archive banners on `docs/audit.md` and `docs/cursor-plan-prompt.md`.
- **Docs**: `tokens/radius.json` and `tokens/motion.json`: `$description` on every entry; Cursor / Claude rule parity; ignore `.claude/settings.local.json`.

## [0.9.1] - 2026-03-30

- **Feat**: Prototype: replace header / sidebar text branding with the ForEveryone logo.
- **Enhance**: Prototype: calmer transitions, removed hero CTAs, polished icons and footer-pattern radius.
- **Fix**: Prototype: disable route fade replay on Firefox to avoid flicker; prevent tokens code blocks from forcing horizontal scroll on mobile; remove popup backdrop blur.
- **Style**: CSS: button focus ring only on keyboard (`:focus-visible`); accordion active uses gray theme; benefit / get-involved cards use light green.

## [0.9.0] - 2026-03-27

- **Feat**: Vercel deployment.
- **Enhance**: Synced prototype favicon assets and social-preview image from foreveryone.berlin.

## [0.8.0] - 2026-03-23

- **Feat**: `noindex, nofollow` meta on all prototype pages.
- **Feat**: `robots.txt` AI-bot block list via [ai-robots-txt](https://github.com/ai-robots-txt/ai.robots.txt).
- **Feat**: Interactive header pattern: animated hamburger, slide-down mobile nav, desktop dropdown sub-menus.
- **Feat**: View transitions (fade-in) between pages.
- **Enhance**: Homepage third CTA "View Patterns".
- **Fix**: Color tokens: replaced placeholder scales with the actual site palette (~24 named colors).
- **Fix**: Tokens page: swatches reordered light to dark, brand trio pinned first.
- **Fix**: Play button shrunk to 3rem (48px).
- **Fix**: Color swatch grid: fluid responsive columns.
- **Fix**: Footer pattern: stacks newsletter + bottom bar on narrow screens.
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

- **Feat**: Extended spacing tokens (14 to 32, 8pt grid).
- **Feat**: Icon / play buttons, FAQ accordion, dropdown, header / footer, workshop card, category tags, input states, card benefit / get-involved.
- **Feat**: Elementor overrides: accordion, nav menu, form labels.
- **Build**: `build-css.js`: full color scales + spacing + font-size output.

## [0.4.0] - 2026-03-12

- **Feat**: Site copy module, hero + mission + stats, public assets.
- **Feat**: Hero with image, radius / shadow / motion demos, icons, wave section, footer with semver.
- **Enhance**: Copy refocused on the design system; agnostic stats; simplified hero image.

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

- **Feat**: Design-system scaffold (WordPress + Elementor): W3C DTCG tokens, `build-css.js`, CSS layers, Elementor docs, Figma sync guide, Git / PR template, contributing guides, ADR 001.
