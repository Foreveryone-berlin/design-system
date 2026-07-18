# Accessibility conformance register

Tracks known gaps between the public accessibility commitment
([`/accessibility` on the prototype](https://design.foreveryone.berlin/accessibility))
and current implementation. Update this file when a gap is found or closed.

Last reviewed: 2026-07-18

## Open items

| ID | Area | Gap | Mitigation / owner |
|----|------|-----|-------------------|
| A11Y-001 | WordPress skip link | Skip-link markup and CSS ship in shared utilities; child theme must add the anchor and `#main-content` on `<main>`. | Follow [elementor/custom-css-setup.md](../elementor/custom-css-setup.md). |
| A11Y-002 | Contrast specimens | Foundations colour ramps and component state matrices intentionally show non-conformant pairings for documentation. | Excluded from automated axe scans; not used on the live marketing site. |
| A11Y-003 | Manual assistive-tech checks | Keyboard and screen-reader spot checks are not fully scripted. | Run the checklist in [validation.md](validation.md) before release. |

## Closed items

| ID | Closed | Notes |
|----|--------|-------|
| A11Y-004 | 2026-07-18 | Shared CSS now includes reduced-motion overrides for FAQ and header mobile nav. |
| A11Y-005 | 2026-07-18 | Automated accessibility e2e runs in CI (axe, interaction flows, alt semantics). |

## Scope

- **Prototype** (`design.foreveryone.berlin`): primary verification surface for this register.
- **Live site** (`foreveryone.berlin`): WordPress + Elementor; follow [docs/skills/elementor-mapping.md](skills/elementor-mapping.md) accessibility checklist after CSS or pattern changes.
