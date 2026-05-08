#!/bin/bash
# skills/sync.sh — Sync skills from canonical source to each agent's skills directory
#
# Usage:
#   ./skills/sync.sh           — sync all skills to all declared agents
#   ./skills/sync.sh claude    — sync only to Claude
#   ./skills/sync.sh agents    — sync only to Antigravity
#   ./skills/sync.sh codex     — sync only to Codex
#   ./skills/sync.sh gemini    — sync only to Gemini CLI
#
# Skills with an AGENTS.txt file go to the listed agents.
# Skills without AGENTS.txt go to claude only.

set -euo pipefail

CANONICAL="$(cd "$(dirname "$0")" && pwd)"
TARGET_FILTER="${1:-}"

agent_path() {
  case "$1" in
    claude) echo "$HOME/.claude/skills" ;;
    agents) echo "$HOME/.agents/skills" ;;
    codex)  echo "$HOME/.codex/skills" ;;
    gemini) echo "$HOME/Documents/gemini-test/skills" ;;
    *)      echo "" ;;
  esac
}

substitute_paths() {
  local file="$1"
  sed -i '' \
    's|C:\\Users\\tomew\\Documents\\agent-test|/Users/tom/Documents/agent-test|g
     s|C:/Users/tomew/Documents/agent-test|/Users/tom/Documents/agent-test|g' \
    "$file" 2>/dev/null || true
}

sync_skill() {
  local skill_dir="$1"
  local skill_name
  skill_name="$(basename "$skill_dir")"

  [[ -d "$skill_dir" ]] || return
  [[ "$skill_name" == "archive" ]] && return

  local agents_file="$skill_dir/AGENTS.txt"
  local targets
  if [[ -f "$agents_file" ]]; then
    read -r targets < "$agents_file"
  else
    targets="claude"
  fi

  for agent in $targets; do
    [[ -n "$TARGET_FILTER" && "$agent" != "$TARGET_FILTER" ]] && continue

    local dest
    dest="$(agent_path "$agent")"
    if [[ -z "$dest" ]]; then
      echo "  WARN: unknown agent '$agent' in $skill_name/AGENTS.txt"
      continue
    fi

    mkdir -p "$dest/$skill_name"
    rsync -a --delete "$skill_dir/" "$dest/$skill_name/"

    if [[ -f "$dest/$skill_name/SKILL.md" ]]; then
      substitute_paths "$dest/$skill_name/SKILL.md"
    fi

    echo "  ✓ $skill_name → $agent"
  done
}

echo "Syncing skills from: $CANONICAL"
echo "Filter: ${TARGET_FILTER:-all agents}"
echo ""

for skill_dir in "$CANONICAL"/*/; do
  sync_skill "$skill_dir"
done

echo ""
echo "Sync complete."
