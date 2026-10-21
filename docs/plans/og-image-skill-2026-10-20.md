# ForEveryone OG image skill and team template

The local skill, isolated consumer tests, generated payload and Agents catalog are implemented. Template generation was submitted inside the existing ForEveryone design system; completion, duplication, export and team sharing remain unverified after the user stopped Playwriter. Integration is limited to `develop`.

## Evidence and assumptions tested

| Check | Result | Consequence |
| --- | --- | --- |
| `git fetch`, status, remote, worktrees | ForEveryone-berlin/design-system; clean `develop` at `cb279d9`, synchronized with origin | Save this plan on `feature/og-image-skill-plan`; implement from this baseline. |
| Elementor MCP post search and Yoast read | Published Clay Connections page is ID 15208, `/courses/clay-connections-course-pottery/` | Use that page, not the backup draft, as the editorial reference. |
| Elementor MCP asset search | Attachment 15310, `clay-connections-og.webp`, 1200 x 630, title and alt both "Clay Connections Course" | Retrieve and visually inspect this image before defining its reusable composition. |
| Browser image, REST and rendered head | Image inspected at full size; page 15208 has `featured_media=15310`; rendered OG points to the same 1200 x 630 WebP | Composition and assignment are verified. Source authorship and original generation method remain unestablished; use the reference for visual direction, not as a bundled photo. |
| `scripts/lib/skills.mjs`, build script, CLI and tests | Consumer skills are under `skills/`; inline YAML metadata includes version range, prerequisites and docs; builder discovers folders and copies their supporting files | Add a consumer skill requiring `fe-core`, using the existing builder and installer. |
| `spec/principles.md`, shared conventions and visual rules | Current approved palette, Filson Pro digital typography, orange accents, logo clear space, reusable SVG assets | Resolve current tokens and approved assets rather than sampling the old image. Current principles take precedence over stale restrictions in older skill examples. |
| Existing OG renderer | `prototype/scripts/build-og-card.mjs` uses token CSS, real SVGs and browser composition; its documented Outfit stand-in differs from the production type requirement | Reuse the composition technique, not its prototype typography or fixed specimen copy. |
| Playwriter inspection of Claude Design/Artifacts | Existing ForEveryone Design System is shared with the organization; its chat accepted the template brief and tested source | Reuse that system. Generation was submitted in its existing conversation, not a second design system. Browser automation stopped at the user's request. |
| Claude Design migration notice and official documentation | Standalone Design closes December 14, 2026; Claude supports Design artifacts and organization design systems | Make the team deliverable reusable in the supported Claude experience, with the standalone template only where its reuse survives migration. |

## 1. Establish the reference and production contract

- Inspect attachment 15310 at full size. Record its actual hierarchy, photo treatment, decoration, logo position and crop, distinguishing observations from proposed improvements.
- Read page 15208's featured-media assignment and rendered Yoast OG output independently. Record any explicit social-image override. Keep this research read-only.
- Confirm approved image rights and available licensed digital fonts. Reuse genuine workshop photography for identifiable people and the venue. AI-created imagery must not imply that invented participants or scenes document a real ForEveryone event.
- Define the editorial brief from the requested page: topic, audience, exact headline, language, one optional factual supporting line, image source and focal point. Conflicting venue, dates or prices require resolution before including them; default to evergreen content.

## 2. Implement `fe-og-image`

