# Prototype deploy (Vercel)

The Next.js prototype in `prototype/` is deployed to Vercel as project `fe-design-system` (team scope; see `.vercel/project.json`). Production hostname: **`design.foreveryone.berlin`**.

## Vercel project settings

| Setting | Value |
| --- | --- |
| Framework preset | Next.js |
| Root Directory | `prototype` |
| Build Command | `next build` (default) |
| Install Command | `npm ci` (default) |
| Production Branch | `main` |
| Domains | `design.foreveryone.berlin` (primary), `fe-design-system.vercel.app` (auto, kept for redirect only) |

The `.vercel.app` subdomain is automatically attached to every Vercel project and cannot be removed. It is kept indefinitely as a redirect target until external links and search results have moved on.

## Redirect rule

Defined in `prototype/vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/",
      "has": [{ "type": "host", "value": "fe-design-system.vercel.app" }],
      "destination": "https://design.foreveryone.berlin/",
      "permanent": true
    },
    {
      "source": "/:path*",
      "has": [{ "type": "host", "value": "fe-design-system.vercel.app" }],
      "destination": "https://design.foreveryone.berlin/:path*",
      "permanent": true
    }
  ]
}
```

The explicit `source: "/"` rule is intentional: Vercel's `/:path*` pattern did not fire for the literal root path (`/`) in initial testing, while sub-paths (`/tokens`, `/components`, etc.) redirected correctly. The dedicated root rule guarantees 301 coverage for the homepage.

Properties:

- **Host-gated.** Only requests with `Host: fe-design-system.vercel.app` are rewritten. Requests to the canonical domain are unaffected.
- **Permanent (HTTP 301).** Browsers and search crawlers cache it; treat lifecycle carefully (see below).
- **Path-preserving.** `/tokens?x=1` → `https://design.foreveryone.berlin/tokens?x=1`.

## Verifying the redirect

After a production deploy:

```bash
curl -sI -H "Host: fe-design-system.vercel.app" \
  https://fe-design-system.vercel.app/ | grep -i "^location\|^HTTP"
```

Expected output:

```text
HTTP/2 301
location: https://design.foreveryone.berlin/
```

Spot-check with a sub-path as well:

```bash
curl -sI -H "Host: fe-design-system.vercel.app" \
  https://fe-design-system.vercel.app/tokens | grep -i "^location"
```

## Lifecycle: when to remove

The redirect is intentionally permanent. Remove only when **all** of the following hold:

1. Google's Search Console for `fe-design-system.vercel.app` reports zero indexed pages for the legacy host (or it has been deindexed).
2. Server logs for the official domain show no inbound traffic with a `Referer` from `fe-design-system.vercel.app` for at least 30 days.
3. Any internal links (docs, READMEs, Slack pins, Notion pages) have been updated to the official domain.

To remove: delete the redirect block from `prototype/vercel.json` (or remove the file if no other rules remain) and ship a patch release. Do **not** disable the `.vercel.app` domain in the Vercel dashboard; that surface is permanent.

## Related

- [skills/release.md](skills/release.md) — release workflow includes post-deploy redirect verification.
- [visual-styles.md](visual-styles.md) — visual / asset references for the prototype.
