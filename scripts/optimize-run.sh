#!/usr/bin/env bash
# Prototype optimize orchestration (sequential CLI agent passes).
# Usage:
#   bash scripts/optimize-run.sh                    # full pass
#   bash scripts/optimize-run.sh --skip-baseline
#   bash scripts/optimize-run.sh --dimension perf
#   bash scripts/optimize-run.sh --prompts-only
#   bash scripts/optimize-run.sh --agent codex
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PROMPTS_DIR="$REPO_ROOT/scripts/optimize-prompts"
PROTOTYPE="$REPO_ROOT/prototype"
DOMAINS=(perf a11y seo cleanup)
SKIP_BASELINE=0
PROMPTS_ONLY=0
DIMENSION=""
DEV_PID=""
AGENT_KIND="cursor"
while [[ $# -gt 0 ]]; do
  case "$1" in
    --agent) AGENT_KIND="${2:?--agent requires cursor or codex}"; shift 2 ;;
    --agent=*) AGENT_KIND="${1#*=}"; shift ;;
    --skip-baseline) SKIP_BASELINE=1; shift ;;
    --prompts-only) PROMPTS_ONLY=1; shift ;;
    --dimension) DIMENSION="${2:?--dimension requires perf, a11y, seo, or cleanup}"; shift 2 ;;
    --dimension=*) DIMENSION="${1#*=}"; shift ;;
    *) echo "Unknown option: $1" >&2; exit 1 ;;
  esac
done

case "$AGENT_KIND" in
  cursor) AGENT_BIN="${AGENT_BIN:-agent}" ;;
  codex) AGENT_BIN="${AGENT_BIN:-codex}" ;;
  *) echo "Unknown agent: $AGENT_KIND (use cursor or codex)" >&2; exit 1 ;;
esac
if [[ "$AGENT_KIND" == cursor ]] && ! command -v "$AGENT_BIN" >/dev/null 2>&1; then
  if [[ -n "${LOCALAPPDATA:-}" && -f "${LOCALAPPDATA}/cursor-agent/agent.cmd" ]]; then
    AGENT_BIN="${LOCALAPPDATA}/cursor-agent/agent.cmd"
  elif [[ -f "$HOME/AppData/Local/cursor-agent/agent.cmd" ]]; then
    AGENT_BIN="$HOME/AppData/Local/cursor-agent/agent.cmd"
  fi
fi

run_agent() {
  if [[ "$AGENT_KIND" == codex ]]; then
    "$AGENT_BIN" exec --cd "$REPO_ROOT" "$1"
  else
    (cd "$REPO_ROOT" && "$AGENT_BIN" -p --force "$1")
  fi
}

cleanup_dev() {
  if [[ -n "$DEV_PID" ]] && kill -0 "$DEV_PID" 2>/dev/null; then
    # DEV_PID leads its own process group (set -m below); kill npm and next dev with it.
    kill -- "-$DEV_PID" 2>/dev/null || kill "$DEV_PID" 2>/dev/null || true
  fi
}
trap cleanup_dev EXIT

start_dev() {
  if curl -sf "http://localhost:3100/" >/dev/null 2>&1; then
    echo "Dev server already on :3100"
    return 0
  fi
  set -m
  (cd "$PROTOTYPE" && PORT=3100 npm run dev) >/dev/null 2>&1 &
  DEV_PID=$!
  set +m
  for _ in $(seq 1 30); do
    curl -sf "http://localhost:3100/" >/dev/null 2>&1 && break
    sleep 2
  done
  if ! curl -sf "http://localhost:3100/" >/dev/null 2>&1; then
    if [[ -n "$DEV_PID" ]] && ! kill -0 "$DEV_PID" 2>/dev/null; then
      echo "Dev server failed to start, process exited" >&2
    else
      echo "Dev server failed health check at :3100" >&2
    fi
    return 1
  fi
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
  run_agent "$text"
}

run_verify() {
  echo "=== Verify ==="
  (cd "$PROTOTYPE" && node node_modules/typescript/bin/tsc --noEmit && npm run build)
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
run_agent "In $REPO_ROOT/prototype, wire cross-file handoffs from the optimize skill step 3 (skip-link in layout + globals.css, image sizing handoffs). Run node node_modules/typescript/bin/tsc --noEmit in prototype/. Do not commit."

run_verify
run_after_shots

echo "Optimize run complete. Run e2e: cd prototype && PLAYWRIGHT_BASE_URL=http://localhost:3100 npm run test:e2e"
