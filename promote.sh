#!/usr/bin/env bash
# promote.sh — run all structural tests, then merge dev into main.
# Run from the agent-test root on the dev branch.
# Usage: bash promote.sh

set -e

echo ""
echo "=== Running structural tests ==="
echo ""

echo "--- bar-chart-race ---"
(cd Projects/Remotion/bar-chart-race && npm test)

echo ""
echo "--- simple-narrated-slides ---"
(cd Projects/Remotion/simple-narrated-slides && npm test)

echo ""
echo "--- whiteboard-explainer ---"
(cd Projects/Remotion/whiteboard-explainer && npm test)

echo ""
echo "=== All tests passed. Merging dev → main ==="
echo ""

git checkout main
git merge dev --no-ff -m "promote: merge dev into main"
git checkout dev

echo ""
echo "=== Done. Back on dev branch. ==="
echo ""
