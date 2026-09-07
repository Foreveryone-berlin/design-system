# Design tokens (mirrors `.cursor/rules/tokens.mdc`)

Applies when editing files under `tokens/**/*.json`.

- Token files use W3C Design Token Community Group format
- `$value`, `$type`, and `$description` are the only valid keys per token
- Valid `$type` values: color, dimension, fontFamily, fontWeight, duration, number, string
- Token values may reference other tokens using curly brace syntax: `{color.brand.primary}`
- After modifying any token file, run `node scripts/build-css.js` to regenerate `css/custom-properties.css`
- Never delete a token without first checking if it's used in `css/`, `prototype/`, or documented under `integrations/`
- Token names and `$description` text stay semantic: never name a host platform's colour or font slot in a token (that mapping lives in `integrations/<target>/`)
- Color tokens must have a `$description` explaining their semantic purpose
