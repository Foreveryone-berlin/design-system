<!--
Delete every section that does not apply. An empty section, or one answered
"No" / "N/A", tells a reviewer nothing; a missing section says the same thing
in no words.
-->

## Why

One or two sentences. Link the issue, audit finding, or doc that asked for this.

## What changed

-

## Checks

- [ ] `npm run build` re-run; `css/custom-properties.css` and `spec/tokens.json` are generated output, not hand-edited
- [ ] `npm test` green (paste the counts)
- [ ] Prototype e2e + axe green against a local dev server
- [ ] `CHANGELOG.md` `[Unreleased]` updated (required for any `tokens/` or `css/` change)
- [ ] Nothing platform-specific added to `tokens/`, `spec/`, or the shared `css/*.css`

## Tokens

What was added, renamed, or removed, and what a consumer has to do about it.

## Screenshots

Before and after, at the breakpoints the change affects.

## Risk and rollback

What breaks if this is wrong, and how to undo it.
