# Changelog

**Label legend**

| Tag         | Description                           |
| ----------- | ------------------------------------- |
| **Build**   | build/deps                            |
| **Chore**   | maintenance                           |
| **CI**      | pipelines                             |
| **Docs**    | documentation                         |
| **Enhance** | improvement to existing feature       |
| **Feat**    | new capability                        |
| **Fix**     | bug fix                               |
| **Perf**    | performance                           |
| **Revert**  | rollback                              |
| **Privacy** | privacy & crawl control               |
| **Sec**     | security                              |
| **Style**   | formatting                            |
| —           | append **(WIP)** for work in progress |

## [0.8.0] - 2026-03-23

- **Feat** `noindex, nofollow` meta on all prototype pages.
- **Feat** `robots.txt` AI bot block list via [ai-robots-txt](https://github.com/ai-robots-txt/ai.robots.txt).
- **Fix** Color tokens: replaced placeholder scales with actual site palette (~24 named colors).
- **Build** `build-css.js`: emits flat named color properties.
- **Fix** Play button: shrunk to 3rem (48px).
- **Fix** Color swatch grid: fluid responsive columns.
- **Fix** Footer pattern: stacking newsletter + bottom bar on narrow screens.
- **Fix** Site footer: mobile-safe padding.
- **Fix** CodeBlock hydration mismatch: `language-*` class and `tabIndex` set at render.
- **Docs** Elementor global-colors doc rewritten with new token names.
- **Docs** LICENSE (CC BY-NC 4.0 International) and README license section.

## [0.7.0] - 2026-03-20

- **Feat** Tokens page: PrismJS syntax-highlighted code blocks.
- **Feat** Testimonial card component (centered quote marks, attribution).
- **Feat** Popup modal (`<dialog>`, contact form, blurred backdrop).
- **Fix** Tokens page: restored hero-style headline from v0.5.x.

## [0.6.0] - 2026-03-20

- **Feat** Multi-page structure: `/`, `/tokens`, `/components`, `/patterns`.
- **Feat** Sidebar nav (desktop, sticky) with active-state highlighting.
- **Feat** Mobile hamburger nav (<768px) with dropdown.
- **Feat** Shared layout with persistent nav and footer.
- **Feat** Overview page: hero, stats strip, card grid.

## [0.5.1] - 2026-03-16

- **Fix** FAQ accordion: primary background on active item so text is visible.

## [0.5.0] - 2026-03-16

- **Feat** Extended spacing tokens (14–32, 8pt grid).
- **Feat** Icon/play buttons, FAQ accordion, dropdown, header/footer, workshop card, category tags, input states, card benefit/get-involved.
- **Build** `build-css.js`: full color scales + spacing + font-size output.
- **Feat** Elementor overrides: accordion, nav menu, form labels.

## [0.4.0] - 2026-03-12

- **Feat** Site copy module, hero + mission + stats, public assets.
- **Feat** Hero with image, radius/shadow/motion demos, icons, wave section, footer with semver.
- **Enhance** Copy refocused on design system; agnostic stats; simplified hero image.

## [0.3.1] - 2026-03-12

- **Fix** Hydration error from Cursor `data-cursor-ref` injection; `suppressHydrationWarning` on layout root.
- **Docs** README: prototype run instructions.

## [0.3.0] - 2026-03-12

- **Docs** `docs/pr-and-merge-workflow.md`.
- **CI** `pr-and-merge.yml`: `workflow_dispatch` only; `main` default branch.

## [0.2.0] - 2026-03-12

- **Feat** Prototype scaffold (Next.js, tokens, buttons, cards, form, chips, blockquote, hero, Outfit).
- **CI** `scripts/pr-and-merge.sh` and workflow; Cursor merge-to-develop rule.

## [0.1.0] - 2026-03-12

- **Feat** Design system scaffold (WordPress + Elementor): W3C DTCG tokens, `build-css.js`, CSS layers, Elementor docs, Figma sync guide, Git/PR template, contributing guides, ADR 001.
