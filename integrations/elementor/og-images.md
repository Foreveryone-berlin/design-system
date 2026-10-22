# WordPress featured and OG images

Use `fe-og-image` for artwork; assign the featured and social images independently.

- Read the target post/page ID, current `featured_media`, media metadata and
  rendered Yoast head before changing anything. Discover the available media and
  SEO abilities and inspect their schemas; a tool name is not an assumed upload API.
- Creation alone authorizes local files, not uploads or publication. When upload
  and assignment are requested, upload the checked OG JPEG/PNG, supply its media
  title and context-appropriate alt, and assign its attachment ID as featured media
  only if the requested on-page crop fits. A separate WebP derivative can serve
  the on-page role.
- Read existing Yoast social overrides. Keep them unless replacing them is part
  of the task. If the featured image differs from the intended share image, set
  the explicit social image through supported plugin controls/API. Preserve all
  unrelated content and metadata. The currently exposed Yoast SEO read tool does
  not return social-image assignment fields, so inspect rendered output separately.
- Verify public image bytes, MIME type and dimensions without authentication.
  Verify `og:image`, `og:image:width`, `og:image:height`, `og:image:type`,
  `og:image:alt` and `twitter:card=summary_large_image` in the rendered head.
  Confirm a configured X image resolves to the intended asset. Missing tags are
  findings to resolve within the authorized metadata task, not proof of success.
- Check the featured-image crop and small preview. Revalidate the affected page
  cache and the relevant platform's preview cache when an authorized update remains
  stale. A saved setting is not proof of a refreshed crawler preview.

Clay Connections reference, inspected October 20, 2026: page 15208 has
`featured_media=15310`; rendered OG uses the same 1200 x 630 WebP attachment at
`/wp-content/uploads/2026/09/clay-connections-og.webp`. Its image URL is a
reference, not a format requirement for new cards. The checked head supplies
image width, height and type; no `og:image:alt` was emitted in that read.

Sources: [WordPress page schema](https://developer.wordpress.org/rest-api/reference/pages/#schema),
[Open Graph structured properties](https://ogp.me/#structured),
[Yoast social previews](https://yoast.com/help/why-doesnt-facebook-display-an-image/).
