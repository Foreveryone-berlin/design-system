# Consumer agent skills

Guides for AI agents that build or restyle UI with this design system. The rules
match what is already in `llms.txt`, the token list, and the component docs.
Install them into another project when the agent is working there instead of in
this repository.

## Three different “skills” folders

| Path | Audience | Role |
| --- | --- | --- |
| `skills/` (repo root) | **Consumers** | Installable `fe-core` / `fe-redesign` sources built to `dist/skills/` and mirrored at `/skills/` on the prototype |
| `docs/skills/` | **Maintainers** | Workflows for this repo (token update, release) |
| `.claude/skills/` | **Maintainers** | Project tools such as `optimize-prototype` |

Do not confuse them. This page is only about consumer skills.

## Install from a clone (primary)

In the project where the skills should live, with a local clone of this
repository available:

```bash
node path/to/design-system/bin/fe-ds.mjs skills list
node path/to/design-system/bin/fe-ds.mjs skills install
node path/to/design-system/bin/fe-ds.mjs skills install --dry-run
node path/to/design-system/bin/fe-ds.mjs skills path
```

If your shell is already inside the clone and that clone is the project you want
to equip, `node bin/fe-ds.mjs skills install` is enough.

`skills install` copies the payload into `fe-skills/` (or `--dir`), writes a managed
`<!-- foreveryone:skills:start -->` … `end -->` block into the project’s `AGENTS.md`,
and mirrors into `.claude/skills`, `.cursor/skills`, or `.agents/skills` when those
parent folders already exist. Use `--target` to force a layout. Zero network after
the clone; no API key; this package is private and is not published to npm.

Rebuild the committed trees after editing sources:

```bash
npm run skills:build
```

That regenerates `dist/skills/`, syncs `prototype/public/skills/`, and copies root
`llms.txt` to `prototype/public/llms.txt`.

## Site discovery (secondary)

After deploy, agents that only have the hostname can read:

- <https://design.foreveryone.berlin/llms.txt>
- <https://design.foreveryone.berlin/skills/index.json>
- <https://design.foreveryone.berlin/skills/tokens.json>
- Prototype page: <https://design.foreveryone.berlin/agent-skills>

Those paths omit the site-wide `Content-Signal: ai-input=no` and are exempt from the
AI-crawler 403 in `prototype/proxy.ts`.

## Skills in v1

- **`fe-core`** — new UI: tokens, `fe-*` components, brand colour and a11y rules.
- **`fe-redesign`** — restyle an existing app onto ForEveryone; requires `fe-core`;
  installable form of
  [redesign-from-this-system.md](agents/redesign-from-this-system.md).

Machine surface for v1 is `tokens.json` only (no class `api.json` yet).
