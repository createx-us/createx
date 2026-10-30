#!/bin/sh
set -eu
cd "$(dirname "$0")/.."
node -e 'const [major,minor]=process.versions.node.split(".").map(Number);if(major<22||(major===22&&minor<18)){throw Error("Use Node 22.18 or newer; Node 22 is the validated major version")}'
npm ci
npm run check
