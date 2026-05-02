---
name: skill-creator
description: Create new skills, modify and improve existing skills, and measure skill performance. Use when users want to create a skill from scratch, edit, or optimize an existing skill, run evals to test a skill, benchmark skill performance with variance analysis, or optimize a skill's description for better triggering accuracy.
---

## Local Augmentations

Before proceeding, read the base skill:

READ NOW: `C:\Users\tomew\.claude\skills\skill-creator\SKILL.pristine.md`

Then apply the following project-specific additions:

---

## Capabilities Check

Before designing any new skill, read the `claude-capabilities` skill and use the **notebook path** to query for any capabilities relevant to what the skill is trying to do. This ensures the skill is designed around what Claude can actually do today, not what it could do at training cutoff.

---

## JIT (Just-In-Time) Instruction Delivery

For multi-step workflows, design skills around JIT instruction delivery: detailed instructions are read at the moment of use, not all upfront.

READ NOW: `references/jit-instruction-delivery.md`

Apply JIT when:
- The skill orchestrates a multi-step sequence.
- Different steps need different tools, sub-skills, references, schemas, examples, or checklists.
- Agent drift, skipped steps, or misremembered early rules are real risks.

When creating or updating a multi-step skill, prefer:
- `SKILL.md` as the short workflow orchestrator.
- `references/` for phase-specific rules, examples, checklists, and schemas.
- `READ NOW: references/<file>.md` at the exact step where each reference is needed.

---

Proceed with the base skill instructions from SKILL.pristine.md.

