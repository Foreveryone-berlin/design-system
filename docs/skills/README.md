# Project Skills & Workflows

Repeatable workflows for maintaining the ForEveryone Berlin design system. These are **manual fallbacks** for humans and for agents that do not auto-load project skills. The auto-loaded agent skills live in `.claude/skills/` and are used by both Cursor and Claude.

Agent / tool context and doc index: [AGENTS.md](../AGENTS.md).

| Workflow | Description | Authoritative skill |
|----------|-------------|---------------------|
| [Token update](token-update.md) | Add or change design tokens and regenerate CSS. | Build scripts + `docs/AGENTS.md` |
| [Elementor mapping](elementor-mapping.md) | Keep Elementor Global Colors/Fonts in sync with tokens. | No dedicated skill (manual fallback) |
| [Release](release.md) | Ship a version from `develop` to `main` via PR and tag. | [`.claude/skills/ship-release/SKILL.md`](../../.claude/skills/ship-release/SKILL.md) |
