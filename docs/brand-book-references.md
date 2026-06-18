# Brand source-of-truth & authority matrix

Which document governs which brand domain, and how the repo relates to each.

## Hierarchy

1. **Figma** — visual source of truth for design decisions (layouts, exact shapes, artwork).
2. **ForEveryone Brand Book v1.0 (June 2026)** — the authoritative written brand spec: voice, naming, logo rules, colour, typography, visual elements, imagery ethics, print rules. This is the current canonical brand reference for everything in this repo.
3. **This repository** — implementation source of truth: tokens, generated CSS, Elementor/Figma docs, and the Next.js prototype. The repo translates the Brand Book into a **digital-first** system.

## Document status

| Document | Status | Role |
|---|---|---|
| `ForEveryone_BrandBook_v1.0_2026-06.pdf` | **Current** | Authoritative brand spec (41 pages). Not tracked in git (`*.pdf` gitignored). |
| `2026_Quick_Brand_Guidelines.pdf` (v2.0, April 2026) | **Superseded** | Condensed historical reference only; superseded by Brand Book v1.0 per the Brand Book's own version history (p.41). Do not cite as current. |
| `Figma - Style Guide.pdf` | Reference | Visual companion; Figma itself remains the live visual source of truth. |

## Domain → governing source

| Domain | Governed by | Repo implementation |
|---|---|---|
| Brand voice, tone, personality | Brand Book p.8–9 | `/brand` page; `docs` |
| Naming (ForEveryone, No. 52 Cafe, UK English) | Brand Book p.6 | `/brand`, `/guidelines` |
| Logo system, variations, safe zone, incorrect usage, No. 52 logos | Brand Book p.10–15 | [`logo-usage.md`](logo-usage.md); `/foundations` logo section |
| Colour palette + accessibility pairings | Brand Book p.16–19 | [`color-audit-2026.md`](color-audit-2026.md); `tokens/colors.json`; `/foundations`, `/accessibility` |
| Typography (Filson Pro digital; Young Serif print) | Brand Book p.20–23 | `tokens/typography.json`; `/foundations` |
| Visual elements (workshop icons, illustrations, accent marks, blobs, waves) | Brand Book p.24–27 | [`visual-styles.md`](visual-styles.md); `/visual-elements` |
| Imagery, photography ethics, alt text | Brand Book p.28–32, 37 | `/accessibility` (alt text), `/governance` (ethics), `visual-styles.md` |
| Layout, grid, QR codes | Brand Book p.33–34 | `/foundations` layout section |
| Print & physical (CMYK, print purple, document greys, cafe signs) | Brand Book p.16–17, 38 | `/print` page; print-namespaced tokens |
| Contacts, permissions, versioning | Brand Book p.39–41 | `/governance`; `CHANGELOG.md` |

## Digital vs print boundary

The Brand Book covers both digital and print. This repo is **digital-first**: print-only specifications (Young Serif typeface, CMYK values, the print purple substitute for Blue, document-chrome greys, mm sizes, cafe signs, Canva workflows) are documented on the `/print` page and namespaced in tokens (`color.print.*`, `color.doc.*`) so digital components never consume them. See the `/print` page and `tokens/colors.json` descriptions.

## People

Refer to people by **first name only** across the design system (e.g. "Roxana, co-founder"). No last names.
