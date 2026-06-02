#!/usr/bin/env bash
# Push current branch, open a PR into develop, and merge it.
# Idempotent: if a PR already exists, just merge it. Trigger manually or via CI.
# Usage: from repo root, run: bash scripts/pr-and-merge.sh
# Requires: gh (GitHub CLI) authenticated, branch not develop/main.

set -e

BRANCH=$(git branch --show-current)
if [ "$BRANCH" = "develop" ] || [ "$BRANCH" = "main" ]; then
  echo "Error: Refusing to run on protected branch: $BRANCH"
  exit 1
fi

if ! command -v gh &> /dev/null; then
  echo "Error: GitHub CLI (gh) is required. Install: https://cli.github.com/"
  exit 1
fi

if ! gh auth status &> /dev/null; then
  echo "Error: gh is not authenticated. Run: gh auth login"
  exit 1
fi

echo "Pushing $BRANCH..."
git push -u origin "$BRANCH"

PR_NUM=$(gh pr list --base develop --head "$BRANCH" --state open --json number --jq '.[0].number // empty')
if [ -n "$PR_NUM" ]; then
  echo "PR #$PR_NUM already exists. Merging..."
  gh pr merge "$PR_NUM" --merge
  echo "Done. PR #$PR_NUM merged into develop."
  exit 0
fi

PR_MERGED=$(gh pr list --base develop --head "$BRANCH" --state merged --json number --jq '.[0].number // empty')
if [ -n "$PR_MERGED" ]; then
  echo "PR #$PR_MERGED already merged. Nothing to do."
  exit 0
fi

# Build body from .github/PULL_REQUEST_TEMPLATE.md (required by workspace rules)
TITLE=$(git log -1 --pretty=format:%s)
BASE_REF=develop
git rev-parse --verify --quiet origin/develop >/dev/null && BASE_REF=origin/develop
CHANGES=$(git log "$BASE_REF..HEAD" --pretty=format:"- %s" 2>/dev/null)
[ -z "$CHANGES" ] && CHANGES="-"

BODY="## What changed

$CHANGES

## Token impact

- [ ] New tokens
- [ ] Modified tokens
- [ ] Removed tokens
- [x] No token changes

Details:

-

## Elementor action required?

- [x] No
- [ ] Yes (describe below)

If yes, what needs to be updated in Elementor?

-

## Figma updated?

- [ ] Yes
- [x] No

## Tested on live site?

- [ ] Yes
- [x] No

## CHANGELOG updated?

- [ ] Yes
- [x] No
"

echo "Creating PR into develop..."
gh pr create --base develop --title "$TITLE" --body "$BODY"
echo "Merging PR..."
gh pr merge --merge
echo "Done. PR created and merged into develop."