- Add `skills/fe-og-image/SKILL.md` with repository-compatible metadata, `requires: [fe-core]`, clear OG/featured-image triggers and a compact generation, composition, export and review workflow.
- Add focused, packaged references for the Clay Connections visual example, output specifications and a ready-to-use prompt. Bundle production-critical rules and approved assets, or expose them through verified accessible `/skills/**` URLs. The prototype blocks AI crawlers outside its discovery surfaces, so ordinary documentation-page links cannot be the only source of essential instructions. Verify every installed relative path.
- Use AI image generation for the visual subject or background when requested. Use deterministic composition for exact typography, approved logo, shapes and final pixel dimensions. Treat text-only or existing-photo briefs as composition tasks, without forcing paid generation.
- Derive colors and type roles from current digital tokens. Use approved high-contrast text/background pairings, orange decorative accents, brand logo clear space, restrained doodles and appropriate blob/photo treatment. Preserve the Clay Connections visual family without copying obsolete styling.
- Structure the image around one subject and one short headline, with at most one supporting line. Keep vital content inside a default 64 px inset on a 1200 x 630 canvas. Verify square-center and other actual consumer crops separately; the inset is a template convention, not a universal platform guarantee.
- Keep the subject and headline legible at 300 px card width. Reduce copy instead of shrinking it into small print. Use accurate message match with the destination page; avoid fake buttons, scarcity, unverified claims and baked-in expiring details.
- Export a flattened sRGB 1200 x 630 JPEG or PNG for OG delivery, with a practical target of 300 KB or less where visual quality permits. Inspect actual output dimensions rather than trusting the generator's prompt or screenshot viewport. Produce an on-page WebP derivative when useful for WordPress; preserve the editable source and original visual.
- Supply a descriptive filename, media title, context-appropriate alt text and separate `og:image:alt` guidance. Alt describes the image rather than repeating keywords. Keep indexability and crawlable image URLs distinct from social-preview configuration; do not promise ranking or conversion improvements.

## 3. Package WordPress guidance and discovery

- Add `integrations/elementor/og-images.md` for platform-specific steps: inspect the actual media/update abilities and schemas, upload only when authorized, assign `featured_media`, and set an explicit Yoast social image where required. Preserve unrelated page settings and copy.
- Explain that featured media and `og:image` may resolve to different attachments. Verify public HTTPS image availability, MIME type, dimensions, `og:image`, width, height, type and alt companions, plus the large-image X card where emitted. Verify the rendered head, not only saved plugin fields.
- Update the existing catalog in `docs/agent-skills.md`, the entry in `llms.txt`, the existing prototype skill list, and agent retrieval/trigger mirrors required by the repository contract. Replace or extend their existing lists, without adding redundant narrative sections.
- Run `npm run skills:build` to regenerate `dist/skills/`, `prototype/public/skills/` and `prototype/public/llms.txt`. Treat these as intentional committed production payloads.

## 4. Test the skill before creating the team template

Verified: 376 repository assertions; prototype build; local Agents smoke and axe checks. An isolated installed consumer exported Clay, exact long-title, generated-editorial, minimal and literal-markup cases as opaque sRGB 1200 x 630 JPEGs at 23-53 KB. Font-decoding, alt and crop guards passed. Independent full/card-size review passed after adding compact type for exact long wording. Rendered Agents entry checked at 390 and 1440 px.

- Run `node scripts/build-skills.test.mjs`, `node bin/fe-ds.mjs skills list` and `node bin/fe-ds.mjs skills install --dry-run --target dir`. Verify discovery, dependency order, packaged references and generated-tree parity. Use existing dependencies and direct Node commands.
- Perform a real installation into a task-owned temporary consumer directory outside this checkout. Run a realistic image brief using only that installation, its packaged assets and verified public resources. Pass only if it resolves the current tokens, essential rules and assets without repository-relative access; dry-run installation alone is insufficient.
- Exercise realistic briefs: Clay Connections with an approved photo, a different workshop with a long title, and an editorial brief requiring a generated visual. Check factual restraint, title wrapping, token choices, crop behavior and useful alt text. Store temporary test output outside committed production output.
- Independently review the new skill using those briefs and raw reference assets, without supplying the expected answers. Correct observed failures before treating the skill as validated.
- Inspect exported images visually at full and card size. Check spelling, actual fonts, logo integrity, anatomy where generated, subject crops, contrast, dimensions, encoding and file size. Automated pass results alone do not establish visual quality.
- Run `npm test`. If the prototype catalog changes, run the prototype build and relevant UI checks, then inspect its rendered entry. Check `git status` after builds for unintended production-output changes.

