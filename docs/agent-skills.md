# Consumer agent skills

Guides for AI agents that build or restyle UI with this design system. They
package the rules in `llms.txt`, the token list, and the component docs for use
in another project.

## Skills

| Skill | Requires | Use when |
| --- | --- | --- |
| **`fe-design-system`** | none | Locate maintained sources and route the task to core conventions and a specialist |
| **`fe-core`** | none | New UI: tokens, `fe-*` components, brand colour and a11y baselines |
| **`fe-tokens`** | `fe-core` | Resolve or extend tokens by role; OKLCH extensions; naming |
| **`fe-components`** | `fe-core` | Build controls from documented `fe-*` contracts and state matrices |
| **`fe-a11y`** | `fe-core` | Contrast, focus, motion, alt text, WCAG 2.1 AA checks |
| **`fe-redesign`** | `fe-core` | Restyle an existing app onto ForEveryone ([redesign-from-this-system.md](agents/redesign-from-this-system.md)) |
| **`fe-og-image`** | `fe-core` | OG and featured images matched to the destination page, with export and metadata checks |

## Sources and generated copies

`fe-design-system` adapts the routing skill from the ForEveryone website
repository. It uses portable source discovery and public GitHub endpoints,
without carrying website-local paths or treating the human-facing prototype as
an agent endpoint. Figma governs visual decisions; this repository governs
implementation.

| Path | Audience | Role |
| --- | --- | --- |
| `skills/` | Consumers | Skill sources; edit only here |
| `dist/skills/` | Installer | Generated payload with `index.json`, `tokens.json`, and the `AGENTS.md` block |
| `.claude/skills/` | Claude Code in this repo | Generated mirror; never edit |
| `.agents/skills/` | Cursor and Codex in this repo | Committed links into `.claude/skills/`; one per entry |
| `docs/skills/` | Maintainers | Workflows for this repo (token update, release); not consumer skills |

After editing a source, run `npm run skills:build`. It regenerates the distribution and
`.claude/skills/`. `npm test` fails when a mirror is stale or an `.agents/skills/` link is missing.
Frontmatter carries `name` and `description` at the top level and `foreveryone`, `requires`, and
`docs` under `metadata` as strings, lists comma-separated, per the
[Agent Skills spec](https://agentskills.io/specification).

## Install

From the project that needs the skills, with a local clone of this repository:

```bash
node path/to/design-system/bin/fe-ds.mjs skills list
node path/to/design-system/bin/fe-ds.mjs skills install --dry-run
node path/to/design-system/bin/fe-ds.mjs skills install
```

By default `skills install` writes `.claude/skills/` for Claude Code and `.agents/skills/`
for Codex and Cursor, which reads both.

`--target` takes a comma-separated subset of `claude`, `cursor`, `codex`, `agents`
(payload in `fe-skills/`, or `--dir <path>`, plus a managed
`<!-- foreveryone:skills:start -->` … `end -->` block in the project's `AGENTS.md`),
and `dir` (payload only). Re-running the
installer replaces the payload and the managed block in place. Codex reads root
`AGENTS.md`, not `CLAUDE.md` or editor rule folders
([Codex AGENTS.md guide](https://learn.chatgpt.com/docs/agent-configuration/agents-md)).
The installer needs no network or API key; the package is private and not on npm.

## GitHub discovery

Agents that only have a URL read the public repository (branch `main`):

- <https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/llms.txt>
- <https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/index.json>
- <https://raw.githubusercontent.com/Foreveryone-berlin/design-system/main/dist/skills/tokens.json>

The prototype at design.foreveryone.berlin is for people. It sends `noindex, nofollow`
and `Content-Signal: ai-train=no, search=no, ai-input=no`, and `prototype/proxy.ts`
returns 403 to AI crawlers on every path.
