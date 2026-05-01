# Cursor Plan Mode Prompt — ForEveryone Berlin Design System

> Model: claude-opus-4-6 | Mode: Plan | Use this as your full project brief before touching any file.

> **Archive notice (2026):** Token tables in this prompt predate the brand 7-color migration. Current canonical sources: [`docs/color-audit-2026.md`](color-audit-2026.md), [`tokens/colors.json`](../tokens/colors.json), and [`elementor/global-colors.md`](../elementor/global-colors.md). Use this prompt for project framing only; defer to current files for token values.

---

## CONTEXT: WHO WE ARE

**Site:** https://foreveryone.berlin/  
**Stack:** WordPress + Elementor Pro + custom CSS  
**Figma:** https://www.figma.com/design/QKks3ov9RS4CltsYLfRZod/Design-File  
**Org:** For Everyone — volunteer-run NGO in Berlin running community workshops, events, and a cafe (No. 52) focused on real-life connection, belonging, and creative activities.

The site is community-first, inclusive, warm, and energetic. The design system must reflect that while remaining maintainable by non-developers (Elementor editors) and developers alike.

---

## YOUR MISSION

You are setting up a **complete design system repository** for this WordPress/Elementor site. This is not just a CSS file — it's a full system: tokens, documentation, AI rules, Git workflow, and Figma integration. Plan everything before writing a single file.

---

## PHASE 1 — AUDIT (PRE-EXTRACTED — DO NOT RE-AUDIT, PROCEED DIRECTLY)

The audit has already been completed from Figma screenshots and page PDFs provided. Use the data below as the authoritative source. Do NOT fetch Figma or the live site for token values — this data is the ground truth. You may still visit the live site to spot implementation inconsistencies, but token values are locked to what's below.

---

### 1A — COLOR TOKENS (from Figma Colors page)

#### Neutral

| Token name         | Hex                        |
| ------------------ | -------------------------- |
| color.neutral.50   | #FAFAFA                    |
| color.neutral.100  | #F5F5F5                    |
| color.neutral.200  | #E5E5E5                    |
| color.neutral.300  | #D4D4D4                    |
| color.neutral.400  | #A3A3A3                    |
| color.neutral.500  | #737373                    |
| color.neutral.600  | #525252                    |
| color.neutral.700  | #404040                    |
| color.neutral.800  | #262626                    |
| color.neutral.900  | #1E1E1E ← **Neutral_main** |
| color.neutral.1000 | #0A0A0A                    |

#### Primary — Orange

| Token name        | Hex     | Note              |
| ----------------- | ------- | ----------------- |
| color.primary.50  | #FFF2EB |                   |
| color.primary.100 | #FFE4D8 |                   |
| color.primary.150 | #FFD7C4 |                   |
| color.primary.200 | #FFCAB0 |                   |
| color.primary.300 | #FFAF89 | ← Peach           |
| color.primary.400 | #FF9561 |                   |
| color.primary.500 | #FF7A3A | ← **Orange_main** |
| color.primary.600 | #CC622E |                   |
| color.primary.700 | #994923 |                   |
| color.primary.800 | #663117 |                   |
| color.primary.900 | #33180C |                   |

#### Secondary — Green

| Token name                | Hex     | Note             |
| ------------------------- | ------- | ---------------- |
| color.secondary.green.50  | #F8FCF6 |                  |
| color.secondary.green.100 | #F6FAEE |                  |
| color.secondary.green.150 | #F2F7E5 |                  |
| color.secondary.green.200 | #EEF5DC |                  |
| color.secondary.green.300 | #E5F0CB |                  |
| color.secondary.green.400 | #DDEBB9 |                  |
| color.secondary.green.500 | #D4E8A8 | ← **Green_main** |
| color.secondary.green.600 | #AAB686 |                  |
| color.secondary.green.700 | #7F8A65 |                  |
| color.secondary.green.800 | #555C43 |                  |
| color.secondary.green.900 | #2A2E22 |                  |

#### Secondary — Blue

| Token name               | Hex     | Note            |
| ------------------------ | ------- | --------------- |
| color.secondary.blue.50  | #ECE5FD |                 |
| color.secondary.blue.100 | #D9CCF8 |                 |
| color.secondary.blue.150 | #C5B2F3 |                 |
| color.secondary.blue.200 | #B299F7 |                 |
| color.secondary.blue.300 | #8B299F |                 |
| color.secondary.blue.400 | #6533EF |                 |
| color.secondary.blue.500 | #3F00EB | ← **Blue_main** |
| color.secondary.blue.600 | #3200BC |                 |
| color.secondary.blue.700 | #26008D |                 |
| color.secondary.blue.800 | #19005E |                 |
| color.secondary.blue.900 | #0D002F |                 |

#### Secondary — Lavender/Purple

