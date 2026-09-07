# Contributing Guide

Thanks for contributing to the ForEveryone Berlin design system.

## Skills & Workflows

For step-by-step workflows (token updates, releases), see [docs/skills/](skills/). Per-platform sync steps live under [integrations/](../integrations/).

## Workflow

1. The repository’s default branch is `main`.
2. Branch from `develop` (never from `main`).
3. Use naming: `feature/*`, `fix/*`, `docs/*`, `chore/*`.
4. Make focused changes.
5. Run `node scripts/build-css.js` if tokens changed.
6. Update `CHANGELOG.md` under the current in-flight version section (e.g. `## [Unreleased]`).
7. Open a pull request using `.github/PULL_REQUEST_TEMPLATE.md`.

## Commit Messages

Use Conventional Commits:

- `feat: add spacing scale tokens`
- `fix: correct input focus border state`
- `docs: update host-platform global colors guide`
- `chore: improve token build script logging`

## Pull Request Expectations

- Describe what changed and why.
- Declare token impact (new/modified/removed).
- Specify whether any consuming target needs a follow-up action (yes/no).
- Confirm whether Figma was updated.
- Confirm testing on affected consuming targets.
- Confirm changelog update status.

## Quality Checklist

- No hardcoded hex values in CSS (except generated `custom-properties.css`).
- No direct font-family literals outside token variables.
- New tokens include `$description`.
- Token `$description` text stays semantic (no host-platform slot names).
- Docs remain aligned with implementation.

## Integrations

Target-specific setup and vendor docs: [integrations/README.md](../integrations/README.md).
