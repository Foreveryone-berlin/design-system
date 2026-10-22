# Agent workflow (cross-tool)

Editor-agnostic contracts for AI agents working in this design system. File layout: canonical `docs/AGENTS.md`, root `AGENTS.md` mirror, `CLAUDE.md`, `.cursor/AGENTS.md`.

| Doc | Purpose |
| --- | --- |
| [agent-contract.md](agent-contract.md) | Task template, git/changelog expectations, verification, cross-tool parity |
| [runtime-policy.md](runtime-policy.md) | Risk tiers; when to auto-run vs confirm (sandbox / autonomy) |
| [../AGENTS.md](../AGENTS.md) | Full docs index, commands, condensed domain rules |

**Repo root:** [`AGENTS.md`](../../AGENTS.md) mirrors the index for tools that only load root `AGENTS.md`.

**Claude Code:** [`CLAUDE.md`](../../CLAUDE.md).

**Cursor agent (IDE):** precedence in [`.cursor/AGENTS.md`](../../.cursor/AGENTS.md); path-scoped reminders in [`.cursor/rules/`](../../.cursor/rules/) (`.mdc`).

**Claude Code rules (Markdown):** [`.claude/rules/`](../../.claude/rules/).

**Codex:** root [`AGENTS.md`](../../AGENTS.md) explicitly routes to the shared Markdown rules and canonical docs. It does not auto-load `CLAUDE.md` or either editor rule directory. Sequential prototype audits support `bash scripts/optimize-run.sh --agent codex`; permissions come from the installed Codex configuration.

**Consumer skills:** edit `skills/`; `npm run skills:build` generates [`.agents/skills/`](../../.agents/skills/) for Codex. Other projects use the installer in [../agent-skills.md](../agent-skills.md).

## Tool loading matrix

| Tool | Entry files | Rules | Skills |
| --- | --- | --- | --- |
| Codex | root `AGENTS.md` | Shared `.claude/rules/*.md` read explicitly via root guidance | `.agents/skills/` (generated) |
| Claude Code | `CLAUDE.md` | `.claude/rules/` | `.claude/skills/` |
| Cursor IDE | root `AGENTS.md`, `.cursor/AGENTS.md` | `.cursor/rules/` | `.claude/skills/` (auto) |
| Cursor CLI | root `AGENTS.md`, `CLAUDE.md` | `.cursor/rules/` | `.claude/skills/` (auto) |
