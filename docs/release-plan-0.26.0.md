# Release Plan: 0.26.0

Status: Executing

## Scope

Release the current prototype navigation improvements, accessibility fixes, token pipeline corrections, and release tooling fixes as version `0.26.0`.

## 1. Pre-flight

- Confirm the working tree contains only intentional release changes.
- Remove temporary `.playwright-mcp/` session artifacts from the release set.
- Confirm the branch is `develop` and synchronized with `origin/develop`.
- Run the root token build and tests:
  - `npm run build`
  - `npm test`
- Run prototype verification:
  - `npm run build`
  - Chromium smoke tests
  - Chromium axe tests
  - clean localhost browser checks
- Confirm generated CSS and token spec contain no unintended changes.

## 2. Release metadata

- Bump the version in the root `package.json` from `0.25.1` to `0.26.0`.
- Bump the version in `prototype/package.json` from `0.25.1` to `0.26.0`.
- Update the matching lockfile version metadata.
- Finalize `CHANGELOG.md` with:
  - `## [Unreleased]` retained at the top
  - `## [0.26.0] - 2026-07-13`
  - no more than six plain-language bullets
- Cover:
  - heading permalink anchors with copied-link feedback
  - mobile navigation resize recovery
  - search shortcut visibility behavior
  - dropdown accessibility semantics
  - token reference resolution
  - dev-server health-check handling

## 3. Commit on develop

- Review the complete diff and exclude secrets, screenshots, logs, and temporary artifacts.
- Commit using Conventional Commits:

  `chore: release 0.26.0`

- Push `develop` to the remote.

## 4. Promote to main

- Open a `develop` to `main` pull request using `.github/PULL_REQUEST_TEMPLATE.md`.
- Document:
  - implementation summary
  - token impact
  - Elementor action
  - Figma status
  - test results
  - changelog status
- Wait for all required CI checks.
- Merge through GitHub. Do not push directly to `main`.

## 5. Tag and publish

- Update the local `main` branch from `origin/main`.
- Create the annotated tag:

  `v0.26.0`

- Push the tag.
- Confirm `release.yml` publishes the GitHub Release from the `0.26.0` changelog section.

## 6. Verify production

- Confirm Vercel deploys the merged `main` commit.
- Verify the legacy host redirects:

  ```bash
  curl -sI -H "Host: fe-design-system.vercel.app" \
    https://fe-design-system.vercel.app/
  ```

- Confirm the response is HTTP 301 with:

  `location: https://design.foreveryone.berlin/`

- Verify `https://design.foreveryone.berlin/` serves the new release and displays `v0.26.0`.
- Run a final production smoke and metadata check.

## 7. Cleanup

- Delete merged feature branches locally and remotely when applicable.
- Run `git fetch --prune`.
- Keep `develop` and `main`.

## Release gate

Do not begin release execution while the working tree contains unreviewed or uncommitted changes.
