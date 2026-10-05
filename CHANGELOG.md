# Changelog

**Format:** Based on [Keep a Changelog](https://keepachangelog.com).

**Voice:** Use the imperative, like a commit message. Write add, fix, increase, force, not added, fixed, increased, forced.

**Length:** Keep each bullet on one line, max 120 characters (link URLs do not count toward the cap, only the visible text does).

**Links:** Add inline markdown links for related PRs, docs, and external references when they help the reader.

**Audience:** Non-developer stakeholders (designers and leaders). Write so a reader who does not touch code can tell what changed.

**Standard:** At most 6 bullets per release, one plain sentence each. Keep the imperative voice (add, fix, raise) and the date on each version. No file paths, token IDs, or build/CI mechanics in the visible list. Regenerating `readme-hero` / `social-preview` with a frame or crop tweak alone does not earn a bullet.

## [Unreleased]

## [1.10.1] - 2026-10-04

### Changed

- Pin the local Node version to the 24 major, matching the project's engines field.

## [1.10.0] - 2026-10-01

### Added

- Record which existing greys stand in for the two unmatched text greys in the Figma page designs.
- The "Co-funded by the European Union" badge as an interim image, with its source and usage rules recorded.

### Changed

- Show page and section headings at the smaller Figma mobile sizes on phones, switching to the full desktop sizes on tablets and up.
- Use "Book workshop" as the one booking button label everywhere, and keep the WhatsApp button in the same neutral style as the other social buttons.

## [1.9.1] - 2026-09-29

### Changed

- Rename the installable guides and the prototype page to agent skills, and send visitors from the old page address to the new one.

## [1.9.0] - 2026-09-28

### Added

- Guides for AI agents that build or restyle UI with this system, installable from a clone or readable on the live site.

## [1.8.4] - 2026-09-24

### Added

- Record where the workshop and music icons the team uses in Canva come from, and why they cannot be brought into the system as they stand.

### Changed

- Flag the Canva elements library and the shared Drive folder as working libraries rather than sources the system imports from.
- Update prototype dependencies within their current major versions.

## [1.8.3] - 2026-09-22

### Changed

- Clarify the project’s setup guidance, contributor credits, and licence terms.
- Block search crawlers and AI tools from accessing the internal prototype.

### Fixed

- Keep the prototype FAQ accordion responsive when it is opened and closed quickly on mobile Safari.

## [1.8.2] - 2026-09-22

### Fixed

- Use the circled ForEveryone mark for browser and installed-app icons.

## [1.8.1] - 2026-09-17

### Fixed

- Restore the No. 52 Cafe naming, logo, and cafe-signs guidance to the live design system.

## [1.8.0] - 2026-09-14

### Added

- The newsletter popup's megaphone as a scalable vector, catalogued with the other functional doodles.

### Changed

- Retire the No. 52 Cafe naming, logo, and cafe-signs guidance from the design system, keeping a dated archive for signage still in circulation.
- Show the accent marks, social icons, and UI glyphs larger in the Visual Elements catalog, so each one is legible at a glance.
- Tighten the Visual Elements introduction.
- Reframe the blob-masked hero photo so the hard wall edge on its right no longer cuts across the shape.

## [1.7.2] - 2026-09-13

### Changed

- Space out the “On this page” entries on small screens so they are easier to read and tap.

## [1.7.1] - 2026-09-12

### Added

- Credit Unsplash for the prototype photographs on the Credits page and under every photo specimen (home, hero pattern, and workshop cards).

### Changed

- Mask the home and pattern hero photos with the design-system blob shape, at a larger size so the crop reads clearly.

### Fixed

- Show an “On this page” menu on small screens so in-page sections stay reachable when the side rail is hidden.

## [1.7.0] - 2026-09-12

### Added

- Record the photographer, source, and licence for each photograph, and set the rule that a picture may not enter the design system without one.

### Changed

- Replace every photograph in the prototype with licensed stock, so the home page and the pattern examples only ever show pictures we hold clear rights to use.

## [1.6.0] - 2026-09-09

### Changed

- Name the browser-testing tools we actually use on the credits and accessibility pages.
- Take the thin grey outline off the header card at the top of the project page, so the artwork sits on the page unframed again.
- Move the prototype onto the current version of its web framework, keeping the preview site on supported software.

### Fixed

- Give the site header the drop shadow the design file specifies, so it lifts off the page the way the design shows instead of sitting almost flat.

## [1.5.0] - 2026-09-08

### Added

- Add a testimonial slider that shows one short quote at a time, with dots to move between them; it can be swiped, scrolled, or driven from the keyboard.
- Add a centred display style for short testimonials, with the quote mark above the text, alongside the existing left-aligned card.
- Publish the testimonial as a documented component so other sites can use it, not just the prototype preview.

## [1.4.1] - 2026-09-07

### Changed

- Frame the system as platform-neutral; move host-platform material under integrations and stop naming host slots in shared tokens and preview copy.

## [1.4.0] - 2026-09-03

### Added

- Bring eight new colours from the 2026 brand board into the token set: Deep Teal, Magenta, Navy, Blush, Yellow, Red, and two warm greys.
- Show the new 2026 palette colours as swatches on Foundations and list their approved background + text pairings.
- Ship the doodle Belonging Guide share card so the live funnel pages can use the approved 1200×630 artwork.

### Fixed

- Correct Warm White and Lime Green hex values to match the 2026 palette on the brand board (#FDFCF6, #D4E6AB).

## [1.3.1] - 2026-08-19

### Fixed

- Turn the connecting arrows in the week-by-week step sequence the right way round, so they lead down from the first step to the next, and give them space so they no longer touch the boxes.

## [1.3.0] - 2026-08-18

### Added

- Show a team roster layout on Patterns, with a round portrait, a name, and a role, four across on desktop and stacking down to one on a phone.
- Show the same person block as a card with a short bio, the way facilitators are introduced on a course page.
- Ship five generic portrait placeholders so the new layouts can be documented without putting anyone's photo in the design system.

### Changed

- Bring the pattern catalog back in line with the Patterns page and note that names in these layouts stay charcoal, because orange is decorative only and too light for readable text.

## [1.2.0] - 2026-08-17

### Changed

- Show three course-page layouts from the live workshop pages on Patterns (a facts card, a week-by-week step sequence, and a split list band) and drop the six-point benefit grid; the benefit card stays available for the live site.
- Give the repository a new share card, so GitHub and link previews show the ForEveryone headline on the lime doodle artwork.
- Refresh the prototype's underlying libraries and clear every known security advisory.

### Removed

- Drop Cursor and Claude Code from the Credits “Built with” list so the public site does not attribute agents as product contributors.

### Fixed

- Make every icon, illustration, accent, blob, and wave in Visual Elements save with a single click, in its brand colour instead of black, and drop the GitHub links that used to hand people a web page instead of a working file.
- Stack the workshop facts card and the impact numbers into fewer columns as soon as the space around them is narrow, so values stop being cut off.

## [1.1.0] - 2026-07-30

### Added

- Ship live pattern specimens for stats, benefit cards, and the events and workshops switcher, and add direct GitHub browse links for illustration and accent sets in Visual Elements.

### Changed

- Refresh the homepage and pattern hero with the new Community Cafe imagery, responsive headline sizing, and a headline-width sketched underline.
- Reorganize the Visual Elements and Components icon documentation so functional icon families stay separate from illustrations and decorative assets.

### Fixed

- Unify prototype icon rendering under one shared icon component and restore category, workshop, line-illustration, and decorative SVG masks so every set renders reliably.
- Improve workshop-card responsiveness and related navigation polish so mobile controls, badges, labels, and actions stay readable and distinct.
- Restore heading-link feedback, browser-back behavior, syntax highlighting, and accessibility coverage so navigation and documentation interactions stay stable across browsers.

## [1.0.0] - 2026-07-18 🎉

### Changed

- Refresh the Credits page so design-system contributors are listed by name and role.

### Fixed

- Match button documentation states to the current primary and secondary button behavior in the prototype.
- Respect reduced-motion preferences for accordion and mobile menu animation in shared component styles.
- Keep the "Link copied" label fully inside its highlighted background beside section headings.

## [0.26.1] - 2026-07-18

### Changed

- Replace workshop category icons and decorative artwork (doodles, accent marks, blobs, and wave dividers) with the official Figma element exports.
- Update visual-styles, prototype asset notes, and the category-tag spec so the new artwork and import workflow are documented.
- Add a script that normalizes Figma SVG exports for the prototype and wire category icons through the shared SVG files.

### Fixed

- Show line illustrations on the Patterns and Components pages again; those pages had been pointing at artwork files that were not in the repo.
- Place the headline underline beneath copy, stretch it to the headline width, and size the line-illustration specimen correctly in the prototype.

## [0.26.0] - 2026-07-13

### Added

- Show a `#` link beside section headings so readers can copy a direct page link and get clear "Link copied" feedback.

### Changed

- Resolve token references correctly when building CSS and the agent token spec.
- Make the optimize workflow fail clearly when the local dev server does not start.

### Fixed

- Close the mobile menu and restore page interaction when the viewport grows from phone to desktop.
- Keep search keyboard shortcuts from focusing a hidden desktop search field on mobile.
- Simplify header dropdown accessibility so it behaves like normal navigation links.

## [0.25.1] - 2026-07-13

### Changed

- Rewrite recent release notes so they read plainly again, and keep the Music category tag on pink.

### Fixed

- Put the primary and secondary action buttons back to the blue-and-orange fill style used before the last release.
- Make error form fields show a stronger red border and glow when you hover, focus, or press them.
- Tone down the orange highlight on ordinary form fields when they are focused.

## [0.25.0] - 2026-07-13

### Changed

- Document the category-tag colour mapping and note that interactive-state rules are still pending a future brand-book update.

### Fixed

- Change the Music category tag to pink with Charcoal text so alert blue is reserved for announcements only.

## [0.24.3] - 2026-07-08

### Changed

- Update prototype dependencies within their current major versions.

## [0.24.2] - 2026-07-06

### Fixed

- Improve header demo keyboard support, focus management, and ARIA for menus and search.
- Fix on-this-page current-section indication for screen readers.
- Respect reduced-motion for mobile navigation animation.

## [0.24.1] - 2026-07-06

### Changed

- Add a terminal workflow so audits can run step by step from the command line.
- Add an optimize skill that works in both the terminal and the IDE.
- Explain the terminal workflow in the agent playbook.

## [0.24.0] - 2026-07-06

### Changed

- Align IDE/CLI and Claude agent instructions so both tools get the same commands, quality rules, and release workflows.
- Document that the IDE picks up project skills from the same folder as Claude Code.
- Add a cross-tool maintenance checklist so agent files stay in sync.

## [0.23.0] - 2026-06-19

### Added

- Each colour on the Foundations page now shows its role up front so the "what is this colour for" rule is visible at a glance.

### Changed

- Redrew the workshop category icons, line illustrations, accent marks, blob shapes, and wave dividers to match the Brand Book artwork.
- Took out the No. 52 Cafe logos block, the community-group illustration, and the print asset-library contacts section.
- Added the white-space and alignment principles to the Guidelines page, and updated copy to say "non-profit social enterprise" and "designers and leaders".

### Fixed

- Search results now scroll to the exact section heading, not just the top of the page.
- Left-aligned the testimonial text, matching the rule that long body copy is never centred.

## [0.22.3] - 2026-06-19

### Fixed

- The header pattern's mobile menu now opens again, and the header switches to mobile based on the width of the panel it sits in, so it matches how it is embedded in the design system.

## [0.22.2] - 2026-06-19

### Fixed

- Space out the example header, shorten its menu and button labels, and keep each label on one line.
- Give the search box the same focus style as the form inputs instead of an outline ring.
- Show the wave shapes larger, one per row, in soft neutral greys and light green.

## [0.22.1] - 2026-06-19

### Fixed

- Give the search box the brand's own focus highlight instead of the browser's default blue outline.
- Collapse the navigation into expandable sections on phones, so the menu is short and tidy.
- Put the ForEveryone logo back into the example header and footer, and add a real, scannable QR code that opens foreveryone.berlin.
- Redraw the No. 52 Cafe logos to match the Brand Book, show wave shapes in more colours and sizes, and rename the brand page to "About & Brand".
- Point the BrowserStack link to the right page, refresh a workshop photo, and check every link still works.

## [0.22.0] - 2026-06-19

### Changed

- Add a search box to the navigation so you can jump straight to any page or section.
- Group the navigation into clear sections, led by Foundations, Components, and Patterns, so the menu is shorter and better ordered.
- Rewrite the changelog and repository description in plain language, and add a one-step release workflow.

### Fixed

- Add the four newer pages to the home overview and show three distinct workshops, each with its own photo.
- Present the example header and footer as reusable templates with placeholder content, and tidy the logo "what not to do" markers.

## [0.21.0] - 2026-06-18

### Changed

- Add a Brand & Voice page covering who we are, values, personality, and how to write in our tone.
- Add a Logo page with the approved variants, clear-space rules, background pairings, and a what-not-to-do grid.
- Add a Visual Elements page showing our icons, illustrations, accent marks, and shapes side by side.
- Add a Print & Media page that marks the line between digital and print and lists the print-only colours and assets.
- Raise body line spacing for easier reading and add a machine-readable layer so AI tools can adopt the system.

### Fixed

- Redraw the workshop icons as solid orange shapes and fix two text-contrast issues so everything reads clearly.

## [0.20.2] - 2026-06-17

## [0.20.1] - 2026-06-16

## [0.20.0] - 2026-06-16

### Changed

- Add a Motion page and a Credits page, both wired into the navigation and home overview.
- Expand the component examples with fuller button, input, tag, and icon-button states plus a richer icon gallery.
- Add brand colour variants and a more accessible keyboard-focus highlight.
- Move the colour palette to a more modern colour model with no visible change, and update dependencies for security.

### Fixed

- Stop several hover shadows from being clipped and correct the wordmark and close-icon colour.

## [0.19.2] - 2026-06-16

## [0.19.1] - 2026-06-15

## [0.19.0] - 2026-06-15

### Changed

- Add an Accessibility page with the accessibility statement, testing approach, and feedback route.
- Add an "On this page" contents rail that follows along as you scroll, on wider screens.
- Add an automated accessibility check that runs over the key pages.

### Fixed

- Make the primary button blue with an orange hover, and fix several text-contrast issues.
- Make the events filter and mobile navigation work correctly for keyboard and screen-reader users.

## [0.18.0] - 2026-06-12

## [0.17.0] - 2026-06-10

## [0.16.0] - 2026-06-10

### Changed

- Animate the mobile navigation panel and hamburger toggle, respecting reduced-motion settings.
- Add a copy button to the token code blocks with a brief "Copied" confirmation.
- Add a GitHub link to the footer and make the "at a glance" stats count up on scroll.

### Fixed

- Replace the underline graphic with a crisp version and fix a few screen-reader announcements.

## [0.15.0] - 2026-06-09

### Changed

- Add full light-to-dark colour ramps for the five brand families with labelled swatches.
- Add brand line illustrations and a sketched headline underline.
- Add an Upcoming Events pattern and a button-state overview on the Components page.
- Reorganise the prototype into Foundations, Components, Patterns, Guidelines, and Governance.

### Fixed

- Render headlines in a single charcoal colour, keeping orange decorative-only to match the live site.

## [0.14.0] - 2026-06-04

### Changed

- Add a screenshot tool for desktop, tablet, and mobile visual checks.

## [0.13.3] - 2026-06-02

### Changed

- Fix build scripts so they run reliably on Windows and from a fresh checkout.

## [0.13.2] - 2026-06-02

### Changed

- Expand the changelog writing guidance.

## [0.13.1] - 2026-05-22

### Changed

- Add automated cross-browser checks across major desktop and mobile browsers.

## [0.13.0] - 2026-05-22

### Changed

- Create GitHub Releases automatically from the changelog when a version is tagged.

## [0.12.0] - 2026-05-21

### Changed

- Add purpose-named colour roles for backgrounds and accents.
- Add a filled category-icon system and a colour-combinations example showing the valid and disallowed pairings.
- Add logo-usage and colour-audit documentation.

### Fixed

- Retire orange-on-white text pairings that fail contrast, in favour of charcoal labels.

## [0.11.1] - 2026-05-21

## [0.11.0] - 2026-05-15

### Changed

- Add the AI-agent documentation layout, the project licence, and automated build-and-test checks.

## [0.10.0] - 2026-05-01

### Changed

- Add the AI-agent documentation layout and the project licence.

## [0.9.1] - 2026-03-30

## [0.9.0] - 2026-03-27

## [0.8.0] - 2026-03-23

### Changed

- Add an interactive header with an animated hamburger, slide-down mobile menu, and desktop dropdowns.
- Add fade transitions between pages and a "View Patterns" call to action on the homepage.

### Fixed

- Replace placeholder colours with the real site palette and reorder the swatches light to dark.
- Make the footer and header stack cleanly on narrow screens.

## [0.7.0] - 2026-03-20

### Changed

- Add a testimonial card and a contact-form popup.
- Add syntax highlighting to the token code blocks.

## [0.6.0] - 2026-03-20

### Changed

- Add separate Tokens, Components, and Patterns pages alongside the home overview.
- Add a sticky desktop sidebar and a mobile hamburger menu that highlight the current page.
- Add a shared layout with a persistent footer and an overview page with hero, stats, and cards.

## [0.5.1] - 2026-03-16

## [0.5.0] - 2026-03-16

### Changed

- Add icon and play buttons, an FAQ accordion, a dropdown, header and footer, a workshop card, category tags, and input states.
- Add more spacing steps to the layout grid.
- Generate full colour, spacing, and font-size values from the tokens.

## [0.4.0] - 2026-03-12

### Changed

- Add the hero, mission, and stats content and the supporting images.
- Add radius, shadow, and motion demos, icons, a wave section, and a footer.

## [0.3.1] - 2026-03-12

## [0.3.0] - 2026-03-12

### Changed

- Document and automate the pull-request and merge workflow.

## [0.2.0] - 2026-03-12

### Changed

- Add the first prototype with buttons, cards, a form, chips, a blockquote, and a hero.

## [0.1.0] - 2026-03-12

### Changed

- Set up the design tokens, generated CSS, Elementor documentation, a Figma sync guide, and contributing guides.
