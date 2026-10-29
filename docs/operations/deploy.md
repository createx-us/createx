# Website release operations

From repository root, with the authorized Cloudflare account already selected:

```sh
npm ci
npm run check
npx wrangler deploy --dry-run --config apps/website/wrangler.jsonc
npx wrangler deploy --config apps/website/wrangler.jsonc
```

Only `apps/website/dist` is uploaded. No database, account, payment, AI, email, or external service binding is required. Two exact Worker Routes cover the apex and www; their existing A records must be proxied. Other subdomains and projects must remain unchanged.

Keep full DNS snapshots and deployment receipts locally. Revert using the preserved original records and remove only these two website routes. Validate normal public DNS, strict TLS, localized pages, downloads, redirects, and real 404 responses before marking production complete.
