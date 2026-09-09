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

# Build body from .github/PULL_REQUEST_TEMPLATE.md (required by workspace rules).
# Only the sections this script can fill from the branch itself; the template
# says to delete what does not apply, so the rest are left out rather than
# emitted as an empty or "No" answer.
TITLE=$(git log -1 --pretty=format:%s)
WHY=$(git log -1 --pretty=format:%b | sed '/^$/d')
[ -z "$WHY" ] && WHY="-"
BASE_REF=develop
git rev-parse --verify --quiet origin/develop >/dev/null && BASE_REF=origin/develop
CHANGES=$(git log "$BASE_REF..HEAD" --pretty=format:"- %s" 2>/dev/null)
[ -z "$CHANGES" ] && CHANGES="-"

FILES=$(git diff --name-only "$BASE_REF..HEAD" 2>/dev/null)
CHECKS="- [ ] CI is the gate here: tokens build + test, prototype lint + build, prototype a11y e2e"
if printf '%s\n' "$FILES" | grep -qE '^(tokens/|css/)'; then
  if printf '%s\n' "$FILES" | grep -qx 'CHANGELOG.md'; then
    CHECKS="$CHECKS
- [x] \`CHANGELOG.md\` updated, as a \`tokens/\` or \`css/\` change requires"
  else
    CHECKS="$CHECKS
- [ ] **\`CHANGELOG.md\` is not in this branch, but \`tokens/\` or \`css/\` changed. Add the entry before merging.**"
  fi
fi

BODY="## Why

$WHY

## What changed

$CHANGES

## Checks

$CHECKS
"

echo "Creating PR into develop..."
gh pr create --base develop --title "$TITLE" --body "$BODY"
echo "Merging PR..."
gh pr merge --merge
echo "Done. PR created and merged into develop."
