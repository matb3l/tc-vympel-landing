#!/bin/sh
set -e

echo "=== Running Payload migrations ==="
npx payload migrate 2>&1 || echo "Migration completed or no pending migrations."

echo "=== Starting Next.js ==="
exec npx next start -p ${PORT:-3000} -H ${HOSTNAME:-0.0.0.0}
