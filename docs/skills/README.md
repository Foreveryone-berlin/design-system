# Project Skills & Workflows

Repeatable workflows for maintaining the ForEveryone Berlin design system. These are **manual fallbacks** for humans and for agents that do not auto-load project skills. The one auto-loaded project skill lives in `.claude/skills/optimize-prototype/` and is used by both Cursor and Claude.

Agent / tool context and doc index: [AGENTS.md](../AGENTS.md).

| Workflow | Description | Authoritative skill |
|----------|-------------|---------------------|
| [Token update](token-update.md) | Add or change design tokens and regenerate CSS. | Build scripts + `docs/AGENTS.md` |
| [Release](release.md) | Ship a version from `develop` to `main` via PR and tag. | user-level `ship` skill (no project skill) |

Per-platform sync lives under [`integrations/`](../../integrations/), not as a top-level skill. After a token change that maps to a host platform, follow that target's mapping doc from [integrations/README.md](../../integrations/README.md).
