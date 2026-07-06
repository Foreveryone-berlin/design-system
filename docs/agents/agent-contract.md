# Agent contract — ForEveryone Berlin design system

Portable rules for AI agents (Cursor agent, Claude Code, and similar). Cursor path-scoped reminders under [`.cursor/rules/`](../../.cursor/rules/) stay quick enforceable reminders; this file is the narrative contract.

## Product context

- **Org / site:** [foreveryone.berlin](https://foreveryone.berlin/) — WordPress + Elementor Pro + child theme on the live site.
- **This repo:** **Design tokens** (JSON), **generated and hand-authored CSS**, **Elementor/Figma docs**, and a **Next.js prototype** under `prototype/` (not production WordPress).

## Task template (non-trivial work)

1. **Goal:** one sentence.
2. **Risk tier:** Low | Medium | High — see [runtime-policy.md](runtime-policy.md).
3. **Scope:** paths and files; explicit non-goals.
4. **Constraints:** stack pin and rules in [`docs/AGENTS.md`](../AGENTS.md); no drive-by refactors.
5. **Done when:** e.g. `node scripts/build-css.js` if tokens changed; prototype builds if you touched `prototype/`; changelog updated if `tokens/` or `css/` changed.
6. **Changelog:** follow the in-flight section in `CHANGELOG.md` (see [`docs/skills/release.md`](../skills/release.md)).

## Git and PRs

- Branch from **`develop`**, not `main`. Names: `feature/*`, `fix/*`, `docs/*`, `chore/*`.
- Conventional Commits; use `.github/PULL_REQUEST_TEMPLATE.md` for PRs.
- When the user explicitly asks to ship to develop / merge / open and merge a PR, run `bash scripts/pr-and-merge.sh` from repo root (solo workflow). See [`docs/pr-and-merge-workflow.md`](../pr-and-merge-workflow.md).

## Verification

- **Tokens:** after any `tokens/*.json` edit, run `node scripts/build-css.js` and confirm `css/custom-properties.css` updated as expected.
- **Prototype:** from `prototype/`, `npm run build` or `npm run lint` when you change app code.
- **CSS:** no raw hex or font-family literals in authored layers (only `var(--…)`).

## Documentation and retrieval

- Prefer [`docs/AGENTS.md`](../AGENTS.md) and linked files over model memory for tokens, CSS layers, Elementor breakpoints, and prototype layout.
- **Figma** is the visual source of truth; **this repo** is the implementation source of truth.

## Cross-tool layout

- **Canonical narrative:** [`docs/AGENTS.md`](../AGENTS.md).
- **Root mirror:** [`AGENTS.md`](../../AGENTS.md) (retrieval index + condensed rules for tools that only read repo root).
- **Claude Code:** [`CLAUDE.md`](../../CLAUDE.md).
- **Cursor agent layering:** [`.cursor/AGENTS.md`](../../.cursor/AGENTS.md) (with path-scoped reminders in [`.cursor/rules/`](../../.cursor/rules/)).

### Cross-tool parity

When changing team-wide agent behavior, keep these surfaces aligned in the same PR:

- **Commands, stack pin, prototype baseline, skill triggers:** [`docs/AGENTS.md`](../AGENTS.md), root [`AGENTS.md`](../../AGENTS.md), [`CLAUDE.md`](../../CLAUDE.md), [`.cursor/AGENTS.md`](../../.cursor/AGENTS.md).
- **Path-scoped rules:** [`.cursor/rules/*.mdc`](../../.cursor/rules/) **and** [`.claude/rules/*.md`](../../.claude/rules/) (each `.md` file notes its `.mdc` mirror).
- **Skills:** edit [`.claude/skills/<name>/SKILL.md`](../../.claude/skills/) only; Cursor IDE and CLI auto-load from there. No `.cursor/skills/` copy.

Optional sanity check before merge: compare substantive sections of `CLAUDE.md` and `.cursor/AGENTS.md` (excluding the Cursor precedence block).

Tool loading matrix: [README.md](README.md).

Keep root `AGENTS.md`, `CLAUDE.md`, `.cursor/AGENTS.md` pins, and this contract aligned when you change team-wide behavior.

## Cursor CLI

- **Model:** Composer 2.5 standard (`maxMode: false` via dotfiles defaults).
- **Context:** loads root `AGENTS.md` + `.cursor/AGENTS.md` + project skills from `.claude/skills/`.
- **Headless:** `agent -p --force` from repo root; long jobs use `bash scripts/optimize-run.sh` (sequential optimize domains) or repo-specific `*-fanout.sh` when file ownership overlaps.
- **Autonomous jobs:** see dotfiles `docs/cursor-cli-playbook.md` for job-scoped merge/deploy rules.
