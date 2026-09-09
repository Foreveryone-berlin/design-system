# PR-and-merge workflow

The workflow in `.github/workflows/pr-and-merge.yml` is **manual only** (`workflow_dispatch`). It is not triggered on push, because the repo cannot grant GitHub Actions permission to create pull requests. Use the script locally instead.

## Run locally (recommended)

From a feature branch, run:

```bash
bash scripts/pr-and-merge.sh
```

Requires `gh` CLI and `gh auth login`. The script pushes the branch, creates a PR into `develop`, and merges it.

The body it writes covers the three sections of [`.github/PULL_REQUEST_TEMPLATE.md`](../.github/PULL_REQUEST_TEMPLATE.md) it can fill from the branch itself: **Why** from the newest commit body, **What changed** from the commit subjects, and **Checks** pointing at CI, plus a warning line when the branch touches `tokens/` or `css/` without a `CHANGELOG.md` entry. The template's optional sections (Tokens, Screenshots, Risk and rollback) are left out rather than emitted empty; add them by hand when they apply.

You can also ask the agent to “merge this branch into develop”; the Cursor rule runs this script for you.
