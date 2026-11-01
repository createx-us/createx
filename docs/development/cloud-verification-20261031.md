# CreateX independent cloud regression checkpoint — 2026-10-31

This is a continuation of the 2026-10-30 cloud checkpoint, not browser or business acceptance.

- Remote preservation branch: `codex/createx-cloud-preservation-20261030`, checked read-only at `07e794e650486252616ff250796ac3cc9be5de91`.
- Local documentation/cache baseline: `c3058710c72b7235a777d4af1fd1790240ce41e8`.
- Executor: built-in Linux x86_64 cloud workspace; Node 24.22.1, npm 11.9.0. No Mac execution. Earlier Mac Node 22 validation remains distinct.
- Added four JSDOM regression tests for community-directory behavior: non-JSON API response falls back to the static snapshot; active/verified/HTTPS-only synthetic listings and literal text handling; missing map library with repeated activation preserves city search; rejected directory request reports unavailability without inventing listings.
- Test community records are deliberately synthetic, local test fixtures only. They are not published records, evidence of real communities, or backend validation. No real API, map tile service or geolocation was contacted by these tests.
- `npm run check` passed lint, type checks, the 14-page static build, and all 16 tests with zero failures/skips. Use the writable cache setup in `cloud-verification-20261030.md`. The nonfatal npm `http-proxy` configuration warning persists.
- Application source and production data were not changed. No deployment, credential or permission change was performed.

The current integration still exposes only the boardx installation in its read-only installation listing, not a createx-us installation. This is not proof of global absence. No materially new permission evidence was found, so the previously rejected remote write was not retried. This checkpoint and new regression tests are local only until a permitted remote write is independently verified.

Outstanding: real desktop/mobile screenshots and interactions, Back/refresh and GIS tile/fallback behavior in the supported browser; a supported private preview route; actual verified community records and backend functionality. JSDOM results do not close these acceptance gaps. A saved dedicated cloud configuration is useful for recovery but is not required for the local cloud checks demonstrated here.
