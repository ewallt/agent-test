---
name: Shutdown skill — follow steps in order
description: Follow the shutdown skill steps in sequence; don't skip or reorder them
type: feedback
---

Follow the shutdown skill steps in strict order: (1) handoff discussion, (2) session log, (3) pending update, (4) tasks.json, (5) git commit. Do not skip steps or reorder them based on what seems most urgent.

**Why:** In a session, the shutdown skill was invoked but the session log (Step 2) was not written until Tom asked whether restarting would leave Claude in a good state — which prompted writing it. It should have been done as part of the skill without any nudge.

**How to apply:** When /shutdown is invoked, work through each step explicitly and in order. Do not jump ahead to handoff questions without completing the preceding steps.
