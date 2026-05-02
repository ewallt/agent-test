---
name: feedback_skill_creator
description: Always use the skill-creator skill when creating or modifying skills — do not write SKILL.md directly
type: feedback
---

When creating a new skill or modifying an existing one, always invoke the `skill-creator` skill first. Do not write SKILL.md files directly without going through skill-creator. The skill-creator runs evals, tests trigger accuracy, and benchmarks performance — skipping it means skills are untested.

This is Claude's responsibility to enforce, not Tom's.
