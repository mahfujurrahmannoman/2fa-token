#!/bin/bash
# Auto-commit all changes and push to main, no prompts.
# Triggered by OpenClaw cron job every 5 minutes.
set -e
cd "$(dirname "$0")"

# Skip if git is locked (another push in progress)
if [ -f .git/index.lock ]; then
  echo "Git lock present, skipping."
  exit 0
fi

git add -A
if git diff --cached --quiet; then
  echo "No changes to push."
  exit 0
fi

MSG="${1:-Auto-update from OpenClaw $(date -u +'%Y-%m-%d %H:%M:%S UTC')}"
git commit -m "$MSG" --no-verify
git push origin main --no-verify 2>&1 | tail -5
