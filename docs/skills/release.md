# Release Workflow

Ship a version from `develop` to `main` and tag it (e.g. v0.1.0).

> **Automated path:** the `ship-release` Claude Code skill (`.claude/skills/ship-release/SKILL.md`) drives this whole flow end-to-end on a trigger phrase ("ship it", "cut release", "release X.Y.Z"). Deploy is by Vercel (push to `main`); `release.yml` only creates the GitHub Release from the tag. The manual steps below remain the fallback and the reference for what the skill does.

## Prerequisites

- All work for the release is on `develop`.
- Build and checks pass: `node scripts/build-css.js`, token JSON valid, no unintended diffs.
- `CHANGELOG.md` has the new version section with date and entries; `[Unreleased]` is ready for next cycle.

## Steps

1. **Finalize CHANGELOG**
   - Move or copy relevant items from `[Unreleased]` into `## [X.Y.Z] - YYYY-MM-DD`.
   - Leave `## [Unreleased]` at the top for future changes.

2. **Commit on `develop`**
   - Use conventional commits, e.g. `chore: release 0.1.0` or `docs: finalize CHANGELOG for 0.1.0`.
   - Include any release-related doc/rule updates in the same or previous commits.

3. **Push `develop`**
   ```bash
   git push origin develop
   ```

4. **Open a pull request**
   - Base: `main`. Compare: `develop`.
   - Use the [PR template](../../.github/PULL_REQUEST_TEMPLATE.md): what changed, token impact, Elementor action, Figma updated, tested, CHANGELOG updated.

5. **Review and merge**
   - After approval, merge the PR into `main` (merge commit or squash per team preference).

6. **Tag the release on `main`**
   ```bash
   git checkout main
   git pull origin main
   git tag -a v0.1.0 -m "Release 0.1.0"
   git push origin v0.1.0
   ```

7. **Verify production after deploy**
   - Confirm Vercel has deployed the `main` commit to `design.foreveryone.berlin`.
   - Verify the `.vercel.app` → official domain 301 (see [prototype-deploy.md](../prototype-deploy.md)):
     ```bash
     curl -sI -H "Host: fe-design-system.vercel.app" \
       https://fe-design-system.vercel.app/ | grep -i "^location\|^HTTP"
     ```
     Expect `HTTP/2 301` and `location: https://design.foreveryone.berlin/`.
   - Re-fetch og tags on the official domain and run them through the Facebook Sharing Debugger and the Twitter Card Validator. Expect `og:image` 1200×630 (under 1 MB) and a non-empty `alt`.

8. **Optional**
   - Create a GitHub Release from the tag and paste in the relevant CHANGELOG section.

## Branch rules

- Do not push directly to `main`; use the PR.
- Develop new work on `develop` or feature branches; merge to `develop` first, then release to `main`.
