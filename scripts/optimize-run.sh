#!/usr/bin/env bash
# Prototype optimize orchestration (sequential CLI agent passes).
# Usage:
#   bash scripts/optimize-run.sh                    # full pass
#   bash scripts/optimize-run.sh --skip-baseline
#   bash scripts/optimize-run.sh --dimension perf
#   bash scripts/optimize-run.sh --prompts-only
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROMPTS_DIR="$REPO_ROOT/scripts/optimize-prompts"
PROTOTYPE="$REPO_ROOT/prototype"
DOMAINS=(perf a11y seo cleanup)
SKIP_BASELINE=0
PROMPTS_ONLY=0
DIMENSION=""
DEV_PID=""

for arg in "$@"; do
  case "$arg" in
    --skip-baseline) SKIP_BASELINE=1 ;;
    --prompts-only) PROMPTS_ONLY=1 ;;
    --dimension) shift; DIMENSION="${1:-}" ;;
    --dimension=*) DIMENSION="${arg#*=}" ;;
  esac
done

cleanup_dev() {
  if [[ -n "$DEV_PID" ]] && kill -0 "$DEV_PID" 2>/dev/null; then
    kill "$DEV_PID" 2>/dev/null || true
  fi
}
trap cleanup_dev EXIT

start_dev() {
  if curl -sf "http://localhost:3100/" >/dev/null 2>&1; then
    echo "Dev server already on :3100"
    return 0
  fi
  (cd "$PROTOTYPE" && PORT=3100 npm run dev) >/dev/null 2>&1 &
  DEV_PID=$!
  for _ in $(seq 1 30); do
    curl -sf "http://localhost:3100/" >/dev/null 2>&1 && break
    sleep 2
  done
  echo "Dev server started on :3100"
}

run_baseline_shots() {
  start_dev
  (cd "$PROTOTYPE" && OUT_DIR=baseline BASE_URL=http://localhost:3100 node scripts/screenshot.mjs)
}

run_agent_pass() {
  local domain="$1"
  local prompt="$PROMPTS_DIR/${domain}.md"
  [[ -f "$prompt" ]] || { echo "Missing $prompt" >&2; exit 1; }
  echo "=== Agent pass: $domain ==="
  local text
  text="$(cat "$prompt")"
  agent -p --force "$text"
}

run_verify() {
  echo "=== Verify ==="
  (cd "$PROTOTYPE" && npx tsc --noEmit && npm run build && npm run lint)
  (cd "$REPO_ROOT" && npm run build)
}

run_after_shots() {
  start_dev
  (cd "$PROTOTYPE" && OUT_DIR=after BASE_URL=http://localhost:3100 node scripts/screenshot.mjs)
}

domains_to_run() {
  if [[ -n "$DIMENSION" ]]; then
    echo "$DIMENSION"
  else
    printf '%s\n' "${DOMAINS[@]}"
  fi
}

if [[ "$PROMPTS_ONLY" -eq 1 ]]; then
  ls -1 "$PROMPTS_DIR"/*.md
  exit 0
fi

if [[ "$SKIP_BASELINE" -eq 0 ]]; then
  run_baseline_shots
fi

while read -r domain; do
  [[ -n "$domain" ]] || continue
  run_agent_pass "$domain"
done < <(domains_to_run)

echo "=== Integration pass (orchestrator) ==="
agent -p --force "In $REPO_ROOT/prototype, wire cross-file handoffs from the optimize skill step 3 (skip-link in layout + globals.css, image sizing handoffs). Run npx tsc --noEmit in prototype/. Do not commit."

run_verify
run_after_shots

echo "Optimize run complete. Run e2e: cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e"
