# Website release operations

Run from repository root with Node 22.18+:

```sh
npm ci
npm run check
npx wrangler deploy --dry-run --config apps/website/wrangler.jsonc
npx wrangler deploy --config apps/website/wrangler.jsonc
```

This config deploys only `apps/website/dist` as static assets. It contains no application Worker, external fetch, database, email, queue, secret, or AI binding. Missing assets use a real custom 404 response. Project content and backups are excluded from the build and Git.

Before the first domain binding, verify the account and zone against `preflight.md`, preserve old DNS and hosting, and validate the new release on its Worker preview hostname. Add custom domain routes only for createx.us and www.createx.us. Never apply wildcard subdomain routes; dt.createx.us and other projects must remain untouched.

The original website points to 44.216.86.78 and is not hosted by an existing apex Worker. The original source is not deleted. Old HTTP only redirects to its currently invalid HTTPS certificate. Local backup retains that observed response; a full old-site source backup is unavailable.

For later releases, use Cloudflare deployment versions to roll back to a known new-site version. For reverting the entire migration, detach only the new apex/www bindings and restore A 44.216.86.78, DNS only, TTL Auto. Confirm mail MX/SPF/DKIM and dt retain their original values.
