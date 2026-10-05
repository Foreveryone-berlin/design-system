# Changelog

- **Format:** Based on [Keep a Changelog](https://keepachangelog.com).
- **Voice:** Use the imperative, like a commit message. Write add, fix, increase, force, not added, fixed, increased, forced.
- **Length:** Keep each bullet on one line, max 120 characters (link URLs do not count toward the cap, only the visible text does).
- **Links:** Add inline markdown links for related PRs, docs, and external references when they help the reader.
- **Audience:** Non-developer stakeholders (designers and leaders). Write so a reader who does not touch code can tell what changed.

## [Unreleased]

### Changed

- Adopt the October 2026 colour palette and its usage rules ([colour audit](docs/color-audit-2026.md)).
- Return Warm White to #FDFCF7 and Lime Green to #D4E6A8, matching the Canva Brand Kit.
- Change Yellow to #FFD84D and limit it to decorative marks on Navy or Teal.
- Take Orange off links, tags, dropdowns, and resting button fills.
- Bring Orange back on buttons: hover and pressed fills, the Orange outline button, and the filled icon button.
- Use Pink #FADCD2 for tag, chip, and active-item tints that used light orange.
- Use Warm White instead of white for page and header backgrounds.
- Let Blue be used freely on digital surfaces, no longer only for announcements.
- Mark colours outside the new palette as pending Brand Book v2.0.

## [1.10.1] - 2026-10-04

### Changed

- Pin the local Node version to the 24 major, matching the project's engines field ([#196](https://github.com/Foreveryone-berlin/design-system/pull/196)).

## [1.10.0] - 2026-10-01

### Added

- Record which existing greys stand in for the two unmatched text greys in the Figma page designs ([#192](https://github.com/Foreveryone-berlin/design-system/pull/192)).
- The "Co-funded by the European Union" badge as an interim image, with its source and usage rules recorded ([#192](https://github.com/Foreveryone-berlin/design-system/pull/192)).

### Changed

- Show page and section headings at the smaller Figma mobile sizes on phones, switching to the full desktop sizes on tablets and up ([#192](https://github.com/Foreveryone-berlin/design-system/pull/192)).
- Use "Book workshop" as the one booking button label everywhere, and keep the WhatsApp button in the same neutral style as the other social buttons ([#192](https://github.com/Foreveryone-berlin/design-system/pull/192)).

## [1.9.1] - 2026-09-29

### Changed

- Rename the installable guides and the prototype page to agent skills, and send visitors from the old page address to the [agent skills page](https://design.foreveryone.berlin/agent-skills) ([#189](https://github.com/Foreveryone-berlin/design-system/pull/189)).

## [1.9.0] - 2026-09-28

### Added

- Guides for AI agents that build or restyle UI with this system, installable from a clone or readable on the [live site](https://design.foreveryone.berlin/agent-skills) ([#184](https://github.com/Foreveryone-berlin/design-system/pull/184)).

## [1.8.4] - 2026-09-24

### Added

- Record where the workshop and music icons the team uses in Canva come from, and why they cannot be brought into the system as they stand ([#181](https://github.com/Foreveryone-berlin/design-system/pull/181)).

### Changed

- Flag the Canva elements library and the shared Drive folder as working libraries rather than sources the system imports from ([#181](https://github.com/Foreveryone-berlin/design-system/pull/181)).
- Update prototype dependencies within their current major versions ([#181](https://github.com/Foreveryone-berlin/design-system/pull/181)).

## [1.8.3] - 2026-09-22

### Changed

- Clarify the project’s setup guidance, contributor credits, and licence terms ([#179](https://github.com/Foreveryone-berlin/design-system/pull/179)).
- Block search crawlers and AI tools from accessing the internal prototype ([#179](https://github.com/Foreveryone-berlin/design-system/pull/179)).

### Fixed

- Keep the prototype FAQ accordion responsive when it is opened and closed quickly on mobile Safari ([#179](https://github.com/Foreveryone-berlin/design-system/pull/179)).

## [1.8.2] - 2026-09-22

### Fixed

- Use the circled ForEveryone mark for browser and installed-app icons ([#177](https://github.com/Foreveryone-berlin/design-system/pull/177)).

## [1.8.1] - 2026-09-17

### Fixed

- Restore the No. 52 Cafe naming, logo, and cafe-signs guidance to the live design system ([#173](https://github.com/Foreveryone-berlin/design-system/pull/173)).

## [1.8.0] - 2026-09-14

### Added

- The newsletter popup's megaphone as a scalable vector, catalogued with the other functional doodles ([#167](https://github.com/Foreveryone-berlin/design-system/pull/167)).

### Changed

- Retire the No. 52 Cafe naming, logo, and cafe-signs guidance from the design system, keeping a dated archive for signage still in circulation ([#167](https://github.com/Foreveryone-berlin/design-system/pull/167)).
- Show the accent marks, social icons, and UI glyphs larger in the Visual Elements catalog, so each one is legible at a glance ([#167](https://github.com/Foreveryone-berlin/design-system/pull/167)).
- Tighten the Visual Elements introduction ([#167](https://github.com/Foreveryone-berlin/design-system/pull/167)).
- Reframe the blob-masked hero photo so the hard wall edge on its right no longer cuts across the shape ([#167](https://github.com/Foreveryone-berlin/design-system/pull/167)).

## [1.7.2] - 2026-09-13

### Changed

- Space out the “On this page” entries on small screens so they are easier to read and tap ([#164](https://github.com/Foreveryone-berlin/design-system/pull/164)).

## [1.7.1] - 2026-09-12

### Added

- Credit Unsplash for the prototype photographs on the Credits page and under every photo specimen (home, hero pattern, and workshop cards) ([#162](https://github.com/Foreveryone-berlin/design-system/pull/162)).

### Changed

- Mask the home and pattern hero photos with the design-system blob shape, at a larger size so the crop reads clearly ([#162](https://github.com/Foreveryone-berlin/design-system/pull/162)).

### Fixed

- Show an “On this page” menu on small screens so in-page sections stay reachable when the side rail is hidden ([#162](https://github.com/Foreveryone-berlin/design-system/pull/162)).

## [1.7.0] - 2026-09-12

### Added

- Record the photographer, source, and licence for each photograph, and set the rule that a picture may not enter the design system without one ([#159](https://github.com/Foreveryone-berlin/design-system/pull/159)).

### Changed

- Replace every photograph in the prototype with licensed stock, so the home page and the pattern examples only ever show pictures we hold clear rights to use ([#159](https://github.com/Foreveryone-berlin/design-system/pull/159)).

## [1.6.0] - 2026-09-09

### Changed

- Name the browser-testing tools we actually use on the credits and accessibility pages ([#156](https://github.com/Foreveryone-berlin/design-system/pull/156)).
- Take the thin grey outline off the header card at the top of the project page, so the artwork sits on the page unframed again ([#156](https://github.com/Foreveryone-berlin/design-system/pull/156)).
- Move the prototype onto the current version of its web framework, keeping the preview site on supported software ([#156](https://github.com/Foreveryone-berlin/design-system/pull/156)).

### Fixed

- Give the site header the drop shadow the design file specifies, so it lifts off the page the way the design shows instead of sitting almost flat ([#156](https://github.com/Foreveryone-berlin/design-system/pull/156)).

## [1.5.0] - 2026-09-08

### Added

- Add a testimonial slider that shows one short quote at a time, with dots to move between them; it can be swiped, scrolled, or driven from the keyboard ([#139](https://github.com/Foreveryone-berlin/design-system/pull/139)).
- Add a centred display style for short testimonials, with the quote mark above the text, alongside the existing left-aligned card ([#139](https://github.com/Foreveryone-berlin/design-system/pull/139)).
- Publish the testimonial as a documented component so other sites can use it, not just the prototype preview ([#139](https://github.com/Foreveryone-berlin/design-system/pull/139)).

## [1.4.1] - 2026-09-07

### Changed

- Frame the system as platform-neutral; move host-platform material under integrations and stop naming host slots in shared tokens and preview copy ([#131](https://github.com/Foreveryone-berlin/design-system/pull/131)).

## [1.4.0] - 2026-09-03

### Added

- Bring eight new colours from the 2026 brand board into the token set: Deep Teal, Magenta, Navy, Blush, Yellow, Red, and two warm greys ([#126](https://github.com/Foreveryone-berlin/design-system/pull/126)).
- Show the new 2026 palette colours as swatches on Foundations and list their approved background + text pairings ([#126](https://github.com/Foreveryone-berlin/design-system/pull/126)).
- Ship the doodle Belonging Guide share card so the live funnel pages can use the approved 1200×630 artwork ([#126](https://github.com/Foreveryone-berlin/design-system/pull/126)).

### Fixed

- Correct Warm White and Lime Green hex values to match the 2026 palette on the brand board (#FDFCF6, #D4E6AB) ([#126](https://github.com/Foreveryone-berlin/design-system/pull/126)).

## [1.3.1] - 2026-08-19

### Fixed

- Turn the connecting arrows in the week-by-week step sequence the right way round, so they lead down from the first step to the next, and give them space so they no longer touch the boxes ([#122](https://github.com/Foreveryone-berlin/design-system/pull/122)).

## [1.3.0] - 2026-08-18

### Added

- Show a team roster layout on Patterns, with a round portrait, a name, and a role, four across on desktop and stacking down to one on a phone ([#119](https://github.com/Foreveryone-berlin/design-system/pull/119)).
- Show the same person block as a card with a short bio, the way facilitators are introduced on a course page ([#119](https://github.com/Foreveryone-berlin/design-system/pull/119)).
- Ship five generic portrait placeholders so the new layouts can be documented without putting anyone's photo in the design system ([#119](https://github.com/Foreveryone-berlin/design-system/pull/119)).

### Changed

- Bring the pattern catalog back in line with the Patterns page and note that names in these layouts stay charcoal, because orange is decorative only and too light for readable text ([#119](https://github.com/Foreveryone-berlin/design-system/pull/119)).

## [1.2.0] - 2026-08-17

### Changed

- Show three course-page layouts from the live workshop pages on Patterns (a facts card, a week-by-week step sequence, and a split list band) and drop the six-point benefit grid; the benefit card stays available for the live site ([#116](https://github.com/Foreveryone-berlin/design-system/pull/116)).
- Give the repository a new share card, so GitHub and link previews show the ForEveryone headline on the lime doodle artwork ([#116](https://github.com/Foreveryone-berlin/design-system/pull/116)).
- Refresh the prototype's underlying libraries and clear every known security advisory ([#116](https://github.com/Foreveryone-berlin/design-system/pull/116)).

### Removed

- Drop Cursor and Claude Code from the Credits “Built with” list so the public site does not attribute agents as product contributors ([#116](https://github.com/Foreveryone-berlin/design-system/pull/116)).

### Fixed

- Make every icon, illustration, accent, blob, and wave in Visual Elements save with a single click, in its brand colour instead of black, and drop the GitHub links that used to hand people a web page instead of a working file ([#116](https://github.com/Foreveryone-berlin/design-system/pull/116)).
- Stack the workshop facts card and the impact numbers into fewer columns as soon as the space around them is narrow, so values stop being cut off ([#116](https://github.com/Foreveryone-berlin/design-system/pull/116)).

## [1.1.0] - 2026-07-30

### Added

- Ship live pattern specimens for stats, benefit cards, and the events and workshops switcher, and add direct GitHub browse links for illustration and accent sets in Visual Elements ([#113](https://github.com/Foreveryone-berlin/design-system/pull/113)).

### Changed

- Refresh the homepage and pattern hero with the new Community Cafe imagery, responsive headline sizing, and a headline-width sketched underline ([#113](https://github.com/Foreveryone-berlin/design-system/pull/113)).
- Reorganize the Visual Elements and Components icon documentation so functional icon families stay separate from illustrations and decorative assets ([#113](https://github.com/Foreveryone-berlin/design-system/pull/113)).

### Fixed

- Unify prototype icon rendering under one shared icon component and restore category, workshop, line-illustration, and decorative SVG masks so every set renders reliably ([#113](https://github.com/Foreveryone-berlin/design-system/pull/113)).
- Improve workshop-card responsiveness and related navigation polish so mobile controls, badges, labels, and actions stay readable and distinct ([#113](https://github.com/Foreveryone-berlin/design-system/pull/113)).
- Restore heading-link feedback, browser-back behavior, syntax highlighting, and accessibility coverage so navigation and documentation interactions stay stable across browsers ([#113](https://github.com/Foreveryone-berlin/design-system/pull/113)).

## [1.0.0] - 2026-07-18 🎉

### Changed

- Refresh the Credits page so design-system contributors are listed by name and role ([#110](https://github.com/Foreveryone-berlin/design-system/pull/110)).

### Fixed

- Match button documentation states to the current primary and secondary button behavior in the prototype ([#110](https://github.com/Foreveryone-berlin/design-system/pull/110)).
- Respect reduced-motion preferences for accordion and mobile menu animation in shared component styles ([#110](https://github.com/Foreveryone-berlin/design-system/pull/110)).
- Keep the "Link copied" label fully inside its highlighted background beside section headings ([#110](https://github.com/Foreveryone-berlin/design-system/pull/110)).

## [0.26.1] - 2026-07-18

### Changed

- Replace workshop category icons and decorative artwork (doodles, accent marks, blobs, and wave dividers) with the official Figma element exports ([#106](https://github.com/Foreveryone-berlin/design-system/pull/106)).
- Update visual-styles, prototype asset notes, and the category-tag spec so the new artwork and import workflow are documented ([#106](https://github.com/Foreveryone-berlin/design-system/pull/106)).
- Add a script that normalizes Figma SVG exports for the prototype and wire category icons through the shared SVG files ([#106](https://github.com/Foreveryone-berlin/design-system/pull/106)).

### Fixed

- Show line illustrations on the Patterns and Components pages again; those pages had been pointing at artwork files that were not in the repo ([#106](https://github.com/Foreveryone-berlin/design-system/pull/106)).
- Place the headline underline beneath copy, stretch it to the headline width, and size the line-illustration specimen correctly in the prototype ([#106](https://github.com/Foreveryone-berlin/design-system/pull/106)).

## [0.26.0] - 2026-07-13

### Added

- Show a `#` link beside section headings so readers can copy a direct page link and get clear "Link copied" feedback ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).

### Changed

- Resolve token references correctly when building CSS and the agent token spec ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).
- Make the optimize workflow fail clearly when the local dev server does not start ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).

### Fixed

- Close the mobile menu and restore page interaction when the viewport grows from phone to desktop ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).
- Keep search keyboard shortcuts from focusing a hidden desktop search field on mobile ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).
- Simplify header dropdown accessibility so it behaves like normal navigation links ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).

## [0.25.1] - 2026-07-13

### Changed

- Rewrite recent release notes so they read plainly again, and keep the Music category tag on pink ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).

### Fixed

- Put the primary and secondary action buttons back to the blue-and-orange fill style used before the last release ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).
- Make error form fields show a stronger red border and glow when you hover, focus, or press them ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).
- Tone down the orange highlight on ordinary form fields when they are focused ([#103](https://github.com/Foreveryone-berlin/design-system/pull/103)).

## [0.25.0] - 2026-07-13

### Changed

- Document the category-tag colour mapping and note that interactive-state rules are still pending a future brand-book update ([#101](https://github.com/Foreveryone-berlin/design-system/pull/101)).

### Fixed

- Change the Music category tag to pink with Charcoal text so alert blue is reserved for announcements only ([#101](https://github.com/Foreveryone-berlin/design-system/pull/101)).

## [0.24.3] - 2026-07-08

### Changed

- Update prototype dependencies within their current major versions ([#99](https://github.com/Foreveryone-berlin/design-system/pull/99)).

## [0.24.2] - 2026-07-06

### Fixed

- Improve header demo keyboard support, focus management, and ARIA for menus and search ([#97](https://github.com/Foreveryone-berlin/design-system/pull/97)).
- Fix on-this-page current-section indication for screen readers ([#97](https://github.com/Foreveryone-berlin/design-system/pull/97)).
- Respect reduced-motion for mobile navigation animation ([#97](https://github.com/Foreveryone-berlin/design-system/pull/97)).

## [0.24.1] - 2026-07-06

### Changed

- Add a terminal workflow so audits can run step by step from the command line ([#93](https://github.com/Foreveryone-berlin/design-system/pull/93)).
- Add an optimize skill that works in both the terminal and the IDE ([#93](https://github.com/Foreveryone-berlin/design-system/pull/93)).
- Explain the terminal workflow in the agent playbook ([#93](https://github.com/Foreveryone-berlin/design-system/pull/93)).

## [0.24.0] - 2026-07-06

### Changed

- Align IDE/CLI and Claude agent instructions so both tools get the same commands, quality rules, and release workflows ([#91](https://github.com/Foreveryone-berlin/design-system/pull/91)).
- Document that the IDE picks up project skills from the same folder as Claude Code ([#91](https://github.com/Foreveryone-berlin/design-system/pull/91)).
- Add a cross-tool maintenance checklist so agent files stay in sync ([#91](https://github.com/Foreveryone-berlin/design-system/pull/91)).

## [0.23.0] - 2026-06-19

### Added

- Each colour on the Foundations page now shows its role up front so the "what is this colour for" rule is visible at a glance ([#89](https://github.com/Foreveryone-berlin/design-system/pull/89)).

### Changed

- Redrew the workshop category icons, line illustrations, accent marks, blob shapes, and wave dividers to match the Brand Book artwork ([#89](https://github.com/Foreveryone-berlin/design-system/pull/89)).
- Took out the No. 52 Cafe logos block, the community-group illustration, and the print asset-library contacts section ([#89](https://github.com/Foreveryone-berlin/design-system/pull/89)).
- Added the white-space and alignment principles to the Guidelines page, and updated copy to say "non-profit social enterprise" and "designers and leaders" ([#89](https://github.com/Foreveryone-berlin/design-system/pull/89)).

### Fixed

- Search results now scroll to the exact section heading, not just the top of the page ([#89](https://github.com/Foreveryone-berlin/design-system/pull/89)).
- Left-aligned the testimonial text, matching the rule that long body copy is never centred ([#89](https://github.com/Foreveryone-berlin/design-system/pull/89)).

## [0.22.3] - 2026-06-19

### Fixed

- The header pattern's mobile menu now opens again, and the header switches to mobile based on the width of the panel it sits in, so it matches how it is embedded in the design system ([#87](https://github.com/Foreveryone-berlin/design-system/pull/87)).

## [0.22.2] - 2026-06-19

### Fixed

- Space out the example header, shorten its menu and button labels, and keep each label on one line ([#85](https://github.com/Foreveryone-berlin/design-system/pull/85)).
- Give the search box the same focus style as the form inputs instead of an outline ring ([#85](https://github.com/Foreveryone-berlin/design-system/pull/85)).
- Show the wave shapes larger, one per row, in soft neutral greys and light green ([#85](https://github.com/Foreveryone-berlin/design-system/pull/85)).

## [0.22.1] - 2026-06-19

### Fixed

- Give the search box the brand's own focus highlight instead of the browser's default blue outline ([#83](https://github.com/Foreveryone-berlin/design-system/pull/83)).
- Collapse the navigation into expandable sections on phones, so the menu is short and tidy ([#83](https://github.com/Foreveryone-berlin/design-system/pull/83)).
- Put the ForEveryone logo back into the example header and footer, and add a real, scannable QR code that opens foreveryone.berlin ([#83](https://github.com/Foreveryone-berlin/design-system/pull/83)).
- Redraw the No. 52 Cafe logos to match the Brand Book, show wave shapes in more colours and sizes, and rename the brand page to "About & Brand" ([#83](https://github.com/Foreveryone-berlin/design-system/pull/83)).
- Point the BrowserStack link to the right page, refresh a workshop photo, and check every link still works ([#83](https://github.com/Foreveryone-berlin/design-system/pull/83)).

## [0.22.0] - 2026-06-19

### Changed

- Add a search box to the navigation so you can jump straight to any page or section ([#81](https://github.com/Foreveryone-berlin/design-system/pull/81)).
- Group the navigation into clear sections, led by Foundations, Components, and Patterns, so the menu is shorter and better ordered ([#81](https://github.com/Foreveryone-berlin/design-system/pull/81)).
- Rewrite the changelog and repository description in plain language, and add a one-step release workflow ([#81](https://github.com/Foreveryone-berlin/design-system/pull/81)).

### Fixed

- Add the four newer pages to the home overview and show three distinct workshops, each with its own photo ([#81](https://github.com/Foreveryone-berlin/design-system/pull/81)).
- Present the example header and footer as reusable templates with placeholder content, and tidy the logo "what not to do" markers ([#81](https://github.com/Foreveryone-berlin/design-system/pull/81)).

## [0.21.0] - 2026-06-18

### Changed

- Add a Brand & Voice page covering who we are, values, personality, and how to write in our tone ([#79](https://github.com/Foreveryone-berlin/design-system/pull/79)).
- Add a Logo page with the approved variants, clear-space rules, background pairings, and a what-not-to-do grid ([#79](https://github.com/Foreveryone-berlin/design-system/pull/79)).
- Add a Visual Elements page showing our icons, illustrations, accent marks, and shapes side by side ([#79](https://github.com/Foreveryone-berlin/design-system/pull/79)).
- Add a Print & Media page that marks the line between digital and print and lists the print-only colours and assets ([#79](https://github.com/Foreveryone-berlin/design-system/pull/79)).
- Raise body line spacing for easier reading and add a machine-readable layer so AI tools can adopt the system ([#79](https://github.com/Foreveryone-berlin/design-system/pull/79)).

### Fixed

- Redraw the workshop icons as solid orange shapes and fix two text-contrast issues so everything reads clearly ([#79](https://github.com/Foreveryone-berlin/design-system/pull/79)).

## [0.20.2] - 2026-06-17

## [0.20.1] - 2026-06-16

## [0.20.0] - 2026-06-16

### Changed

- Add a Motion page and a Credits page, both wired into the navigation and home overview ([#61](https://github.com/Foreveryone-berlin/design-system/pull/61)).
- Expand the component examples with fuller button, input, tag, and icon-button states plus a richer icon gallery ([#61](https://github.com/Foreveryone-berlin/design-system/pull/61)).
- Add brand colour variants and a more accessible keyboard-focus highlight ([#61](https://github.com/Foreveryone-berlin/design-system/pull/61)).
- Move the colour palette to a more modern colour model with no visible change, and update dependencies for security ([#61](https://github.com/Foreveryone-berlin/design-system/pull/61)).

### Fixed

- Stop several hover shadows from being clipped and correct the wordmark and close-icon colour ([#61](https://github.com/Foreveryone-berlin/design-system/pull/61)).

## [0.19.2] - 2026-06-16

## [0.19.1] - 2026-06-15

## [0.19.0] - 2026-06-15

### Changed

- Add an Accessibility page with the accessibility statement, testing approach, and feedback route ([#54](https://github.com/Foreveryone-berlin/design-system/pull/54)).
- Add an "On this page" contents rail that follows along as you scroll, on wider screens ([#54](https://github.com/Foreveryone-berlin/design-system/pull/54)).
- Add an automated accessibility check that runs over the key pages ([#54](https://github.com/Foreveryone-berlin/design-system/pull/54)).

### Fixed

- Make the primary button blue with an orange hover, and fix several text-contrast issues ([#54](https://github.com/Foreveryone-berlin/design-system/pull/54)).
- Make the events filter and mobile navigation work correctly for keyboard and screen-reader users ([#54](https://github.com/Foreveryone-berlin/design-system/pull/54)).

## [0.18.0] - 2026-06-12

## [0.17.0] - 2026-06-10

## [0.16.0] - 2026-06-10

### Changed

- Animate the mobile navigation panel and hamburger toggle, respecting reduced-motion settings ([#37](https://github.com/Foreveryone-berlin/design-system/pull/37)).
- Add a copy button to the token code blocks with a brief "Copied" confirmation ([#37](https://github.com/Foreveryone-berlin/design-system/pull/37)).
- Add a GitHub link to the footer and make the "at a glance" stats count up on scroll ([#37](https://github.com/Foreveryone-berlin/design-system/pull/37)).

### Fixed

- Replace the underline graphic with a crisp version and fix a few screen-reader announcements ([#37](https://github.com/Foreveryone-berlin/design-system/pull/37)).

## [0.15.0] - 2026-06-09

### Changed

- Add full light-to-dark colour ramps for the five brand families with labelled swatches ([#29](https://github.com/Foreveryone-berlin/design-system/pull/29)).
- Add brand line illustrations and a sketched headline underline ([#29](https://github.com/Foreveryone-berlin/design-system/pull/29)).
- Add an Upcoming Events pattern and a button-state overview on the Components page ([#29](https://github.com/Foreveryone-berlin/design-system/pull/29)).
- Reorganise the prototype into Foundations, Components, Patterns, Guidelines, and Governance ([#29](https://github.com/Foreveryone-berlin/design-system/pull/29)).

### Fixed

- Render headlines in a single charcoal colour, keeping orange decorative-only to match the live site ([#29](https://github.com/Foreveryone-berlin/design-system/pull/29)).

## [0.14.0] - 2026-06-04

### Changed

- Add a screenshot tool for desktop, tablet, and mobile visual checks ([#29](https://github.com/Foreveryone-berlin/design-system/pull/29)).

## [0.13.3] - 2026-06-02

### Changed

- Fix build scripts so they run reliably on Windows and from a fresh checkout ([#21](https://github.com/Foreveryone-berlin/design-system/pull/21)).

## [0.13.2] - 2026-06-02

### Changed

- Expand the changelog writing guidance ([#21](https://github.com/Foreveryone-berlin/design-system/pull/21)).

## [0.13.1] - 2026-05-22

### Changed

- Add automated cross-browser checks across major desktop and mobile browsers ([#21](https://github.com/Foreveryone-berlin/design-system/pull/21)).

## [0.13.0] - 2026-05-22

### Changed

- Create GitHub Releases automatically from the changelog when a version is tagged ([#21](https://github.com/Foreveryone-berlin/design-system/pull/21)).

## [0.12.0] - 2026-05-21

### Changed

- Add purpose-named colour roles for backgrounds and accents ([#20](https://github.com/Foreveryone-berlin/design-system/pull/20)).
- Add a filled category-icon system and a colour-combinations example showing the valid and disallowed pairings ([#20](https://github.com/Foreveryone-berlin/design-system/pull/20)).
- Add logo-usage and colour-audit documentation ([#20](https://github.com/Foreveryone-berlin/design-system/pull/20)).

### Fixed

- Retire orange-on-white text pairings that fail contrast, in favour of charcoal labels ([#20](https://github.com/Foreveryone-berlin/design-system/pull/20)).

## [0.11.1] - 2026-05-21

## [0.11.0] - 2026-05-15

### Changed

- Add the AI-agent documentation layout, the project licence, and automated build-and-test checks ([#18](https://github.com/Foreveryone-berlin/design-system/pull/18)).

## [0.10.0] - 2026-05-01

### Changed

- Add the AI-agent documentation layout and the project licence ([#10](https://github.com/Foreveryone-berlin/design-system/pull/10)).

## [0.9.1] - 2026-03-30

## [0.9.0] - 2026-03-27

## [0.8.0] - 2026-03-23

### Changed

- Add an interactive header with an animated hamburger, slide-down mobile menu, and desktop dropdowns ([#10](https://github.com/Foreveryone-berlin/design-system/pull/10)).
- Add fade transitions between pages and a "View Patterns" call to action on the homepage ([#10](https://github.com/Foreveryone-berlin/design-system/pull/10)).

### Fixed

- Replace placeholder colours with the real site palette and reorder the swatches light to dark ([#10](https://github.com/Foreveryone-berlin/design-system/pull/10)).
- Make the footer and header stack cleanly on narrow screens ([#10](https://github.com/Foreveryone-berlin/design-system/pull/10)).

## [0.7.0] - 2026-03-20

### Changed

- Add a testimonial card and a contact-form popup ([#10](https://github.com/Foreveryone-berlin/design-system/pull/10)).
- Add syntax highlighting to the token code blocks ([#10](https://github.com/Foreveryone-berlin/design-system/pull/10)).

## [0.6.0] - 2026-03-20

### Changed

- Add separate Tokens, Components, and Patterns pages alongside the home overview ([#9](https://github.com/Foreveryone-berlin/design-system/pull/9)).
- Add a sticky desktop sidebar and a mobile hamburger menu that highlight the current page ([#9](https://github.com/Foreveryone-berlin/design-system/pull/9)).
- Add a shared layout with a persistent footer and an overview page with hero, stats, and cards ([#9](https://github.com/Foreveryone-berlin/design-system/pull/9)).

## [0.5.1] - 2026-03-16

## [0.5.0] - 2026-03-16

### Changed

- Add icon and play buttons, an FAQ accordion, a dropdown, header and footer, a workshop card, category tags, and input states ([#4](https://github.com/Foreveryone-berlin/design-system/pull/4)).
- Add more spacing steps to the layout grid ([#4](https://github.com/Foreveryone-berlin/design-system/pull/4)).
- Generate full colour, spacing, and font-size values from the tokens ([#4](https://github.com/Foreveryone-berlin/design-system/pull/4)).

## [0.4.0] - 2026-03-12

### Changed

- Add the hero, mission, and stats content and the supporting images ([#3](https://github.com/Foreveryone-berlin/design-system/pull/3)).
- Add radius, shadow, and motion demos, icons, a wave section, and a footer ([#3](https://github.com/Foreveryone-berlin/design-system/pull/3)).

## [0.3.1] - 2026-03-12

## [0.3.0] - 2026-03-12

### Changed

- Document and automate the pull-request and merge workflow ([#3](https://github.com/Foreveryone-berlin/design-system/pull/3)).

## [0.2.0] - 2026-03-12

### Changed

- Add the first prototype with buttons, cards, a form, chips, a blockquote, and a hero ([#3](https://github.com/Foreveryone-berlin/design-system/pull/3)).

## [0.1.0] - 2026-03-12

### Changed

- Set up the design tokens, generated CSS, Elementor documentation, a Figma sync guide, and contributing guides.
