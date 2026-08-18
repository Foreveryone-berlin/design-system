# Layout patterns (prototype)

Composite layouts on `/patterns` in the Next.js prototype, in page order. Each pattern combines `.fe-*` components and visual assets documented in [docs/visual-styles.md](../../docs/visual-styles.md).

| Section ID | Pattern | Key classes / assets |
|---|---|---|
| `#header-pattern` | Header (desktop & mobile) | `.fe-header`, `HeaderDemo` |
| `#footer-pattern` | Footer | `.fe-footer`, link columns, newsletter, social icons |
| `#stats-strip` | Stats strip with animated counters | `.ds-stats`, `.ds-stat`, `StatCounter` |
| `#category-filter` | Category filter bar | `.fe-tag-pill--*` |
| `#hero-pattern` | Hero with blob photo | `.ds-pattern-hero-specimen`, `.ds-headline-with-underline`, `.ds-hero-image-wrap`, hero photo |
| `#events-workshops-switcher` | Events and workshops switcher | `.ds-events-switcher`, `.fe-event-tabs`, `.fe-tag-pill`, `.fe-card` |
| `#facts-card` | Workshop facts card | `.fe-facts-card` (+ `__grid`/`__item`/`__label`/`__value`/`__cta`), line illustrations via `--fe-facts-illo`, container query |
| `#step-progression` | Step progression (week by week) | `.fe-steps`, `.fe-step` (+ `__number`/`__body`/`__connector`), `illustrations/accents/doodle-arrow.svg` |
| `#split-list-band` | Split list band | `.fe-split-list` (+ `__heading`/`__lead`/`__items`/`__item`), `check` UI icon |
| `#team-grid` | Team roster grid | `.fe-people-grid`, `.fe-person` (+ `__photo`/`__name`/`__role`), `illustrations/avatars/*.svg` |
| `#profile-cards` | Profile cards with bio | `.fe-people-grid--cards`, `.fe-person--card` (+ `__bio`) |

The benefit grid (`.ds-benefit-grid` with `.fe-card-benefit`) left the Patterns page in 1.2.0; the benefit card itself stays available for the live site and is documented on `/components`.

Elementor: map patterns to sections/widgets manually; see [elementor/custom-css-setup.md](../../elementor/custom-css-setup.md).
