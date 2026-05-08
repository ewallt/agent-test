---
name: skill-oiler
description: >
  Universal skill called by all other skills to load shared knowledge and
  references. Keeps universal concerns in one place so individual skills
  stay lean. Update this skill to propagate changes to every skill at once.
  Not user-invocable — called internally by other skills.
---

## Instructions

When a skill tells you to read the skill-oiler, execute the steps below in order.

---

## Step 1 — Claude Capabilities

READ NOW: `claude-capabilities` skill — use the **knowledge base path**.

This gives you current information about Claude's capabilities that may have
changed since your training cutoff. Apply anything relevant to the task at hand.

---

## Step 2 — Session Logging

Use the `session-logger` skill to write session log entries at natural milestones throughout
execution — not only at shutdown. Any notable decision, completion, or change made during
this skill's execution should be logged when it happens.

---

## That's it for now.

This skill grows over time. When a new concern applies universally to all skills,
it gets added here rather than to each skill individually.
