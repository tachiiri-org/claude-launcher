#!/bin/bash
FILE=$(node -e "
const d = JSON.parse(require('fs').readFileSync(0, 'utf8'));
const f = d.tool_input && d.tool_input.file_path;
if (f) process.stdout.write(f);
")
if [ -n "$FILE" ]; then
  PROJECT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
  bunx prettier --check --ignore-unknown "$FILE"
fi