## 5. Create the reusable Claude Design team template

Submitted in the existing system conversation: `https://claude.ai/cowork/cse_01R6EGyooNhLAm1QrAq6kvaR`. Its brief requests ForEveryone OG Image Studio, a separate reusable template/artifact using the existing system. The supplied HTML embeds the approved logo, underline and licensed Filson Pro fonts; the attached image examples and production contract match the tested skill. No template link or completed sharing/export test was verified before Playwriter stopped.

- After the skill passes, use the authenticated Chrome session through Playwriter to create a ForEveryone OG/featured-image master in Claude Design. Base it on the tested composition and verified reference, not a new independent interpretation.
- Supply a self-contained brand packet: resolved digital palette, approved logo and illustrations, permitted fonts or an explicitly approved fallback, hierarchy, spacing, image treatment and export specifications. Record the design-system version so updates are traceable. Teammates must not need GitHub, Codex, Claude Code or local tooling.
- Give editors only the inputs needed for the image: headline, optional supporting line, language, approved image upload or visual-generation brief, and focal point. Keep brand styling and canvas dimensions fixed by the template. Provide a preview and a downloadable OG raster; include a WordPress derivative only when its export is supported and tested.
- Use the observed native template workflow: open the ForEveryone design system and ask Claude to create a template from the tested master or its project link. Verify actual duplicate/remix, export and sharing controls. Use an organization-shared reusable template where supported; otherwise use a shared duplicable Design artifact with the same editor workflow. Share only the finished master with the ForEveryone team under the current authorization, rather than changing organization-wide defaults.
- Verify that a fresh copy can change its content without editing the master, retains brand assets and fonts, and exports a valid 1200 x 630 image. Verify team access through actual sharing settings and an available teammate test; distinguish configured access from proven access when a second account is unavailable.
- Check reuse in the current Claude Design/Artifacts experience before delivery so the master does not rely solely on the retiring standalone interface. Retain an exportable source backup with the same approved assets.
- Deliver the direct reusable team link and the tested export. Record the link and maintenance/version reference in the existing skill catalog.

## Files

| Path | Change |
| --- | --- |
| `skills/fe-og-image/SKILL.md` and focused supporting resources | New consumer skill and packaged reference material |
| `integrations/elementor/og-images.md` | New WordPress/Yoast integration guidance |
| `docs/agent-skills.md`, `llms.txt`, `prototype/app/agent-skills/page.tsx` | Existing catalog and discovery entries |
| `docs/AGENTS.md`, `AGENTS.md`, `CLAUDE.md`, `.cursor/AGENTS.md` | Existing retrieval and trigger parity |
| `dist/skills/`, `prototype/public/skills/`, `prototype/public/llms.txt` | Generated consumer payloads |
| Claude Design/Artifacts in ForEveryone | Shared reusable master, fresh-copy test and exported image |

## Sources

- [Clay Connections page](https://foreveryone.berlin/courses/clay-connections-course-pottery/), Elementor MCP post 15208, attachment 15310 and Yoast data, read October 20, 2026.
- [Open Graph protocol](https://ogp.me/): image metadata and image alt companions.
- [Google image SEO](https://developers.google.com/search/docs/appearance/google-images): image relevance, quality, filenames, alt text and crawlability.
- [WordPress pages REST schema](https://developer.wordpress.org/rest-api/reference/pages/): featured-media assignment.
- [Yoast social-image troubleshooting](https://yoast.com/help/why-doesnt-facebook-display-an-image/): image dimensions and sharing validation. The 1200 x 630 canvas and 300 KB target above are project defaults, not Open Graph protocol requirements.
- [Claude design-system setup](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design), [artifact sharing](https://support.claude.com/en/articles/9547008-share-artifacts) and [Design migration](https://support.claude.com/en/articles/17440474-migrate-from-standalone-claude-design-to-claude): current team and migration capabilities, checked October 20, 2026.
