# Consumer agent skills

Guides for AI agents that build or restyle UI with this design system. They
package the rules in `llms.txt`, the token list, and the component docs for use
in another project.

## Skills

| Skill | Requires | Use when |
| --- | --- | --- |
| **`fe-core`** | none | New UI: tokens, `fe-*` components, brand colour and a11y baselines |
| **`fe-tokens`** | `fe-core` | Resolve or extend tokens by role; OKLCH extensions; naming |
| **`fe-components`** | `fe-core` | Build controls from documented `fe-*` contracts and state matrices |
| **`fe-a11y`** | `fe-core` | Contrast, focus, motion, alt text, WCAG 2.1 AA checks |
| **`fe-redesign`** | `fe-core` | Restyle an existing app onto ForEveryone ([redesign-from-this-system.md](agents/redesign-from-this-system.md)) |
| **`fe-og-image`** | `fe-core` | OG and featured images matched to the destination page, with export and metadata checks |

## Sources and generated copies

| Path | Audience | Role |
| --- | --- | --- |
| `skills/` | Consumers | Skill sources; edit only here |
| `dist/skills/` | Installer | Generated payload with `index.json`, `tokens.json`, and the `AGENTS.md` block |
| `.agents/skills/` | Codex in this repo | Generated mirror; never edit |
| `docs/skills/` | Maintainers | Workflows for this repo (token update, release); not consumer skills |

After editing a source, run `npm run skills:build`. It regenerates both
generated copies. `npm test`
fails when the Codex mirror is stale.

## Install

From the project that needs the skills, with a local clone of this repository:

```bash
node path/to/design-system/bin/fe-ds.mjs skills list
node path/to/design-system/bin/fe-ds.mjs skills install --dry-run
node path/to/design-system/bin/fe-ds.mjs skills install
```

By default `skills install`:

- copies the payload to `fe-skills/` (change with `--dir <path>`);
- writes a managed `<!-- foreveryone:skills:start -->` … `end -->` block into the
  project's `AGENTS.md`, keeping everything outside it;
- installs `.agents/skills/` for Codex, even in a new project;
- mirrors into `.claude/skills/` or `.cursor/skills/` when `.claude/` or `.cursor/`
  exists.

`--target` takes a comma-separated subset of `claude`, `cursor`, `codex`, `agents`
(payload plus `AGENTS.md` block), and `dir` (payload only). Re-running the
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