| Token name                   | Hex     | Note                 |
| ---------------------------- | ------- | -------------------- |
| color.secondary.lavender.50  | #FBF9FF |                      |
| color.secondary.lavender.100 | #F7F3FF |                      |
| color.secondary.lavender.150 | #F2EEFF |                      |
| color.secondary.lavender.200 | #EEE8FF |                      |
| color.secondary.lavender.300 | #E6DCFF |                      |
| color.secondary.lavender.400 | #D0D1FF | ← **Lavender_Light** |
| color.secondary.lavender.500 | #D5C5FF | ← **Lavender_main**  |
| color.secondary.lavender.600 | #AA9ECC |                      |
| color.secondary.lavender.700 | #807699 |                      |
| color.secondary.lavender.800 | #554F66 |                      |
| color.secondary.lavender.900 | #2B2733 |                      |

#### Semantic / Status

| Token name           | Hex     | Note                                                            |
| -------------------- | ------- | --------------------------------------------------------------- |
| color.status.error   | #FBF9FF | (Error 50 — use for bg; actual error red visible in components) |
| color.status.success | #F7F3FF | (Success 100)                                                   |
| color.status.warning | #F2EEFF | (Warning 150)                                                   |

> ⚠️ The status swatches in Figma show very light tints at the 50/100/150 level. Cross-check against the input error state in components (red border visible on input fields) — that red is approximately `#E53E3E`. Confirm against live site form validation styles and update `color.status.error.default` accordingly.

---

### 1B — TYPOGRAPHY TOKENS (from Figma Typography Guidelines page)

**Font families:**

- Heading / Display: `Filson Pro` (primary), `Young Serif` (accent/additional)
- Body / UI: `Filson Pro`

> Note: Filson Pro is a commercial font. Confirm it is loaded via WordPress (likely @font-face in child theme or a font plugin). Young Serif is available on Google Fonts.

| Token name                | Font        | Size (px) | Size (rem) | Weight        | Line-height | Letter-spacing |
| ------------------------- | ----------- | --------- | ---------- | ------------- | ----------- | -------------- |
| typography.h1.main        | Filson Pro  | 84        | 5.25rem    | Black (900)   | 80%         | -2%            |
| typography.h1.additional  | Young Serif | 84        | 5.25rem    | Black (900)   | 80%         | -2%            |
| typography.h2.default     | Filson Pro  | 48        | 3rem       | Bold (700)    | 100%        | -2%            |
| typography.h3.default     | Filson Pro  | 20        | 1.25rem    | Bold (700)    | 100%        | -2%            |
| typography.h3.additional  | Young Serif | 20        | 1.25rem    | Bold (700)    | 100%        | -2%            |
| typography.body.regular   | Filson Pro  | 16        | 1rem       | Regular (400) | 140%        | 0%             |
| typography.body.medium    | Filson Pro  | 16        | 1rem       | Medium (500)  | 140%        | 0%             |
| typography.input.default  | Filson Pro  | 16        | 1rem       | Regular (400) | 140%        | 0%             |
| typography.button.default | Filson Pro  | 16        | 1rem       | Medium (500)  | 140%        | 0%             |
| typography.tag.default    | Filson Pro  | 12        | 0.75rem    | Medium (500)  | 100%        | 0%             |
| typography.label.default  | Filson Pro  | 12        | 0.75rem    | Regular (400) | 100%        | 0%             |

---

### 1C — COMPONENT INVENTORY (from Figma Components pages)

These components exist in Figma and must have corresponding CSS utility classes and Elementor documentation:

**Buttons:**

- `Primary_button` — filled orange (`color.primary.500`), white text, rounded-full, states: default / hover (darker orange) / focused (border) / disabled (opacity)
- `Secondary_button` — outlined, orange border + text, transparent bg, same states
- `Icon_button` — circle, orange fill, icon white, 4 states
- `Icon_buttonW` — circle, white/outlined variant
- `Play_button` — circle, blue fill (`color.secondary.blue.500`), play icon white

**Navigation:**

- `Header/footer Item` — text link with chevron, hover shows orange underline

**Filter tags / Category pills:**

- `Icon_button` (tag variant) — pill shape, text labels: "Balance and Wellness", "Movement", "Arts and Crafts", "Expression", "Music"
- States: default (white/light), hover, active (orange fill), focused

**Cards:**

- `Workshop_card` — white card, rounded corners, image top, category tag badge (top-right), date + time row, title (bold), description, price + CTA button
- `card-benefit` — lavender bg (`color.secondary.lavender.400`), title + description + orange illustrated icon
- `Card-get-involved` — lavender bg, title + description + orange illustrated icon

**Form inputs:**

- `Input-field` — states: default (light border), hover (slightly darker), active/focused (orange border), disabled (greyed), error (red border + error message below)
- Labels above inputs, placeholder text inside

**FAQ accordion:**

- `FAQ_item` — default (collapsed, + icon), hover, active (expanded, − icon, answer text visible)

**Dropdowns:**

- `Dropdown-item` and `Dropdown` — text + arrow icon, hover state shows orange text

**Footer links / Nav items** — text with arrow icons

**Icons used:** chevron-down, arrow-right, instagram, whatsapp, linkedin, check-circle, clock, location-pin, close (×), plus (+), minus (−), phone, play, mail

---

