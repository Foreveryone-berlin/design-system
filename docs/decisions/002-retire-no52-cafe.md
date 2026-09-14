# ADR 002: Retire No. 52 Cafe guidance

- Status: Accepted
- Date: 2026-09-14

## Context

No. 52 Cafe is closing. Brand Book v1.0 gave it its own naming rules (p.6), its
own logo system separate from the ForEveryone marks (p.15), and print guidance
for its signage (p.38). The design system carried all three across the `/brand`,
`/guidelines`, `/print`, `/foundations` and `/accessibility` pages, the events
switcher, the search index, `spec/principles.md`, and two documentation files.

Two of those surfaces conflict once the cafe closes. The prototype pages are the
live instruction set: they tell a reader what to do now, so guidance for a
closed venue is wrong there. The documentation files are a record of what the
Brand Book specified, and that record still has a use while signage and printed
material remain in circulation during wind-down.

Deleting the logo section outright would also destroy the only written copy of
the No. 52 clear-space and minimum-size rules. The vector assets were never in
the repository, so the documentation was the sole record.

## Decision

Archive rather than delete.

- Move the naming rules, the logo specification, and the cafe-signs print
  guidance verbatim into `docs/archive/no52-cafe.md`, headed `Status: Retired`
  with the retirement date and an explicit note that it is not current guidance.
- Leave a one-line pointer to the archive from `docs/logo-usage.md` and
  `docs/brand-book-references.md`.
- Remove the cafe content from every live prototype surface with no pointer:
  `/brand`, `/guidelines`, `/print`, `/foundations`, `/accessibility`, the
  events switcher, the search index, and `spec/principles.md`.
- Record in the archive that `no52-wordmark.svg` and `no52-compact.svg` were
  documented but never shipped, so nobody hunts for files that do not exist.

Photography and illustration that merely depict hospitality stay: `hero-cafe.jpg`
is licensed Unsplash stock used for the home and patterns heroes, referenced by
two Playwright specs and the OG card generator, and `coffee-cup.svg` and
`card-community-evening.jpg` carry no cafe branding.

## Consequences

- Positive:
  - The live design system stops instructing people to use a retired brand.
  - Signage and print already in circulation can still be matched against a
    written spec.
  - The never-shipped asset paths are documented as absent, closing a
    long-standing trap in `logo-usage.md` and `ASSETS.md`.
- Tradeoffs:
  - A second place to look for logo rules, mitigated by the pointers.
  - The archive needs a further decision once wind-down completes and the
    signage is gone; it can be deleted then.
