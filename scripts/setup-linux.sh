#!/usr/bin/env bash
set -euo pipefail

echo "Installing Electron system dependencies..."
sudo apt-get update -y
sudo apt-get install -y \
  libnss3 \
  libatk1.0-0 \
  libatk-bridge2.0-0 \
  libcups2 \
  libxcomposite1 \
  libxdamage1 \
  libxfixes3 \
  libxrandr2 \
  libgbm1 \
  libxkbcommon0 \
  libpango-1.0-0 \
  libcairo2 \
  libasound2t64 \
  libx11-xcb1 \
  libxss1 \
  libgtk-3-0
echo "Done."
