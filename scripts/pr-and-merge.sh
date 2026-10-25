#!/usr/bin/env bash
# Push current branch, open a PR into develop, wait for checks, and merge it.
# Idempotent: if a PR already exists, wait for its checks and merge it.
# Usage: from repo root, run: bash scripts/pr-and-merge.sh
# Requires: gh (GitHub CLI) authenticated, branch not develop/main.

set -euo pipefail

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

git fetch --quiet origin develop
BASE_REF=origin/develop
if [ -z "$(git rev-list "$BASE_REF..HEAD")" ]; then
  echo "No commits ahead of $BASE_REF. Nothing to do."
  exit 0
fi

# Three dots: compare with the branch point, not the moving tip of develop.
FILES=$(git diff --name-only "$BASE_REF...HEAD")
if printf '%s\n' "$FILES" | grep -qE '^(tokens/|css/)' \
  && ! printf '%s\n' "$FILES" | grep -qx 'CHANGELOG.md'; then
  echo "Error: tokens/ or css/ changed but CHANGELOG.md did not. Add the [Unreleased] entry first."
  exit 1
fi

wait_and_merge() {
  local pr="$1"
  # Checks can take a few seconds to register after a push or PR create.
  for _ in 1 2 3 4 5 6; do
    gh pr checks "$pr" 2>&1 | grep -q "no checks reported" || break
    sleep 10
  done
  echo "Waiting for checks on PR #$pr..."
  gh pr checks "$pr" --watch --fail-fast --interval 15
  gh pr merge "$pr" --merge
  echo "Done. PR #$pr merged into develop."
}

echo "Pushing $BRANCH..."
git push -u origin "$BRANCH"

PR_NUM=$(gh pr list --base develop --head "$BRANCH" --state open --json number --jq '.[0].number // empty')
if [ -n "$PR_NUM" ]; then
  echo "PR #$PR_NUM already exists."
  wait_and_merge "$PR_NUM"
  exit 0
fi

# Build body from .github/PULL_REQUEST_TEMPLATE.md (required by workspace rules).
# Only the sections this script can fill from the branch itself; the template
# says to delete what does not apply, so the rest are left out rather than
# emitted as an empty or "No" answer.
TITLE=$(git log -1 --pretty=format:%s)
WHY=$(git log -1 --pretty=format:%b | sed '/^$/d')
[ -z "$WHY" ] && WHY="-"
CHANGES=$(git log "$BASE_REF..HEAD" --pretty=format:"- %s")
[ -z "$CHANGES" ] && CHANGES="-"

CHECKS="- [ ] CI is the gate here: tokens build + test, prototype lint + build, prototype a11y e2e"
if printf '%s\n' "$FILES" | grep -qE '^(tokens/|css/)'; then
  CHECKS="$CHECKS
- [x] \`CHANGELOG.md\` updated, as a \`tokens/\` or \`css/\` change requires"
fi

BODY="## Why

$WHY

## What changed

$CHANGES

## Checks

$CHECKS
"

echo "Creating PR into develop..."
PR_URL=$(gh pr create --base develop --title "$TITLE" --body "$BODY")
echo "$PR_URL"
wait_and_merge "${PR_URL##*/}"
