#!/usr/bin/env bash
# Push current branch, open a PR into develop, and merge it.
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

TITLE=$(git log -1 --pretty=format:%s)
BODY="Solo dev: merge via script. Token impact: see commits. Elementor/Figma/CHANGELOG: as per branch."

echo "Creating PR into develop..."
gh pr create --base develop --title "$TITLE" --body "$BODY"

echo "Merging PR..."
gh pr merge --merge

echo "Done. PR created and merged into develop."
