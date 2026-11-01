# CreateX independent cloud verification — 2026-10-30

## Verified source and executor

Source commit: `07e794e650486252616ff250796ac3cc9be5de91`.
Git tree: `2b6c38cc30e6e8dccd536eae9736bfefce41c441`.

This check used an independent built-in Linux x86_64 cloud workspace, Node 24.22.1 and npm 11.9.0. It did not execute on the source Mac. This is separate from the earlier documented Node 22.23.1 / npm 10.9.8 validation and does not create a saved dedicated cloud development environment.

The exact remote commit was cloned, checked out detached, and passed `git fsck --full`. Both source-image SHA-256 values matched `cloud.md`. The worktree remained clean through installation, build and tests.

## Installation and checks

`npm run cloud:setup` was inspected before execution. It runs a runtime check, `npm ci`, then lint, TypeScript checks, build and tests. It does not deploy.

The first install failed because the default npm cache directory was unavailable (ENOENT). A normal retry using an explicitly writable cache succeeded: 169 packages installed, lint passed, TypeScript passed, static build passed, and all 12 regression tests passed with zero skips or failures. Initial Fontconfig cache warnings were eliminated by rebuilding with a writable XDG cache. A nonfatal npm `http-proxy` environment-configuration warning remained. No system configuration or permissions were changed.

Reproducible cache setup, relative to the checkout:

```sh
mkdir -p .cache/npm .cache/xdg
export npm_config_cache="$PWD/.cache/npm"
export XDG_CACHE_HOME="$PWD/.cache/xdg"
npm run cloud:setup
```

Keep `.cache/` excluded from Git. Do not copy source-machine node_modules, login profiles, tokens or private files.

## Scoped preview evidence

A preview launched and queried within the same cloud execution process passed six HTTP checks: `/zh/`, `/en/`, `/zh/chapters/`, the logo and co-creation WebP assets returned 200 with nonempty bodies; an unknown path returned the custom 404. The temporary process was stopped afterward.

The supported cloud Chrome browser could not reach a separately launched `http://127.0.0.1:4173/zh/chapters/#explore` preview: `net::ERR_CONNECTION_REFUSED`. A separate TCP check also reported connection refused even though the launch tool still reported a running session. A bounded retry using the existing supported `0.0.0.0:4173` host option confirmed a live Node process and a listening socket; same-command HTTP returned 200 with 10,040 bytes. A separate execution command and the cloud browser both still received connection refused. This excludes a simple loopback-only binding or startup race in that retry, but does not establish the underlying isolation mechanism. The cross-tool preview connection is therefore not established. The cause is not proven; this is not evidence of a production-site outage or an application GIS defect. No public ingress, tunnel, networking permission change or alternate browser-control bypass was attempted. The all-interface listener was only the existing local preview setting; no external route was configured.

## Not accepted by this checkpoint

- Actual desktop/mobile browser interaction, screenshots, console inspection, Back/refresh, GIS tile/fallback behavior and visual/keyboard acceptance remain unverified in this cloud executor.
- The 12 existing tests use static output and JSDOM; they are not real-browser or GIS end-to-end acceptance.
- The verified-community snapshot remains empty. Cities are geographic options, not established communities; local interest drafts are not sent applications.
- The operations backend remains unimplemented.
- This verification did not deploy, configure credentials, write production data or change permissions. Its documentation and cache-ignore entry may be preserved on the existing migration branch; that does not publish the application.

## Recovery and next step

Recover the exact remote commit into a fresh Linux checkout, verify its tree and asset hashes, then use the cache setup above. Preserve the original source and this checkpoint separately from any later code changes. Next establish a supported private preview route between the cloud executor and the supported cloud browser, or use a dedicated cloud development environment with an established browser preview. Do not claim this gap is resolved by the successful HTTP-only checks.
