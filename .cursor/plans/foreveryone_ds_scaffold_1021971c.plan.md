---
name: ForEveryone DS Scaffold
overview: Set up a complete design-system repository for ForEveryone Berlin in the exact requested phase order, including tokens, CSS generation, documentation, Cursor rules, and initial git workflow setup.
todos:
  - id: phase-1-audit-doc
    content: Create docs/audit.md from provided locked audit data
    status: pending
  - id: phase-2-3-scaffold-tokens
    content: Scaffold required directories/files and populate all token JSON files
    status: pending
  - id: phase-4-build-script
    content: Implement scripts/build-css.js to generate exact custom-properties.css output
    status: pending
  - id: phase-5-css-files
    content: Write base.css, typography.css, utilities.css, elementor-overrides.css
    status: pending
  - id: phase-6-7-docs
    content: Author Elementor and Figma integration documentation
    status: pending
  - id: phase-8-rules
    content: Add .cursor/rules files with exact specified content
    status: pending
  - id: phase-9-top-level-docs
    content: Write README.md, CHANGELOG.md, and core docs/ + ADR files
    status: pending
  - id: phase-10-prompt-file
    content: Save full project brief into docs/cursor-plan-prompt.md
    status: pending
  - id: phase-11-git-init
    content: Initialize git branches and create initial scaffold commit
    status: pending
isProject: false
---

# ForEveryone Berlin Design System Implementation Plan

## Scope and Approach

- Build a new repository scaffold from scratch under the current repo root, using your provided Phase 1 data as the locked source of truth for tokens.
- Execute phases strictly in your required sequence, with dependent steps done sequentially.
- Keep tooling minimal (Node.js script only) and ensure output artifacts are deterministic, especially `css/custom-properties.css`.

## Phase-by-Phase Execution

### 1) Write audit document (from provided data only)

- Create `[docs/audit.md](docs/audit.md)` summarizing all Phase 1 sections:
  - Color, typography, component inventory, layout patterns, inconsistencies, Elementor constraints, and slot mappings.
- Include explicit note that token values are locked to the provided audit and not re-sampled from Figma/live.

### 2) Scaffold required repository structure

- Create all required directories/files exactly as specified:
  - `[.cursor/rules/general.mdc](.cursor/rules/general.mdc)`, `[.cursor/rules/tokens.mdc](.cursor/rules/tokens.mdc)`, `[.cursor/rules/css.mdc](.cursor/rules/css.mdc)`, `[.cursor/rules/git.mdc](.cursor/rules/git.mdc)`
  - `[tokens/colors.json](tokens/colors.json)`, `[tokens/typography.json](tokens/typography.json)`, `[tokens/spacing.json](tokens/spacing.json)`, `[tokens/radius.json](tokens/radius.json)`, `[tokens/shadows.json](tokens/shadows.json)`, `[tokens/motion.json](tokens/motion.json)`, `[tokens/index.json](tokens/index.json)`
  - `[css/custom-properties.css](css/custom-properties.css)`, `[css/base.css](css/base.css)`, `[css/typography.css](css/typography.css)`, `[css/utilities.css](css/utilities.css)`, `[css/elementor-overrides.css](css/elementor-overrides.css)`
  - `[elementor/global-colors.md](elementor/global-colors.md)`, `[elementor/global-fonts.md](elementor/global-fonts.md)`, `[elementor/custom-css-setup.md](elementor/custom-css-setup.md)`, `[elementor/templates/](elementor/templates/)`
  - `[figma/sync-guide.md](figma/sync-guide.md)`, `[figma/token-export-instructions.md](figma/token-export-instructions.md)`
  - `[docs/getting-started.md](docs/getting-started.md)`, `[docs/token-naming.md](docs/token-naming.md)`, `[docs/contributing.md](docs/contributing.md)`, `[docs/decisions/001-token-format.md](docs/decisions/001-token-format.md)`
  - `[scripts/build-css.js](scripts/build-css.js)`
  - `[.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)`
  - `[README.md](README.md)`, `[CHANGELOG.md](CHANGELOG.md)`, `[.gitignore](.gitignore)`

### 3) Populate token files (W3C DTCG format)

