#!/usr/bin/env bash
set -euo pipefail

DEPLOY_HOST="sasha@sashasalzanoweir.com"
DEPLOY_PATH="/var/www/portfolio"
SERVICE="portfolio"

echo "Building..."
npm run build

echo "Syncing to server..."
rsync -az --delete --exclude=node_modules \
  build/ \
  package.json \
  "$DEPLOY_HOST:$DEPLOY_PATH/"

echo "Installing deps and restarting service..."
ssh "$DEPLOY_HOST" bash << 'REMOTE'
cd /var/www/portfolio
npm install --omit=dev --silent
sudo systemctl restart portfolio
sudo systemctl is-active portfolio
REMOTE

echo "Deployed successfully to https://sashasalzanoweir.com"
