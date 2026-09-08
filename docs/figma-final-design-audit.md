# Figma "Final Design" canvas audit

Audit of the ForEveryone website Figma file against this repo, September 2026.

- File: `U6oj7xy85cfOQV1o0XtTKC`, canvas node `876:5564` ("Final Design"), 108 top-level
  children, ~105,854 × 26,095 px.
- Method: `get_metadata` for structure, `get_variable_defs` on the `Style Guide` section
  (`938:7171`) for variables and text/effect styles, then every Figma hex converted sRGB →
  OKLCH and matched against the flattened `tokens/colors.json`.

## What the canvas holds

| Group | Sections |
| --- | --- |
| Marketing pages, desktop 1440 + mobile 426 | Home, About Us, Contact Us, Cafe, Volunteer Us, Partner Page, Landing Page - Google Ads, EU Project × 3 (Overview, Toolbox, Peer Support) |
| Transactional | Newsletter popup, Thank You × 3 (newsletter, workshop, contact) |
| Design system | `Style Guide` (`938:7171`): `Components 👌`, `Colors 👌`, `Typography Guidelines ✌️`, `Space`, `Spacing Guide`, `Branding` |
| In progress | `WIP`, `SheLeads`, `Desktop Web`, `Clay connection`, `MessyPottery`, four `To Do` boards |
| Stale | hidden `Old Design` text, hidden `Cafe` (`1000:16563`), hidden 375px `Home_page_mobile`, loose page screenshots, a Slack `.mov` URL as a text layer |

Only `Style Guide` is a source for `tokens/` and `css/`. The page designs are the source for
the live Elementor site (see [`integrations/elementor/`](../integrations/elementor/)), not
for this repo's platform-neutral layer.

## Colour: in sync

All 41 ramp variables match their repo token to ≤ 0.004 in OKLCH:

| Figma | Repo |
| --- | --- |
| `Primary/50…900` | `color.orange.50…900` |
| `Secondary/green/50…800` | `color.green.50…800` |
| `Secondary/blue/50…900` | `color.blue.50…900` |
| `Secondary/purple/50…900` | `color.lavender.50…900` |
| `Neutral/50…1000` | `color.neutral.50…900`, `color.base.black` |

No ramp work is needed.

## Divergences found

| # | Finding | Figma | Repo |
| --- | --- | --- | --- |
| 1 | Error red | `Status/error` `#FF3B30` = `oklch(0.654 0.232 28.7)` | `color.status.error` `oklch(0.577 0.215 27.3)`; `color.red` `oklch(0.552 0.177 29)` is a third red |
| 2 | Header shadow | effect `Header`: drop shadow `#00000040`, offset (3,4), radius 30 | `shadow.header` `0 2px 12px rgba(0,0,0,0.1)` |
| 3 | Body line-height | `_Body text R`, `_Buttons`, `_Inputs` all `lineHeight: 1.4` | only `tight 0.8` / `snug 1.0` / `normal 1.5`; `.fe-body` uses 1.5 |
| 4 | Tag weight | `_Tags` 12px, weight 400 | `.fe-tag` uses `--font-weight-medium` (500) |
| 5 | Duplicate neutrals in Figma | lowercase `neutral/50 #FFFFFF`, `neutral/200 #F5F5F5`, `neutral/300 #E0E0E0`, `neutral/700 #666666`, `neutral/800 #4A4A4A`, `neutral/gray` | `#E0E0E0`, `#666666`, `#4A4A4A` exist nowhere in `tokens/` |
| 6 | Figma-default leftovers | `Colors/Neutral Colors/Neutral-50`, `…/Neutral-1000 #111125`, `Colors/Red`, `var(--sds-size-space-150) = 6` | no counterpart, none wanted |
| 7 | Alias sprawl | four names for brand orange (`Primary/500`, `Primary/orange`, `Primary/ Orange`, `Orange main - 500`), three for lavender-300, two for blue-500 | one token each |
| 8 | Second mode | `Neutral/700` returns `#404040,#000000`, so the collection has a second mode | no mode/theme dimension |
| 9 | Unverifiable token sets | no spacing or radius variables exist in the file; `Space` and `Spacing Guide` are drawings, not bound variables | `tokens/spacing.json`, `tokens/radius.json` |
| 10 | Wrong mapping in our own docs | variable is `Primary/500` | token is `color.orange.500`; there is no `color.primary.*`. Both [`figma/sync-guide.md`](../figma/sync-guide.md) and this index's naming note document `color/primary/500` → `color.primary.500` |
| 11 | Semantic tokens are copies | — | `color.brand-primary`, `color.focus-button`, `color.light-orange`, `color.light-green`, `color.soft-lavender`, `color.brand-dark`, `color.theme-5/7` hold literal duplicates of ramp values instead of `{color.orange.500}` style DTCG references |

### Resolutions

