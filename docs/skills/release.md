# Release Workflow

Ship a version from `develop` to `main` and tag it (e.g. v0.1.0).

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

7. **Optional**
   - Create a GitHub Release from the tag and paste in the relevant CHANGELOG section.

## Branch rules

- Do not push directly to `main`; use the PR.
- Develop new work on `develop` or feature branches; merge to `develop` first, then release to `main`.
