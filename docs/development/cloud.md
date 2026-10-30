# CreateX cloud development handoff

This branch preserves an unfinished website/theme/GIS revision and the operations backlog. It does not deploy the revision or create a hosted development environment. The operations backend has not been implemented: `apps/operations` does not exist.

## Runtime and setup

Use Linux with Node 22.18+ (validated on Node 22.23.1 / npm 10.9.8). `.devcontainer/devcontainer.json` uses the official `node:22-bookworm` image. Allocate at least 2 CPUs, 4 GiB RAM and 2 GiB free workspace as a practical starting point; larger browser testing may need more. The image tag tracks the Node 22 maintenance line; the package lock fixes the npm dependency versions.

From the repository root:

```sh
npm run cloud:setup
npm run dev:cloud
```

`cloud:setup` checks the runtime, runs `npm ci`, then lint, strict TypeScript, the static build and regression tests. Install from the lockfile on the destination platform; never copy Mac `node_modules`. Sharp includes platform-specific binaries.

The cloud preview listens on `0.0.0.0:4173`. Use the cloud provider's private port preview/forwarding; do not make the port publicly accessible. Pages: `/zh/`, `/en/`, `/zh/chapters/#explore`. For development on the same host, `npm run dev` defaults to `127.0.0.1:4173`. `scripts/serve.mjs` accepts `--host` and `--port` and fails instead of silently switching ports.

## Network and credentials

Development needs package-registry access for `npm ci`; optional map use needs HTTPS to `tile.openstreetmap.org`. Preserve OpenStreetMap attribution. No location permission or public geocoding API key is needed. Without map tiles, the city list and local interest draft must still work.

No GitHub, Cloudflare, database or identity credentials are required to build and preview. Do not copy Mac login profiles, `.wrangler`, `.env*`, `.dev.vars*`, tokens, credentials, private documents or databases into the cloud project. Future production deployment requires separately authorized account access; it is not part of this handoff.

## Preserved resources

- `packages/brand/assets/createx-logo-original.png`: supplied logo source, retained unchanged.
- `apps/website/src/assets/createx-co-creation.png`: generated concept artwork approved for the home hero.
- `apps/website/src/community.js`: optional Leaflet GIS with city search and fallback.
- `apps/website/src/data/communities.json`: empty verified-community snapshot. Geographic search options are not active chapters.
- `docs/operations-platform/`: product/permissions design and ten-round backlog; implementation still pending.

The original PPT, internal agreements, full document archive and screenshots remain private on the source machine. They are not necessary to reproduce this public site build and are not included in this branch.

## Acceptance still required

The 12 regression tests do not provide GIS end-to-end or backend-authorization coverage. Before release: inspect Chinese/English at mobile, desktop and enlarged zoom; check hero image, city search, unknown city, no-community state, map-load failure, keyboard/map controls and the local-draft handoff. No verified open city/community has been supplied. There is no receiving backend: interest notes remain local and must not be described as sent applications.

Before backend implementation: confirm the production identity path, create the authorized core/city permissions model, storage, audit and independent review tests. Do not use development identities in production. Administrator identities stay in private configuration, not in this public repository.

## Recovery checkpoint

Start from this branch's remote commit and retain its full SHA in the consuming task. Run `git status --short`, verify both source-image hashes below, then install/check/build in a clean workspace. Keep subsequent changes as normal commits on an independent branch. Do not overwrite unrelated main-branch updates. This handoff neither changes production nor modifies any database.

```text
createx-logo-original.png  90ada3e63ba29188526ac069016c074b44101898dce4ebce1674544cc5c49b07
createx-co-creation.png    f5f9eb548a5280d6f4ed4ed4250d77bbb68e323a8b0216e5b31431a5de39df90
```