Not every divergence resolves towards Figma. Where the design system carries its own
documented rule, that rule wins and the Figma side is what needs correcting.

- **Finding 1 — no change.** The palette is the design system's, not Figma's.
  `color.status.error` and `color.red` keep their repo values.
- **Finding 2 — fixed.** `shadow.header` now carries the Figma effect
  (`3px 4px 30px rgba(0,0,0,0.25)`). Nothing in `docs/` or `spec/` justified the previous
  softer value, so it was drift rather than a decision.
- **Finding 3 — no change; Figma is wrong here.** `font.lineHeight.normal` records that
  Brand Book v1.0 p.22 requires body line-height **not below 1.5**. Figma's `_Body text R`,
  `_Buttons` and `_Inputs` at 1.4 sit under that floor, and dropping to 1.4 would also
  weaken WCAG 1.4.12 text spacing. Body, buttons and inputs stay at 1.5; the Figma text
  styles are the side to fix.
- **Finding 4 — mapping question, not drift.** Figma `_Tags` (12px, weight 400) already
  matches `.fe-label` exactly. `.fe-tag` deliberately sits one weight up at 500, and moving
  it to 400 would leave two utilities identical in every property. Which Figma style maps to
  which utility needs a designer's answer before either moves.
- **Finding 10 — fixed.** The mapping is now stated correctly in `figma/sync-guide.md`,
  `docs/token-naming.md`, `docs/skills/token-update.md` and the naming note in
  `docs/AGENTS.md`. `color.primary.*` and `color.secondary.*` were never real token paths.
- **Finding 11 — fixed.** The 18 non-ramp colour tokens that held a byte-identical copy of a
  ramp value are now DTCG references (`{color.orange.500}` and so on). `custom-properties.css`
  and `spec/tokens.json` rebuild byte-identical, so no value moved; a future ramp change now
  propagates instead of splitting. Tokens with no exact ramp counterpart (`color.accent`,
  `color.soft-lavender`, `color.very-light-gray`, `color.light-gray`, the 2026 accents, print
  and doc greys) keep literal values.

## Component parity: high

`Components 👌` defines Buttons (Primary/Secondary × Default/Hover/Focused/Disabled, plus an
icon-button variant), `Icon-button`, `Icon-button-w`, `Play-button` (small/big × 4 states),
`Worckshop_card`, `card-benefit`, `Card-get involved`, `FAQ_item`, `Catagary-label`
(5 types × 4 states), `Label_item_cards`, `Label-emotions`, `Header-Item`, `Header`,
`Footer`, `Dropdawn`, `Dropdawn-item`, and a 13-glyph icon set.

Every one has an `fe-*` counterpart in `css/utilities.css` except **`Label-emotions`** and
the **`Header-Item`** four-state set. Of the 13 icons, only **`arrow-down`** and **`map`**
have no repo glyph (`chevron-down` and `location-pin` are near, not identical); the rest are
covered by `FeIcon` and `prototype/public/icons/**`.

No Code Connect exists in the repo (no `*.figma.ts` / `*.figma.js`), so
`get_design_context` on a page frame returns generic CSS rather than `fe-*` class names.

**Code Connect is blocked by the Figma plan, not by us.** `get_code_connect_suggestions` on
the Buttons component set (`937:7300`) returns: "You need a Dev or Full seat on an
Organization or Enterprise plan to use Code Connect." Both teams on the account
(`Marco's team`, `Sinfonia Leipzig`) are on the `starter` tier. Authoring `.figma.ts`
templates now would produce files that cannot be published or read back, so this stays
parked until the plan changes. Nothing else in the Figma MCP wiring depends on it: reading
structure, variables and styles works on the current plan, which is how this audit was
produced.

## Recommended follow-ups, ranked

| # | Work | Size |
| --- | --- | --- |
| 1 | Add Code Connect for the `Style Guide` components, so design-to-code on page frames returns `fe-*` classes. **Blocked:** needs a Dev or Full seat on an Organization or Enterprise Figma plan | M, blocked |
| 2 | Figma-side cleanup of findings 5–8 plus the layer-name typos (`Worckshop_card`, `Dropdawn`, `Catagary-label`, `Desabled`, `Hove`). Edits the designers' source of truth, so agree it first | S + sign-off |
| 3 | State-parity pass on the Figma Default/Hover/Active/Focused/Disabled matrices, and decide whether `Label-emotions` and `Header-Item` need repo equivalents | M |
| 4 | Extract section patterns with no `fe-*` equivalent: newsletter popup, the three Thank You confirmations, `Landing Page - Google Ads`, `SheLeads` | M–L |
| 5 | Document how the 426px mobile artboard maps onto the 640/768/1024 min-width breakpoints | S, docs |

Building the marketing pages themselves belongs in `integrations/elementor/`, not here:
`prototype/` is the design-system documentation site, and page-specific markup in the shared
layer would break the platform-neutrality rule in `.claude/rules/general.md`.
