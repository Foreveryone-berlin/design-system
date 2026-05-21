# Runtime policy (sandbox vs autonomous)

Same *shape* as the agent docs in the parcelLab **`parcellab-website`** repo: calibrate how much an agent auto-runs vs asks, by risk.

## Risk tiers

| Tier | Examples | Agent behaviour |
| --- | --- | --- |
| **Low** | Docs-only (`docs/`, markdown), changelog copy, comments | Prefer running read-only checks (`git status`, file reads) without pausing on every step when your tool supports it. |
| **Medium** | `tokens/*.json`, authored `css/*.css` (not generated), `prototype/**`, `scripts/build-css.js`, local `npm run dev` / `npm run build` in `prototype/` | Work on a feature branch; run `node scripts/build-css.js` after token edits; ask before `git push --force`, major dependency bumps in `prototype/`, or bulk token deletion. |
| **High** | Production secrets, credentials, destructive git on shared branches, deleting large token sets without explicit confirmation | Require explicit human confirmation before each step. |

This repo does **not** host production WordPress; treat **live Elementor / WP** changes as **High** risk when the task is “apply to production” (coordination is out-of-repo).

## Ask once per session

The human can set:

- **Mode A — Tight:** default; approvals for most shell/network.
- **Mode B — Balanced:** allowlist `node scripts/build-css.js`, `npm run *` inside `prototype/`, `git diff` / `status` / `log` for this repo.
- **Mode C — Fast loop (local only):** broader auto-run only on a **disposable** branch with no secrets in the working tree.

Cloud agents (Cursor agent cloud, Claude cloud, etc.) should assume **Mode A** unless the user states otherwise.

## When broad auto-run is inappropriate

- Committing or pushing directly to `main` / `develop` (this repo’s workflow forbids that except documented exceptions).
- Network or installs that could pull unaudited code into the project.
- Skipping `CHANGELOG.md` when changing `tokens/` or implementation `css/` (process breach, not “security”, but still not “done”).

## Evidence before “done”

Run the verification you claim (`node scripts/build-css.js`, `prototype/` `npm run build` or `lint` when relevant), do not assume success.