### 1D — PAGE LAYOUT PATTERNS (from PDF exports)

From reviewing Contact, About, EU Project, and Homepage popup pages:

**Header:** Fixed nav, logo left, nav links center, CTA button right ("Book a Workshop" or "Explore →"), social icons. Background: white or transparent over hero.

**Hero sections:** Large H1 split across two lines (Filson Pro + Young Serif alternating for emphasis), subtitle body text, 1–2 CTA buttons, organic blob-shaped image right.

**Background colors used across sections:**

- White `#FFFFFF`
- Light grey `color.neutral.50` (#FAFAFA) — alternating section bg
- Lavender `color.secondary.lavender.400` (#D0D1FF) — footer background, some card backgrounds
- Transparent/inherited

**Footer:** Lavender bg, logo top-left, 4-column link grid, newsletter signup (email input + Subscribe button), social icons row, copyright + Privacy/Terms links.

**Modal/popup pattern:** Centered white card, close button top-right, single-column form or content, full-width primary CTA button.

**Blob/organic shape image masks:** Circular or amoeba-shaped image containers (CSS `border-radius` with high values or SVG clip-path). Used consistently for hero and section imagery.

**Spacing observations:**

- Section padding: ~80–100px vertical on desktop, ~40–60px on mobile
- Card gap: ~24px
- Content max-width: approximately 1200–1280px centered

---

### 1E — KNOWN INCONSISTENCIES TO RESOLVE

1. **Navbar background:** Live site uses a semi-transparent/white nav; Figma shows it clean white. Standardize to white with `box-shadow` on scroll.
2. **H1 font mixing:** Live site alternates Filson Pro (dark) + a serif/display font (orange) within the same heading. This is intentional — document it as a pattern, not a bug.
3. **Status colors:** Figma status swatches show very light tints. The actual error red on form inputs (visible in component screenshots) needs to be confirmed. Placeholder: `#DC2626`.
4. **Filson Pro loading:** Verify font is loading correctly on live site. If not via Google Fonts, document the exact @font-face source in `docs/audit.md`.
5. **Elementor Global Colors:** As of audit, Elementor may have ad-hoc colors set. Map all existing Elementor Global Color slots to our token names and flag any that don't match.

---

### 1F — ELEMENTOR GLOBAL SETTINGS CONSTRAINTS

- Elementor Global Colors: https://elementor.com/help/theme-style-global-settings/
- Elementor Global Fonts: https://elementor.com/help/view-and-edit-global-fonts/
- Elementor Global Settings overview: https://elementor.com/funktionen/global-settings/
- Elementor stores globals in its own DB options, not in CSS variables by default. Our system bridges this with `custom-properties.css` loaded via child theme, plus a manual mapping guide for the Elementor UI.

**Proposed Elementor Global Color slot mapping:**
| Elementor Slot Name | Maps to token | Hex |
|---|---|---|
| Primary | color.primary.500 | #FF7A3A |
| Primary Dark | color.primary.600 | #CC622E |
| Primary Light | color.primary.300 | #FFAF89 |
| Secondary Blue | color.secondary.blue.500 | #3F00EB |
| Secondary Lavender | color.secondary.lavender.400 | #D0D1FF |
| Secondary Green | color.secondary.green.500 | #D4E8A8 |
| Neutral Dark | color.neutral.900 | #1E1E1E |
| Neutral Mid | color.neutral.500 | #737373 |
| Neutral Light | color.neutral.100 | #F5F5F5 |
| White | #FFFFFF | #FFFFFF |
| Error | color.status.error | #DC2626 |

**Proposed Elementor Global Font mapping:**
| Elementor Slot Name | Maps to token | Details |
|---|---|---|
| Primary | typography.h1.main | Filson Pro, Black, 84px |
| Secondary | typography.h1.additional | Young Serif, Black, 84px |
| Body | typography.body.regular | Filson Pro, Regular, 16px |
| Accent | typography.h2.default | Filson Pro, Bold, 48px |

Document all of the above in `elementor/global-colors.md` and `elementor/global-fonts.md` with step-by-step screenshots instructions.

---

The audit is complete. Write `docs/audit.md` summarizing the above findings, then proceed directly to Phase 2.

---

## PHASE 2 — REPOSITORY STRUCTURE

Create the following directory structure. Do not deviate from it:

```text
foreveryone-design-system/
├── .cursor/
│   └── rules/                    # AI desktop rules (see Phase 5)
│       ├── general.mdc
│       ├── tokens.mdc
│       ├── css.mdc
│       └── git.mdc
├── tokens/
│   ├── colors.json               # Raw color tokens
│   ├── typography.json           # Font tokens
│   ├── spacing.json              # Spacing scale
│   ├── radius.json               # Border radius
│   ├── shadows.json              # Elevation/shadow tokens
│   ├── motion.json               # Transition/animation tokens
│   └── index.json                # Master token file (imports all above)
├── css/
│   ├── custom-properties.css     # Generated CSS vars from tokens — source of truth
│   ├── base.css                  # Reset + root styles
│   ├── typography.css            # Heading, body, label classes
│   ├── utilities.css             # Spacing, color, layout helpers
│   └── elementor-overrides.css   # Elementor-specific fixes and extensions
├── elementor/
│   ├── global-colors.md          # Step-by-step: how to map tokens → Elementor Global Colors
│   ├── global-fonts.md           # Step-by-step: how to map tokens → Elementor Global Fonts
│   ├── custom-css-setup.md       # How to paste custom-properties.css into Elementor Custom CSS
│   └── templates/                # Notes on reusable Elementor template structure
├── figma/
│   ├── sync-guide.md             # How Figma variables map to our token JSON
│   └── token-export-instructions.md  # Using Tokens Studio or manual export
├── docs/
│   ├── audit.md                  # Phase 1 findings
│   ├── getting-started.md        # Onboarding for new devs/designers
│   ├── token-naming.md           # Naming conventions explained
│   ├── contributing.md           # How to contribute
│   └── decisions/                # ADR (Architecture Decision Records)
│       └── 001-token-format.md
├── scripts/
│   └── build-css.js              # Node script: tokens/index.json → css/custom-properties.css
├── .github/
│   └── PULL_REQUEST_TEMPLATE.md
├── README.md
├── CHANGELOG.md
└── .gitignore
```

---

## PHASE 3 — TOKEN SYSTEM

### Format

Use **W3C Design Token Community Group** format (JSON). All token values below are pre-filled from the Phase 1 audit. Use them exactly.

**`tokens/colors.json`** — write this file with all values from Phase 1A, structured like:

```json
{
  "color": {
    "primary": {
      "50": {
        "$value": "#FFF2EB",
        "$type": "color",
        "$description": "Lightest orange tint"
      },
      "300": {
        "$value": "#FFAF89",
        "$type": "color",
        "$description": "Peach — soft CTA bg, hover states"
      },
      "500": {
        "$value": "#FF7A3A",
        "$type": "color",
        "$description": "Orange_main — primary CTA, brand accent"
      },
      "600": {
        "$value": "#CC622E",
        "$type": "color",
        "$description": "Button hover/pressed state"
      },
      "900": {
        "$value": "#33180C",
        "$type": "color",
        "$description": "Darkest orange"
      }
    },
    "secondary": {
      "blue": {
        "400": { "$value": "#6533EF", "$type": "color" },
        "500": {
          "$value": "#3F00EB",
          "$type": "color",
          "$description": "Blue_main — play buttons, accents"
        }
      },
      "lavender": {
        "400": {
          "$value": "#D0D1FF",
          "$type": "color",
          "$description": "Lavender_Light — footer bg, card bg"
        },
        "500": {
          "$value": "#D5C5FF",
          "$type": "color",
          "$description": "Lavender_main"
        }
      },
      "green": {
        "500": {
          "$value": "#D4E8A8",
          "$type": "color",
          "$description": "Green_main — secondary accent"
        }
      }
    },
    "neutral": {
      "50": { "$value": "#FAFAFA", "$type": "color" },
      "100": { "$value": "#F5F5F5", "$type": "color" },
      "200": { "$value": "#E5E5E5", "$type": "color" },
      "300": { "$value": "#D4D4D4", "$type": "color" },
      "400": { "$value": "#A3A3A3", "$type": "color" },
      "500": { "$value": "#737373", "$type": "color" },
      "600": { "$value": "#525252", "$type": "color" },
      "700": { "$value": "#404040", "$type": "color" },
      "800": { "$value": "#262626", "$type": "color" },
      "900": {
        "$value": "#1E1E1E",
        "$type": "color",
        "$description": "Neutral_main — default text color"
      },
      "1000": { "$value": "#0A0A0A", "$type": "color" }
    },
    "status": {
      "error": {
        "$value": "#DC2626",
        "$type": "color",
        "$description": "Form error state — confirm against live site"
      },
      "success": {
        "$value": "#D4E8A8",
        "$type": "color",
        "$description": "References green_main"
      },
      "warning": {
        "$value": "#FFAF89",
        "$type": "color",
        "$description": "References peach"
      }
    },
    "base": {
      "white": { "$value": "#FFFFFF", "$type": "color" },
      "black": { "$value": "#0A0A0A", "$type": "color" }
    }
  }
}
```

**`tokens/typography.json`** — write with all values from Phase 1B:

```json
{
  "font": {
    "family": {
      "heading": {
        "$value": "'Filson Pro', sans-serif",
        "$type": "fontFamily"
      },
      "accent": { "$value": "'Young Serif', serif", "$type": "fontFamily" },
      "body": { "$value": "'Filson Pro', sans-serif", "$type": "fontFamily" }
    },
    "weight": {
      "regular": { "$value": "400", "$type": "fontWeight" },
      "medium": { "$value": "500", "$type": "fontWeight" },
      "bold": { "$value": "700", "$type": "fontWeight" },
      "black": { "$value": "900", "$type": "fontWeight" }
    },
    "size": {
      "xs": {
        "$value": "0.75rem",
        "$type": "dimension",
        "$description": "12px — tags, labels"
      },
      "sm": { "$value": "0.875rem", "$type": "dimension" },
      "base": {
        "$value": "1rem",
        "$type": "dimension",
        "$description": "16px — body, inputs, buttons"
      },
      "lg": { "$value": "1.125rem", "$type": "dimension" },
      "xl": {
        "$value": "1.25rem",
        "$type": "dimension",
        "$description": "20px — H3"
      },
      "2xl": { "$value": "1.5rem", "$type": "dimension" },
      "3xl": {
        "$value": "3rem",
        "$type": "dimension",
        "$description": "48px — H2 section headers"
      },
      "4xl": {
        "$value": "5.25rem",
        "$type": "dimension",
        "$description": "84px — H1 hero"
      }
    },
    "lineHeight": {
      "tight": {
        "$value": "0.8",
        "$type": "number",
        "$description": "80% — H1"
      },
      "snug": {
        "$value": "1.0",
        "$type": "number",
        "$description": "100% — H2, H3, tags, labels"
      },
      "normal": {
        "$value": "1.4",
        "$type": "number",
        "$description": "140% — body, inputs, buttons"
      }
    },
    "letterSpacing": {
      "tight": {
        "$value": "-0.02em",
        "$type": "dimension",
        "$description": "-2% — headings"
      },
      "normal": {
        "$value": "0em",
        "$type": "dimension",
        "$description": "0% — body and UI"
      }
    }
  }
}
```

### Naming Convention

`{category}.{tier}.{variant}` — e.g., `color.primary.500`, `font.size.xl`, `spacing.lg`

Never use descriptive names like `orange` or `big`. Always use semantic or scale names.

### CSS Custom Properties Output

The `scripts/build-css.js` script must output `css/custom-properties.css`. The expected output is pre-defined below — the build script must produce exactly this:

```css
/* ==========================================================================
   ForEveryone Berlin — Design Tokens
   AUTO-GENERATED by scripts/build-css.js — do not edit manually
   Source of truth: tokens/*.json
   ========================================================================== */

:root {
  /* ── Colors: Primary (Orange) ─────────────────────────────────────────── */
  --color-primary-50: #fff2eb;
  --color-primary-300: #ffaf89;
  --color-primary-500: #ff7a3a; /* Orange_main */
  --color-primary-600: #cc622e;
  --color-primary-900: #33180c;

  /* ── Colors: Secondary ───────────────────────────────────────────────── */
  --color-secondary-blue-400: #6533ef;
  --color-secondary-blue-500: #3f00eb; /* Blue_main */
  --color-secondary-lavender-400: #d0d1ff; /* footer/card bg */
  --color-secondary-lavender-500: #d5c5ff;
  --color-secondary-green-500: #d4e8a8; /* Green_main */

  /* ── Colors: Neutral ─────────────────────────────────────────────────── */
  --color-neutral-50: #fafafa;
  --color-neutral-100: #f5f5f5;
  --color-neutral-200: #e5e5e5;
  --color-neutral-300: #d4d4d4;
  --color-neutral-400: #a3a3a3;
  --color-neutral-500: #737373;
  --color-neutral-600: #525252;
  --color-neutral-700: #404040;
  --color-neutral-800: #262626;
  --color-neutral-900: #1e1e1e; /* Neutral_main — default text */
  --color-neutral-1000: #0a0a0a;

  /* ── Colors: Status ──────────────────────────────────────────────────── */
  --color-status-error: #dc2626;
  --color-status-success: #d4e8a8;
  --color-status-warning: #ffaf89;

  /* ── Colors: Base ────────────────────────────────────────────────────── */
  --color-white: #ffffff;
  --color-black: #0a0a0a;

  /* ── Typography: Font Families ───────────────────────────────────────── */
  --font-family-heading: "Filson Pro", sans-serif;
  --font-family-accent: "Young Serif", serif;
  --font-family-body: "Filson Pro", sans-serif;

  /* ── Typography: Font Weights ────────────────────────────────────────── */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
  --font-weight-black: 900;

  /* ── Typography: Font Sizes ──────────────────────────────────────────── */
  --font-size-xs: 0.75rem; /* 12px — tags, labels */
  --font-size-sm: 0.875rem; /* 14px */
  --font-size-base: 1rem; /* 16px — body, inputs, buttons */
  --font-size-xl: 1.25rem; /* 20px — H3 */
  --font-size-3xl: 3rem; /* 48px — H2 section headers */
  --font-size-4xl: 5.25rem; /* 84px — H1 hero */

  /* ── Typography: Line Heights ────────────────────────────────────────── */
  --line-height-tight: 0.8; /* H1 */
  --line-height-snug: 1; /* H2, H3, tags */
  --line-height-normal: 1.4; /* body, inputs, buttons */

  /* ── Typography: Letter Spacing ──────────────────────────────────────── */
  --letter-spacing-tight: -0.02em; /* headings */
  --letter-spacing-normal: 0em; /* body/UI */

  /* ── Spacing ─────────────────────────────────────────────────────────── */
  --spacing-1: 0.25rem; /* 4px  */
  --spacing-2: 0.5rem; /* 8px  */
  --spacing-3: 0.75rem; /* 12px */
  --spacing-4: 1rem; /* 16px */
  --spacing-5: 1.25rem; /* 20px */
  --spacing-6: 1.5rem; /* 24px */
  --spacing-8: 2rem; /* 32px */
  --spacing-10: 2.5rem; /* 40px */
  --spacing-12: 3rem; /* 48px */
  --spacing-16: 4rem; /* 64px */
  --spacing-20: 5rem; /* 80px */
  --spacing-24: 6rem; /* 96px */

  /* ── Border Radius ───────────────────────────────────────────────────── */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-card: 16px; /* workshop cards */
  --radius-pill: 9999px; /* buttons, tags */
  --radius-circle: 50%; /* icon buttons, avatar blobs */

  /* ── Shadows ─────────────────────────────────────────────────────────── */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.08); /* workshop card */

  /* ── Motion ──────────────────────────────────────────────────────────── */
  --transition-fast: 150ms ease;
  --transition-base: 250ms ease;
  --transition-slow: 400ms ease;

  /* ── Layout ──────────────────────────────────────────────────────────── */
  --container-max-width: 1280px;
  --section-padding-y-desktop: var(--spacing-20); /* 80px */
  --section-padding-y-mobile: var(--spacing-12); /* 48px */
  --section-padding-x-desktop: var(--spacing-8);
  --section-padding-x-mobile: var(--spacing-4);
}
```

### Elementor Integration

Since Elementor Global Colors don't use CSS vars natively:

- Document exactly which Elementor Global Color slot maps to which token (in `elementor/global-colors.md`) — use the mapping table from Phase 1F
- Load `custom-properties.css` via WordPress child theme `functions.php` using `wp_enqueue_style()`
- Provide snippet for child theme `style.css` that imports it
- For Elementor's Custom CSS panel: provide the complete `:root {}` block (the one above) to paste as fallback

### Pre-written Component CSS Patterns

Write the following into `css/typography.css`:

```css
/* Headings */
.fe-h1 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-black);
  line-height: var(--line-height-tight);
  letter-spacing: var(--letter-spacing-tight);
  color: var(--color-neutral-900);
}
.fe-h1--accent {
  font-family: var(--font-family-accent);
  color: var(--color-primary-500);
}
.fe-h2 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-snug);
  letter-spacing: var(--letter-spacing-tight);
}
.fe-h3 {
  font-family: var(--font-family-heading);
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-snug);
  letter-spacing: var(--letter-spacing-tight);
}
.fe-body {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
}
.fe-body--medium {
  font-weight: var(--font-weight-medium);
}
.fe-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-snug);
}
.fe-tag {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-snug);
}
```

Write the following into `css/utilities.css` (buttons and key UI patterns):

```css
/* Primary Button */
.fe-btn-primary {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  background-color: var(--color-primary-500);
  color: var(--color-white);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  line-height: var(--line-height-normal);
  border: 2px solid transparent;
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    transform var(--transition-fast);
  text-decoration: none;
}
.fe-btn-primary:hover {
  background-color: var(--color-primary-600);
}
.fe-btn-primary:focus {
  outline: 3px solid var(--color-primary-300);
  outline-offset: 2px;
}
.fe-btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

/* Secondary Button */
.fe-btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-2);
  padding: var(--spacing-3) var(--spacing-6);
  background-color: transparent;
  color: var(--color-primary-500);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border: 2px solid var(--color-primary-500);
  border-radius: var(--radius-pill);
  cursor: pointer;
  transition:
    background-color var(--transition-base),
    color var(--transition-base);
  text-decoration: none;
}
.fe-btn-secondary:hover {
  background-color: var(--color-primary-50);
}
.fe-btn-secondary:focus {
  outline: 3px solid var(--color-primary-300);
  outline-offset: 2px;
}

/* Category / Filter Tag */
.fe-tag-pill {
  display: inline-flex;
  align-items: center;
  padding: var(--spacing-1) var(--spacing-3);
  border-radius: var(--radius-pill);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-700);
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);
  cursor: pointer;
  border: 1px solid var(--color-neutral-200);
}
.fe-tag-pill:hover {
  background-color: var(--color-primary-50);
  color: var(--color-primary-600);
}
.fe-tag-pill.active {
  background-color: var(--color-primary-500);
  color: var(--color-white);
  border-color: var(--color-primary-500);
}

/* Workshop Card */
.fe-card {
  background: var(--color-white);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-card);
  overflow: hidden;
  transition:
    box-shadow var(--transition-base),
    transform var(--transition-base);
}
.fe-card:hover {
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

/* Benefit / Get-involved Card */
.fe-card-benefit {
  background: var(--color-secondary-lavender-400);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
}

/* Form Input */
.fe-input {
  width: 100%;
  padding: var(--spacing-3) var(--spacing-4);
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-regular);
  line-height: var(--line-height-normal);
  color: var(--color-neutral-900);
  background: var(--color-white);
  border: 1px solid var(--color-neutral-300);
  border-radius: var(--radius-md);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
  outline: none;
}
.fe-input::placeholder {
  color: var(--color-neutral-400);
}
.fe-input:hover {
  border-color: var(--color-neutral-500);
}
.fe-input:focus {
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px rgba(255, 122, 58, 0.15);
}
.fe-input--error {
  border-color: var(--color-status-error);
}
.fe-input--error:focus {
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

/* Section wrapper */
.fe-section {
  padding-block: var(--section-padding-y-mobile);
  padding-inline: var(--section-padding-x-mobile);
}
@media (min-width: 768px) {
  .fe-section {
    padding-block: var(--section-padding-y-desktop);
    padding-inline: var(--section-padding-x-desktop);
  }
}
.fe-container {
  max-width: var(--container-max-width);
  margin-inline: auto;
}
```

---

## PHASE 4 — FIGMA ↔ REPO SYNC

### Strategy

Use **Tokens Studio for Figma** (free plugin) to:

1. Define variables in Figma matching our token JSON structure
2. Export/sync to this repo via GitHub integration OR manual JSON export

### Document in `figma/sync-guide.md`:

- Plugin setup steps
- How variable groups in Figma map to our token files
- Sync frequency expectation (Figma is source of truth for design decisions; repo is source of truth for implementation)
- What to do when Figma and repo diverge

### Variable naming in Figma

Must mirror the token naming: `color/brand/primary`, `spacing/lg`, etc. (Figma uses `/` as separator).

---

## PHASE 5 — GIT WORKFLOW

### Branch Strategy

Initialize with these branches:

```text
main        → production-ready, protected, requires PR + review
develop     → integration branch, all features merge here first
feature/*   → new features (e.g., feature/add-button-tokens)
fix/*        → bug fixes (e.g., fix/heading-font-weight)
docs/*      → documentation only (e.g., docs/update-contributing-guide)
```

### Rules

- `main` is protected. No direct pushes. Ever.
- All work branches off `develop`.
- PRs to `develop` require at least one review.
- Merges from `develop` → `main` are release events. Tag with semver: `v1.0.0`, `v1.1.0`, etc.
- Commit messages must follow **Conventional Commits**:
  - `feat: add spacing scale tokens`
  - `fix: correct --color-brand-primary hex value`
  - `docs: update Elementor integration guide`
  - `chore: update build script`
  - `refactor: rename token tier from "accent" to "secondary"`

### Initialize repo with:

```bash
git init
git checkout -b main
# add all files
git add .
git commit -m "chore: initial design system scaffold"
git checkout -b develop
```

### `.github/PULL_REQUEST_TEMPLATE.md` should include:

- What changed
- Token impact (new/modified/removed tokens)
- Elementor action required? (yes/no — if yes, what)
- Figma updated? (yes/no)
- Tested on live site? (yes/no)
- CHANGELOG updated? (yes/no)

---

## PHASE 6 — AI DESKTOP RULES (.cursor/rules/)

Create these four Cursor rule files:

### `.cursor/rules/general.mdc`

```markdown
---
description: General rules for the ForEveryone design system repo
globs: ["**/*"]
alwaysApply: true
---

- This is a WordPress/Elementor design system repo for ForEveryone Berlin (https://foreveryone.berlin/)
- The stack is: WordPress + Elementor Pro + custom CSS + child theme
- Figma is source of truth for visual decisions. The repo is source of truth for implementation.
- Never modify files in `tokens/` without updating `CHANGELOG.md`
- Never hardcode hex values or font names in CSS files — always use CSS custom properties from `css/custom-properties.css`
- All token names follow the pattern: `{category}.{tier}.{variant}`
- When in doubt, read `docs/token-naming.md` before naming anything
```

### `.cursor/rules/tokens.mdc`

```markdown
---
description: Rules for working with design tokens
globs: ["tokens/**/*.json"]
alwaysApply: false
---

- Token files use W3C Design Token Community Group format
- $value, $type, $description are the only valid keys per token
- Valid $type values: color, dimension, fontFamily, fontWeight, duration, number, string
- Token values may reference other tokens using curly brace syntax: {color.brand.primary}
- After modifying any token file, run `node scripts/build-css.js` to regenerate `css/custom-properties.css`
- Never delete a token without first checking if it's used in `css/` or documented in `elementor/`
- Color tokens must have a $description explaining their semantic purpose
```

### `.cursor/rules/css.mdc`

```markdown
---
description: Rules for CSS files in the design system
globs: ["css/**/*.css"]
alwaysApply: false
---

- `css/custom-properties.css` is GENERATED — do not edit manually, edit tokens instead
- `css/elementor-overrides.css` may use `.elementor-*` selectors but keep specificity low
- All CSS property values must use `var(--token-name)` — no raw values except in `custom-properties.css`
- No `!important` unless overriding Elementor's inline styles (comment why)
- Use logical properties where possible: `margin-inline`, `padding-block`, etc.
- Mobile-first. All breakpoints use min-width.
- Elementor breakpoints: mobile < 767px, tablet 768–1024px, desktop > 1025px
```

### `.cursor/rules/git.mdc`

```markdown
---
description: Git workflow rules
globs: ["**/*"]
alwaysApply: true
---

- Branch from `develop`, never from `main`
- Branch naming: feature/_, fix/_, docs/_, chore/_
- Commit messages follow Conventional Commits spec
- Always update CHANGELOG.md under [Unreleased] when changing tokens or CSS
- Never commit directly to `main` or `develop`
- PR descriptions must use the PR template
- Tag releases on `main` with semver: v1.0.0
```

---

## PHASE 7 — README.md

Write a full `README.md` covering:

1. **Project overview** — what this repo is, who it's for (ForEveryone Berlin design system)
2. **Tech stack** — WordPress, Elementor Pro, custom CSS, child theme, Figma, Tokens Studio
3. **Repository structure** — annotated tree
4. **Quick start** — clone, `npm install`, run build script
5. **How tokens work** — JSON → build script → CSS vars → Elementor/WordPress
6. **Figma sync** — Tokens Studio plugin setup
7. **Elementor integration** — where to paste CSS, how Global Colors map
8. **Git workflow** — branch strategy, commit conventions, PR process
9. **Contributing** — link to `docs/contributing.md`
10. **Changelog** — link to `CHANGELOG.md`

---

## PHASE 8 — CHANGELOG.md

Initialize with Keep a Changelog format:

```markdown
# Changelog

All notable changes to this project will be documented in this file.
Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)
Versioning: [Semantic Versioning](https://semver.org/)

## [Unreleased]

## [0.1.0] - YYYY-MM-DD

### Added

- Initial design system scaffold
- Token files: colors, typography, spacing, radius, shadows, motion
- CSS build script
- Elementor integration documentation
- Figma sync guide
- Git workflow and branch strategy
- AI desktop rules for Cursor
```

---

## PHASE 9 — EXECUTION ORDER

Execute in this exact sequence. Do not parallelize phases that depend on each other.

1. **Write audit doc** — create `docs/audit.md` using the pre-extracted data from Phase 1. Do not re-audit; just format and commit the data.
2. **Scaffold** — create all directories and empty placeholder files
3. **Tokens** — populate all JSON files in `tokens/` using the exact values from Phase 1A and 1B
4. **Build script** — write `scripts/build-css.js` that reads `tokens/*.json` and outputs the exact `css/custom-properties.css` block defined in Phase 3
5. **CSS files** — write `css/base.css`, `css/typography.css` (use pre-written patterns from Phase 3), `css/utilities.css` (use pre-written patterns from Phase 3), `css/elementor-overrides.css`
6. **Elementor docs** — write `elementor/global-colors.md` using the mapping table from Phase 1F, `elementor/global-fonts.md`, `elementor/custom-css-setup.md`
7. **Figma docs** — write `figma/sync-guide.md` and `figma/token-export-instructions.md`
8. **Cursor rules** — write all `.cursor/rules/*.mdc` files exactly as defined in Phase 6
9. **README + CHANGELOG** — write `README.md` per Phase 7 spec, initialize `CHANGELOG.md` per Phase 8
10. **Save this prompt** — copy this entire prompt file to `docs/cursor-plan-prompt.md`
11. **Git init** — run the init commands, create `main` and `develop` branches, make initial commit

---

## CONSTRAINTS & DECISIONS

- **No build tooling beyond Node.js** — no webpack, no PostCSS pipelines. Keep it simple for non-developers.
- **No CSS-in-JS** — this is a WordPress site, plain CSS only.
- **Elementor Pro is assumed** — Global Colors, Global Fonts, and Custom CSS panels are available.
- **Child theme required** — to enqueue `custom-properties.css` properly. Document child theme setup if not already present.
- **Tokens Studio over manual Figma sync** — it's free and handles bidirectional sync.
- **Semver** — `MAJOR.MINOR.PATCH`. Breaking token changes = MAJOR. New tokens = MINOR. Fixes/docs = PATCH.
- **English only** — all docs, comments, and commit messages in English.

---

## SUCCESS CRITERIA

When done, the following must all be true:

- [ ] Any designer can open Figma, change a color, export via Tokens Studio, run the build script, and the CSS updates everywhere on the site
- [ ] Any developer can open the repo and understand the full system in under 15 minutes (README)
- [ ] Elementor editors know exactly which Global Color/Font to touch and which to leave alone (elementor/ docs)
- [ ] A new token can be added in under 5 minutes (JSON → build → CSS → document)
- [ ] Git history is clean, conventional, and branchable without merge conflicts
- [ ] Cursor AI knows the rules and won't break the system when helping with changes

---

## INCLUDE THIS PROMPT IN THE REPO

Save this file as `docs/cursor-plan-prompt.md` in the repository. It is the canonical planning document for this design system. Commit it in the initial scaffold commit:

```text
docs: add cursor plan prompt as canonical project brief
```

Keep it up to date. When the system evolves significantly (new phases, stack changes, workflow updates), update this file and log the change in `CHANGELOG.md`.
