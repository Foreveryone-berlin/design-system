---
name: ship-release
description: Drive the full ForEveryone design-system release end-to-end — develop → main → tag → GitHub Release → Vercel deploy verify — autonomously on a trigger phrase. Use when the user says "ship it", "cut release", "release X.Y.Z", or "ship to main". Deploy is by Vercel (push to main), not a GitHub Action; release.yml only creates the GitHub Release from the tag.
---

# Ship a release (autonomous)

Drives this repo's release flow from a single trigger phrase: **feature branch → develop → version bump + CHANGELOG finalize → main (via PR) → tag → GitHub Release → verify Vercel deploy → cleanup**.

Adapted from parcelLab's `plab-ship-release`, but this repo deploys via **Vercel** (which auto-deploys on push to `main`), not a GitHub-Action deploy step, and has **no staging branch**. `release.yml` only *creates the GitHub Release* from the `v*.*.*` tag.

## When it fires

Trigger phrases inside this repo's working directory: "ship it", "ship this branch", "cut release", "release X.Y.Z", "ship to main".

Once invoked, run **end-to-end without prompting — invocation IS the approval**. Halt only on the conditions below. The user can Ctrl-C to intervene.

## Hard rules

- Never use the em-dash character (U+2014) in commits, CHANGELOG, or release notes.
- No "Generated with Claude" attribution or co-author trailers.
- Branch from `develop`, never `main`. Never push directly to `main`; main changes go through a PR.
- Conventional Commits. Use `.github/PULL_REQUEST_TEMPLATE.md` for PRs.
- After any token/CSS change, `node scripts/build-css.js` (or `npm run build`) and never hand-edit `css/custom-properties.css`.

## Halt conditions (stop and surface; everything else runs unattended)

- Pre-flight: dirty working tree, unexpected branch, or `npm run build` producing an unexpected diff in generated files.
- Prototype build, axe e2e, or screenshot step failing.
- A merge conflict whose resolution is not the deterministic `git checkout develop -- <file>` pattern.
- Required main-PR checks (CI in `.github/workflows/ci.yml`) failing, or pending past ~15 min.
- The `release.yml` Release run ending non-success.
- The Vercel deploy not serving the new commit (301 / version check below fails).
- Anything genuinely surprising: missing version-bump target, force-push appearing necessary, unknown CI check. When in doubt, halt.

## Flow

### 1. Pre-flight
- `git fetch --prune`.
- Clean worktree; on `develop` or a feature branch.
- `npm run build` (CSS + spec) clean, no unintended diff.
- Prototype: `cd prototype && npm install`, then with the dev server up, `PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e` (axe gate) green.

### 2. Feature PR (if work is on a feature branch, not yet on develop)
- `bash scripts/pr-and-merge.sh` — pushes the branch, opens a PR into `develop` from the template, and merges it. Idempotent.

### 3. Release-cut on develop
- Bump `version` in `package.json` and `prototype/package.json` to `X.Y.Z`.
- Finalize the CHANGELOG: date the `## [X.Y.Z] - YYYY-MM-DD` section; keep it to the plain-language standard at the top of `CHANGELOG.md` (≤6 short bullets, no file paths or token IDs in the summary list). Leave `## [Unreleased]` in place.
- Commit `chore: release X.Y.Z` on develop and push.

### 4. Promote to main (PR, mandatory)
- Open PR `develop → main` (base `main`, head `develop`) with the PR template body.
- Wait for required CI to pass (`gh pr checks` / poll, do not block the harness).
- Merge: `gh pr merge <id> --merge` (or `--squash --admin` if main protection requires bypass). Never direct-push to main.

### 5. Tag and Release
- `git checkout main && git pull origin main`.
- `git tag -a vX.Y.Z -m "Release X.Y.Z"` and `git push origin vX.Y.Z`.
- The tag push triggers `.github/workflows/release.yml`, which publishes the GitHub Release titled `X.Y.Z` from the CHANGELOG section. Poll: `gh run list --workflow=release.yml` then `gh run view <id> --json conclusion,status` (never `gh run watch`).

### 6. Verify the Vercel deploy (not a CI step)
Vercel auto-deploys `main`. Confirm the official domain serves the new version and the legacy host 301-redirects:
```bash
curl -sI -H "Host: fe-design-system.vercel.app" \
  https://fe-design-system.vercel.app/ | grep -i "^location\|^HTTP"
```
Expect `HTTP/2 301` and `location: https://design.foreveryone.berlin/`. Confirm `design.foreveryone.berlin` is live and the home hero shows `vX.Y.Z`. See `docs/prototype-deploy.md`.

### 7. Cleanup
- Delete merged local + remote feature branches; keep `develop` and `main`.
- `git fetch --prune`; drop any agent stashes.

## What this skill does NOT do
- Push hotfixes directly to main.
- Rewrite history (`reset`/`rebase`/force-push) — those stay gated.
- `npm publish` — this is not a published package.

## Related
- `docs/skills/release.md` — the manual release steps (this skill automates them; manual remains the fallback).
- `docs/pr-and-merge-workflow.md` — `pr-and-merge.sh` behaviour.
- `docs/prototype-deploy.md` — Vercel hosting + redirect verification.
