# Restore No. 52 Cafe + hotfix 1.8.1

Branch: `fix/restore-no52-cafe` from `develop`. Ship patch **1.8.1**.

## Verified assumptions

- Retirement commit [`cc2511f`](https://github.com/Foreveryone-berlin/design-system/commit/cc2511f) / PR #167 also shipped megaphone SVG, Visual Elements sizing, and hero reframe. Those stay. Cafe-only rollback targets the high-scoring files below.
- SVGs `no52-wordmark.svg` / `no52-compact.svg` were deleted in 0.23.0, not in 1.8.0. Do not restore those files. When restoring logo rules, do not re-list phantom paths.
- No Playwright assertions on cafe copy. Restoring sections is enough for search.
- Only `docs/AGENTS.md` lists the archive/ADR. Root `AGENTS.md` already has `docs/decisions:{001-token-format.md}` only.
- No end-of-year / future-closure wording in commits, changelog, PR, or docs.

## Content restore (from `cc2511f^`, cafe hunks only)

| File | Restore |
| --- | --- |
| `prototype/app/brand/page.tsx` | “Our cafe” naming block |
| `prototype/app/guidelines/page.tsx` | naming blurb includes No. 52 Cafe |
| `prototype/app/print/page.tsx` | “Cafe signs” section + metadata |
| `prototype/app/page.tsx` | Print overview card mentions cafe signs only |
| `prototype/app/foundations/page.tsx` | type specimens with No. 52 / No. 52 Cafe |
| `prototype/app/accessibility/page.tsx` | alt example at No. 52 Cafe |
| `prototype/app/_components/EventsWorkshopsSwitcher.tsx` | “Community Cafe Evening” + “at No. 52” |
| `prototype/app/_components/search-index.ts` | cafe signs in Print search |
| `docs/logo-usage.md` | No. 52 logos rules; drop archive pointer; no phantom SVG paths |
| `docs/brand-book-references.md` | cafe in naming / logo / print rows; remove retired note |
| `docs/integration-checklist.md` | alt example with No. 52 Cafe |
| `spec/principles.md` | two-column logo table |
| `prototype/public/images/ASSETS.md` | Community Cafe card label; drop archive pointer |
| `scripts/normalize-workshop-tones.mjs` | note → Community Cafe |
| `docs/AGENTS.md` | decisions index → `001-token-format.md` only; remove `docs/archive` line |

## Delete

- `docs/archive/no52-cafe.md` and empty `docs/archive/`
- `docs/decisions/002-retire-no52-cafe.md`

## Changelog + version (two commits)

Leave the historical **1.8.0** retire bullet as shipped.

1. **Fix PR** on `fix/restore-no52-cafe`: under `## [Unreleased]`, **Fix**: Restore the No. 52 Cafe naming, logo, and cafe-signs guidance to the live design system.
2. **Release cut** on `develop` after merge: move that bullet into `## [1.8.1] - 2026-09-17`, bump both `package.json` files (+ lockfile) to `1.8.1`.

## Ship

1. Apply restores + deletes + Unreleased Fix bullet; commit `fix: restore No. 52 Cafe guidance`
2. Gates: `npm run build`; prototype e2e/axe on `:3100`
3. PR → `develop`, merge
4. Release cut on `develop`, then `develop` → `main`, tag `v1.8.1`
