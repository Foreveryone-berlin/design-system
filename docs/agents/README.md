# Agent workflow (cross-tool)

Editor-agnostic contracts for AI agents working in this design system. File layout: canonical `docs/AGENTS.md`, root `AGENTS.md` mirror, `CLAUDE.md`, `.cursor/AGENTS.md`.

| Doc | Purpose |
| --- | --- |
| [agent-contract.md](agent-contract.md) | Task template, git/changelog expectations, verification |
| [runtime-policy.md](runtime-policy.md) | Risk tiers; when to auto-run vs confirm (sandbox / autonomy) |
| [../AGENTS.md](../AGENTS.md) | Full docs index, commands, condensed domain rules |

**Repo root:** [`AGENTS.md`](../../AGENTS.md) mirrors the index for tools that only load root `AGENTS.md`.

**Claude Code:** [`CLAUDE.md`](../../CLAUDE.md).

**Cursor agent:** precedence in [`.cursor/AGENTS.md`](../../.cursor/AGENTS.md); path-scoped reminders in [`.cursor/rules/`](../../.cursor/rules/) (`.mdc`).

**Claude Code rules (Markdown):** [`.claude/rules/`](../../.claude/rules/).
