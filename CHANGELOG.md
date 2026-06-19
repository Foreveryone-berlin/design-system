# Changelog

**Format:** Based on [Keep a Changelog](https://keepachangelog.com).

**Audience:** Non-developer stakeholders (designers, managers). Write so a reader who does not touch code can tell what changed.

**Standard:** At most 6 bullets per release, one plain sentence each. Keep the imperative voice (add, fix, raise) and the date on each version. No file paths, token IDs, or build/CI mechanics in the visible list.

## [Unreleased]

## [0.22.2] - 2026-06-19

Small visual fixes after 0.22.1.

- **Fix**: Space out the example header, shorten its menu and button labels, and keep each label on one line.
- **Fix**: Give the search box the same focus style as the form inputs (an orange border and soft glow) instead of an outline ring.
- **Fix**: Show the wave shapes larger, one per row, in soft neutral greys and light green.

## [0.22.1] - 2026-06-19

Polish pass after the Clarity release: small fixes across search, navigation, and the brand assets.

- **Fix**: Give the search box the brand's own focus highlight instead of the browser's default blue outline.
- **Fix**: Collapse the navigation into expandable sections on phones, so the menu is short and tidy.
- **Fix**: Put the ForEveryone logo back into the example header and footer, and add a real, scannable QR code that opens foreveryone.berlin.
- **Fix**: Redraw the No. 52 Cafe logos to match the Brand Book, show wave shapes in more colours and sizes, and rename the brand page to "About & Brand".
- **Fix**: Point the BrowserStack link to the right page, refresh a workshop photo, and check every link still works.

## [0.22.0] - 2026-06-19

The "Clarity" release: make what already exists easy to find, easy to read, and clear.

- **New**: Add a search box to the navigation so you can jump straight to any page or section.
- **New**: Group the navigation into clear sections, led by Foundations, Components, and Patterns, so the menu is shorter and better ordered.
- **Fix**: Add the four newer pages to the home overview and show three distinct workshops, each with its own photo.
- **Fix**: Present the example header and footer as reusable templates with placeholder content, and tidy the logo "what not to do" markers.
- **Behind the scenes**: Rewrite the changelog and repository description in plain language, and add a one-step release workflow.

## [0.21.0] - 2026-06-18

Bring the ForEveryone Brand Book v1.0 into the digital design system, with new pages for brand voice, logo, visual elements, and print.

- **New**: Add a Brand & Voice page covering who we are, values, personality, and how to write in our tone.
- **New**: Add a Logo page with the approved variants, clear-space rules, background pairings, and a what-not-to-do grid.
- **New**: Add a Visual Elements page showing our icons, illustrations, accent marks, and shapes side by side.
- **New**: Add a Print & Media page that marks the line between digital and print and lists the print-only colours and assets.
- **Fix**: Redraw the workshop icons as solid orange shapes and fix two text-contrast issues so everything reads clearly.
- **Behind the scenes**: Raise body line spacing for easier reading and add a machine-readable layer so AI tools can adopt the system.

## [0.20.2] - 2026-06-17

Tidy up navigation and button styling across the prototype.

- Fold the Motion content into Foundations and drop the standalone Motion page.
- Use the animated hamburger toggle for the mobile navigation.
- Make the button sizes consistent across all variants.
- Simplify the menu hover so labels turn orange instead of growing an underline.
- Enlarge the site logo slightly in the sidebar and mobile header.

## [0.20.1] - 2026-06-16

Group the Components page and refine focus and hover styling.

- Group the Components page into labelled categories with a contents outline.
- Show all four button variants together in the button matrix.
- Fix the card hover shadow being clipped and close the header dropdown on an outside click.
- Refine the keyboard-focus styling so each control highlights in its own colour.
- Tidy hover effects on menu links and remove a few unused illustrations and links.

## [0.20.0] - 2026-06-16

Add Motion and Credits pages, expand the component examples, and modernise the colour and focus system.

- **New**: Add a Motion page and a Credits page, both wired into the navigation and home overview.
- **New**: Expand the component examples with fuller button, input, tag, and icon-button states plus a richer icon gallery.
- **New**: Add brand colour variants and a more accessible keyboard-focus highlight.
- **Fix**: Stop several hover shadows from being clipped and correct the wordmark and close-icon colour.
- **Behind the scenes**: Move the colour palette to a more modern colour model with no visible change, and update dependencies for security.

## [0.19.2] - 2026-06-16

Fix keyboard-focus and layout details for accessibility.

- Give every control a clear keyboard-focus outline that meets accessibility contrast rules.
- Fix the primary button so its focus state no longer shows white text on orange.
- Cap the events grid at two columns on laptops, widening only on very large screens.
- Update and lightly protect the footer contact address.

## [0.19.1] - 2026-06-15

Fix navigation and reading-width details.

- Add the Accessibility page to the mobile navigation to match the sidebar.
- Hide the "On this page" rail on the homepage and place it neatly beside the content elsewhere.
- Cap the reading width for comfort, widening it on very large screens.
- Shrink and simplify the "Book a Workshop" and "Subscribe" buttons.

## [0.19.0] - 2026-06-15

Add an Accessibility page and an on-page contents rail, and tighten accessibility across the prototype.

- **New**: Add an Accessibility page with the accessibility statement, testing approach, and feedback route.
- **New**: Add an "On this page" contents rail that follows along as you scroll, on wider screens.
- **Fix**: Make the primary button blue with an orange hover, and fix several text-contrast issues.
- **Fix**: Make the events filter and mobile navigation work correctly for keyboard and screen-reader users.
- **Behind the scenes**: Add an automated accessibility check that runs over the key pages.

## [0.18.0] - 2026-06-12

Add brand-representation guidance.

- Add a "How to represent us" section and make brand-name, cafe, and UK-spelling usage consistent across the prototype.

## [0.17.0] - 2026-06-10

Refine typography weight, the headline underline, and footer details.

- Cap the boldest font weight so headings stay on-brand.
- Use the brand scribble underline beneath headlines.
- Keep event cards full-width on tablet, going three across only on larger screens.
- Refine the keyboard-focus highlight and make the primary button hover orange.
- Tidy the footer wording and the at-a-glance stats layout.

## [0.16.0] - 2026-06-10

Add motion and small interactive touches to the prototype.

- **New**: Animate the mobile navigation panel and hamburger toggle, respecting reduced-motion settings.
- **New**: Add a copy button to the token code blocks with a brief "Copied" confirmation.
- **New**: Add a GitHub link to the footer and make the "at a glance" stats count up on scroll.
- **Fix**: Replace the underline graphic with a crisp version and fix a few screen-reader announcements.
- Remove the Partners strip and the EU-funding disclaimer pattern.

## [0.15.0] - 2026-06-09

Expand the colour ramps, add illustrations, and reorganise the prototype into clearer sections.

- **New**: Add full light-to-dark colour ramps for the five brand families with labelled swatches.
- **New**: Add brand line illustrations and a sketched headline underline.
- **New**: Add an Upcoming Events pattern and a button-state overview on the Components page.
- **New**: Reorganise the prototype into Foundations, Components, Patterns, Guidelines, and Governance.
- **Fix**: Render headlines in a single charcoal colour, keeping orange decorative-only to match the live site.

## [0.14.0] - 2026-06-04

Establish a quality baseline for the prototype: faster images, richer metadata, and stronger accessibility.

- Serve images in faster, modern formats and sized to avoid layout shift.
- Add web manifest, theme colour, and social-sharing metadata while keeping the site unlisted from search.
- Add an accessibility baseline: skip link, focus highlight, reduced-motion support, and clearer labels for screen readers.
- **Behind the scenes**: Add a screenshot tool for desktop, tablet, and mobile visual checks.

## [0.13.3] - 2026-06-02

Fix mobile navigation behaviour and a handful of build reliability issues.

- Give the mobile menu its own state so a desktop submenu no longer opens the hidden mobile one.
- Close the mobile menu on Escape and when changing pages, and lock the background while it is open.
- Make collapsed FAQ answers skip over for keyboard and screen-reader users.
- **Behind the scenes**: Fix build scripts so they run reliably on Windows and from a fresh checkout.

## [0.13.2] - 2026-06-02

Refresh the social-sharing and README images.

- Rebuild the social preview and README hero as a composed lavender "Design System" card.
- **Behind the scenes**: Expand the changelog writing guidance.

## [0.13.1] - 2026-05-22

Swap in a dedicated README hero image and add cross-browser checks.

- Use a dedicated wide image for the README hero, keeping the social preview separate.
- **Behind the scenes**: Add automated cross-browser checks across major desktop and mobile browsers.

## [0.13.0] - 2026-05-22

Rewrite the README and automate GitHub releases.

- Rewrite the README in a community voice with a hero image and a tech-stack section.
- **Behind the scenes**: Create GitHub Releases automatically from the changelog when a version is tagged.

## [0.12.0] - 2026-05-21

Add meaning-based colour roles and a category-icon system, and retire colour pairings that fail contrast.

- **New**: Add purpose-named colour roles for backgrounds and accents.
- **New**: Add a filled category-icon system and a colour-combinations example showing the valid and disallowed pairings.
- **Fix**: Retire orange-on-white text pairings that fail contrast, in favour of charcoal labels.
- Refine the header dropdown, mobile menu, footer, and workshop-card styling.
- **Behind the scenes**: Add logo-usage and colour-audit documentation.

## [0.11.1] - 2026-05-21

Align the prototype's navigation and newsletter popup with the live site.

- Match the prototype menu to the live-site navigation.
- Restyle the newsletter popup to match the live site.
- Use a dedicated photo for the workshop card and a clearer hero image.

## [0.11.0] - 2026-05-15

Point the prototype at its custom domain, align the brand palette, and add the AI-agent documentation layer.

- Redirect the old prototype URL to the custom design.foreveryone.berlin domain.
- Align the brand palette to the seven-colour guide and add a soft-lavender colour.
- Swap in a community cafe photo for social sharing and the homepage hero.
- **Behind the scenes**: Add the AI-agent documentation layout, the project licence, and automated build-and-test checks.

## [0.10.0] - 2026-05-01

Align the brand palette to the seven-colour guide and establish the AI-agent documentation layer.

- Align the brand palette to the seven-colour guide and add a soft-lavender colour.
- Fix the Patterns page dropdown being clipped.
- **Behind the scenes**: Add the AI-agent documentation layout and the project licence.

## [0.9.1] - 2026-03-30

Replace the text branding with the logo and polish the prototype.

- Use the ForEveryone logo in the header and sidebar instead of text.
- Calm the page transitions and polish icons and the footer.
- Fix flicker on Firefox and unwanted horizontal scroll on mobile.

## [0.9.0] - 2026-03-27

Put the prototype online.

- Deploy the prototype so it is viewable online.
- Sync the favicon and social-preview image from the live site.

## [0.8.0] - 2026-03-23

Add an interactive header and keep the prototype out of search results.

- **New**: Add an interactive header with an animated hamburger, slide-down mobile menu, and desktop dropdowns.
- **New**: Add fade transitions between pages and a "View Patterns" call to action on the homepage.
- Keep the prototype out of search engines and AI crawlers.
- **Fix**: Replace placeholder colours with the real site palette and reorder the swatches light to dark.
- **Fix**: Make the footer and header stack cleanly on narrow screens.

## [0.7.0] - 2026-03-20

Add a testimonial card and a popup modal.

- **New**: Add a testimonial card and a contact-form popup.
- **New**: Add syntax highlighting to the token code blocks.

## [0.6.0] - 2026-03-20

Turn the prototype into a multi-page site with shared navigation.

- **New**: Add separate Tokens, Components, and Patterns pages alongside the home overview.
- **New**: Add a sticky desktop sidebar and a mobile hamburger menu that highlight the current page.
- **New**: Add a shared layout with a persistent footer and an overview page with hero, stats, and cards.

## [0.5.1] - 2026-03-16

Fix the FAQ accordion.

- Fix the open FAQ item so its text stays readable.

## [0.5.0] - 2026-03-16

Add the core component set.

- **New**: Add icon and play buttons, an FAQ accordion, a dropdown, header and footer, a workshop card, category tags, and input states.
- **New**: Add more spacing steps to the layout grid.
- **Behind the scenes**: Generate full colour, spacing, and font-size values from the tokens.

## [0.4.0] - 2026-03-12

Build out the homepage content.

- **New**: Add the hero, mission, and stats content and the supporting images.
- **New**: Add radius, shadow, and motion demos, icons, a wave section, and a footer.
- Refocus the copy on the design system.

## [0.3.1] - 2026-03-12

Fix a prototype loading error.

- Fix a page-loading error and add instructions for running the prototype.

## [0.3.0] - 2026-03-12

Set up the pull-request workflow.

- **Behind the scenes**: Document and automate the pull-request and merge workflow.

## [0.2.0] - 2026-03-12

Stand up the first prototype.

- **New**: Add the first prototype with buttons, cards, a form, chips, a blockquote, and a hero.

## [0.1.0] - 2026-03-12

Lay the foundations of the design system.

- **New**: Set up the design tokens, generated CSS, Elementor documentation, a Figma sync guide, and contributing guides.
