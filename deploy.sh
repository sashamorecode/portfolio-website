#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "$0")"

host=sasha@sashasalzanoweir.com
site=/var/www/portfolio
revision=$(git rev-parse --short=12 HEAD)

npm run build
release=$(ssh "$host" "mkdir -p '$site/releases' && mktemp -d '$site/releases/$revision.XXXXXXXX'")
rsync -az build/ package.json package-lock.json "$host:$release/"

ssh "$host" bash -s -- "$site" "$release" <<'REMOTE'
set -euo pipefail
umask 022
site=$1
release=$2

# Keep simultaneous deploys from racing the dependency install or entry-point switch.
exec 9>"$site/.deploy.lock"
flock 9
cd "$release"
lock=$(sha256sum package-lock.json | cut -d' ' -f1)
dependencies="$site/dependencies/$lock"
if [[ ! -d "$dependencies/node_modules" ]]; then
  npm ci --omit=dev --no-audit --no-fund
  mkdir -p "$dependencies"
  mv node_modules "$dependencies/node_modules"
fi
ln -s "$dependencies/node_modules" node_modules

# Exercise the candidate through its own socket while the current service serves visitors.
socket="$release/preview.sock"
SOCKET_PATH="$socket" ORIGIN=https://sashasalzanoweir.com node index.js > startup.log 2>&1 &
preview=$!
stop_preview() { kill "$preview" 2>/dev/null || true; wait "$preview" 2>/dev/null || true; }
trap stop_preview EXIT
for attempt in {1..100}; do
  [[ -S "$socket" ]] && break
  kill -0 "$preview" || { cat startup.log >&2; exit 1; }
  sleep 0.1
done
for path in / /en /de /impressum /datenschutz /homepage/signals.js; do
  curl --fail --silent --show-error --max-time 5 --unix-socket "$socket" "http://localhost$path" >/dev/null
done
stop_preview
trap - EXIT
chmod 755 "$release"

if [[ -L "$site/index.js" ]]; then
  previous=$(readlink -f "$site/index.js")
else
  # The first deployment keeps the entry and all sibling files from the original in-place build.
  previous="$site/pre-release-index.js"
  cp -p "$site/index.js" "$previous"
fi
switch_entry() {
  ln -sfn "$1" "$site/.next-index"
  mv -Tf "$site/.next-index" "$site/index.js"
}
ln -sfn "$previous" "$site/previous-entry"
switch_entry "$release/index.js"
if ! sudo -n systemctl restart portfolio || ! curl -fsS --max-time 5 --retry 5 --retry-connrefused \
  --retry-delay 1 -H 'Host: sashasalzanoweir.com' http://127.0.0.1:3000/ >/dev/null; then
  switch_entry "$previous"
  sudo -n systemctl restart portfolio
  echo "Restored the preceding release after the service check failed." >&2
  exit 1
fi
echo "Serving $release"
REMOTE
