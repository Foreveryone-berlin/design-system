# PR-and-merge workflow

The workflow in `.github/workflows/pr-and-merge.yml` is **manual only** (`workflow_dispatch`). It is not triggered on push, because the repo cannot grant GitHub Actions permission to create pull requests. Use the script locally instead.

## Run locally (recommended)

From a feature branch, run:

```bash
bash scripts/pr-and-merge.sh
```

Requires `gh` CLI and `gh auth login`. The script will push the branch, create a PR into `develop` (using the PR template), and merge it.

You can also ask the agent to “merge this branch into develop”; the Cursor rule runs this script for you.