- Write `[tokens/colors.json](tokens/colors.json)` with the exact color scales and status/base values from Phase 1A and Phase 3.
- Write `[tokens/typography.json](tokens/typography.json)` with exact family/weight/size/line-height/letter-spacing from Phase 1B and Phase 3.
- Write supporting files:
  - `[tokens/spacing.json](tokens/spacing.json)` using the scale required by the target CSS vars (`1,2,3,4,5,6,8,10,12,16,20,24`).
  - `[tokens/radius.json](tokens/radius.json)`, `[tokens/shadows.json](tokens/shadows.json)`, `[tokens/motion.json](tokens/motion.json)` matching Phase 3 values.
  - `[tokens/index.json](tokens/index.json)` as master aggregator for script consumption.

### 4) Implement deterministic CSS build script

- Create `[scripts/build-css.js](scripts/build-css.js)` to:
  - Read token JSON from `tokens/`.
  - Build and write `css/custom-properties.css`.
  - Emit the exact expected root block and comments from your Phase 3 spec.
- Ensure output ordering is fixed so diffs stay stable.

### 5) Write CSS layers

- Create `[css/base.css](css/base.css)` with reset + root/body defaults using token vars only.
- Write `[css/typography.css](css/typography.css)` exactly with your provided class patterns.
- Write `[css/utilities.css](css/utilities.css)` exactly with provided button/card/tag/input/section/container patterns.
- Create `[css/elementor-overrides.css](css/elementor-overrides.css)` for low-specificity `.elementor-*` integration helpers and scroll-header normalization notes.

### 6) Write Elementor integration docs

- Document token-to-slot mapping in `[elementor/global-colors.md](elementor/global-colors.md)` using the exact table from Phase 1F.
- Document font-slot mapping in `[elementor/global-fonts.md](elementor/global-fonts.md)`.
- Document fallback and setup in `[elementor/custom-css-setup.md](elementor/custom-css-setup.md)`, including:
  - `functions.php` `wp_enqueue_style()` example.
  - optional child-theme `style.css` import snippet.
  - full `:root` fallback paste workflow for Elementor Custom CSS.

### 7) Write Figma sync docs

- Create `[figma/sync-guide.md](figma/sync-guide.md)` with Tokens Studio setup, variable-group mapping, sync cadence, and divergence-resolution protocol.
- Create `[figma/token-export-instructions.md](figma/token-export-instructions.md)` for GitHub and manual export flows.

### 8) Add Cursor desktop rules

- Write all 4 rule files exactly as specified in Phase 6 (verbatim content and frontmatter).

### 9) Write top-level project docs

- Build comprehensive `[README.md](README.md)` per your 10 required sections.
- Initialize `[CHANGELOG.md](CHANGELOG.md)` in Keep a Changelog format with `Unreleased` and `0.1.0` seed entry.
- Add `[docs/getting-started.md](docs/getting-started.md)`, `[docs/token-naming.md](docs/token-naming.md)`, `[docs/contributing.md](docs/contributing.md)`, and ADR `[docs/decisions/001-token-format.md](docs/decisions/001-token-format.md)`.

### 10) Save canonical planning prompt

- Add full provided brief to `[docs/cursor-plan-prompt.md](docs/cursor-plan-prompt.md)` exactly as canonical project brief.

### 11) Git initialization and branch workflow

- Execute git setup commands exactly in sequence:
  - `git init`
  - `git checkout -b main`
  - `git add .`
  - `git commit -m "chore: initial design system scaffold"`
  - `git checkout -b develop`
- Add PR template in `[.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)` with required checklist fields.

## Validation Checklist During Execution

- Build check: run `node scripts/build-css.js` and verify generated `css/custom-properties.css` exactly matches required block.
- Consistency check: no raw hex/font literals in CSS files except generated `css/custom-properties.css`.
- Docs alignment check: Elementor mappings and Git workflow docs match Phase 1F/Phase 5 exactly.
- Final QA check: repository tree and required files match requested structure with no omissions.

## Deliverables

- A fully scaffolded design-system repository with tokens, generated CSS pipeline, implementation CSS, Elementor/Figma docs, Cursor rules, README/CHANGELOG, and initial git branching baseline (`main` + `develop`).
