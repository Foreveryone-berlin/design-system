# Component contracts

Deterministic specs for the shipped `.fe-*` component classes (defined in
`css/utilities.css`, consumed by the Next.js prototype and the Elementor child
theme). Each contract gives the **one correct class**, the anatomy, the states,
do/don't, and a minimal snippet so an agent reproduces the component without
guessing.

All components consume design tokens via `var(--*)`; never hardcode hex or font
names. Obey [../principles.md](../principles.md).

| Component | Class | Contract |
|---|---|---|
| Button | `.fe-btn-primary`, `.fe-btn-secondary` | [button.md](button.md) |
| Category tag | `.fe-tag-pill` | [tag-pill.md](tag-pill.md) |
| Card | `.fe-card` | [card.md](card.md) |
| Input | `.fe-input` | [input.md](input.md) |
| FAQ accordion | `.fe-faq-item` | [faq.md](faq.md) |
| Header | `.fe-header` | [header.md](header.md) |
| Dropdown | `.fe-dropdown` | [dropdown.md](dropdown.md) |
| Popup | `.fe-popup` | [popup.md](popup.md) |
| Footer | `.fe-footer` | [footer.md](footer.md) |
