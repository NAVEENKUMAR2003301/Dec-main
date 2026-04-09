#!/usr/bin/env bash
# start-dev-client.sh
# Starts the Node.js backend (if not already running) then launches the Vite dev server.
# Usage: bash scripts/start-dev-client.sh

set -e

APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
HEALTH_URL="http://127.0.0.1:8010/api/health"
STARTED_BACKEND=false
BACKEND_PID=""

check_backend() {
  curl -sf "$HEALTH_URL" | grep -q '"status":"ok"' 2>/dev/null
}

if ! check_backend; then
  echo "Backend not running — starting node server..."
  node "$APP_DIR/server/index.js" &
  BACKEND_PID=$!
  STARTED_BACKEND=true

  DEADLINE=$(( $(date +%s) + 10 ))
  while [ "$(date +%s)" -lt "$DEADLINE" ]; do
    sleep 0.5
    if check_backend; then
      echo "Backend is ready."
      break
    fi
    if ! kill -0 "$BACKEND_PID" 2>/dev/null; then
      echo "ERROR: Backend process exited before becoming ready."
      exit 1
    fi
  done

  if ! check_backend; then
    echo "ERROR: Backend did not become ready within 10 seconds."
    kill "$BACKEND_PID" 2>/dev/null || true
    exit 1
  fi
else
  echo "Backend already running."
fi

cleanup() {
  if [ "$STARTED_BACKEND" = true ] && [ -n "$BACKEND_PID" ]; then
    echo "Stopping backend..."
    kill "$BACKEND_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

npm --prefix "$APP_DIR" run dev:client
