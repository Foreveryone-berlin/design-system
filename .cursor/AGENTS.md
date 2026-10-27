# Cursor

Read [AGENTS.md](../AGENTS.md) for all shared instructions. Native scoped rules
reference its sections. Skills are generated in `.agents/skills/` from `skills/`.

## Cursor CLI overrides

- Model: Composer 2.5 standard (`maxMode: false`).
- CLI context: root `AGENTS.md` and `CLAUDE.md`; load this file through the root entry.
- Headless workflow: `agent -p --force` from the repository root, within operator permissions.
- Long jobs: `bash scripts/optimize-run.sh` runs sequential domains; `--agent codex` uses Codex without changing its permissions. Use repo-specific `*-fanout.sh` where overlapping file ownership requires it.
- Autonomous merge/deploy rules come from the operator's external Cursor CLI playbook.
