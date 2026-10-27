# Agent support

One shared repository contract and one set of skill sources serve Claude Code,
Cursor, and Codex.

## Loading map

| Tool | Project instructions | Shared rules | Skill discovery |
| --- | --- | --- | --- |
| Claude Code | `CLAUDE.md` imports root `AGENTS.md` | Native rule pointers to `AGENTS.md`; CSS and token path scopes | Generated `.claude/skills/` |
| Cursor | Root `AGENTS.md`; `.cursor/AGENTS.md` points to it | `.cursor/rules/*.mdc` point to root rule sections | Generated `.agents/skills/` |
| Codex | Root `AGENTS.md` | Shared rules in the root entry | Generated `.agents/skills/` |

The domain index is [docs/AGENTS.md](../AGENTS.md). The
[task contract](agent-contract.md) defines verification and source boundaries;
[runtime policy](runtime-policy.md) defers permissions to the active tool and the
user's authorization. The prototype audit contract lives in root `AGENTS.md`, imported by `CLAUDE.md`.

## Maintenance

- Edit repository-wide instructions in root `AGENTS.md`, not three parallel entry files.
- Edit domain documentation in `docs/AGENTS.md`; native rule files contain only references and attachment metadata.
- Edit consumer skills in `skills/`, then run `npm run skills:build`.
- Commit the generated `dist/skills/`, `.claude/skills/`, and `.agents/skills/` output. `npm test` and CI check drift.

Other projects use the [consumer installer](../agent-skills.md). Cursor reads the shared `.agents/skills/` directory in this repository.
The consumer installer preserves native copies when `.claude/` or `.cursor/`
already exists; explicit `--target` layouts remain supported.

## Official references

- [Claude Code instruction imports](https://code.claude.com/docs/en/memory#import-additional-files)
- [Claude Code skill directories](https://code.claude.com/docs/en/skills#choose-where-skills-load)
- [Cursor skill discovery](https://cursor.com/docs/skills)
- [Codex repository instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
- [Codex skill discovery](https://learn.chatgpt.com/docs/build-skills)
