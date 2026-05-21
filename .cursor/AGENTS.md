# Cursor agent instructions — foreveryone-design-system

Precedence shim for the **Cursor agent** (CLI and IDE agent mode). Do not duplicate the full docs index or domain sections here. Path-scoped reminders live in [`.cursor/rules/*.mdc`](rules/) and are auto-attached by Cursor.

## Precedence

If any instruction conflicts, use this order:

1. [`docs/AGENTS.md`](../docs/AGENTS.md)
2. [`docs/agents/agent-contract.md`](../docs/agents/agent-contract.md)
3. [`docs/agents/runtime-policy.md`](../docs/agents/runtime-policy.md)
4. [`docs/pr-and-merge-workflow.md`](../docs/pr-and-merge-workflow.md)
5. Repo root [`AGENTS.md`](../AGENTS.md) (mirror / retrieval index)

## Mandatory reads for Cursor agent

- Runtime context, docs index, token/CSS/Elementor rules: **`docs/AGENTS.md`**
- Task shape and verification: **`docs/agents/agent-contract.md`**
- Sandbox / autonomy and risk tiers: **`docs/agents/runtime-policy.md`**
- Merge-to-develop solo workflow: **`docs/pr-and-merge-workflow.md`**
- Path-scoped reminders: **`.cursor/rules/*.mdc`** (auto-attached by Cursor)

## Retrieval rule

For tokens, CSS, Elementor, Figma, or Next.js prototype tasks, follow retrieval-led reasoning from **`docs/AGENTS.md`** (and the files it indexes) before relying on model memory.

## Commands (summary)

- Build CSS from tokens (repo root): `node scripts/build-css.js`
- Prototype dev: `cd prototype && npm install && npm run dev`
- Solo ship to `develop`: `bash scripts/pr-and-merge.sh` (when the user explicitly asks)
