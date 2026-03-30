# Workflow Principles

A standing orientation lens for every session. Read this to understand the general failure pattern
and the counter-strategy framework that governs how work is done in this project.

---

## The Core Problem: Context Drift and Improvisation

Claude starts each session with incomplete or stale context. Without a forcing function, gaps get
filled by improvising from whatever documents happen to be loaded — producing inconsistent,
error-prone behavior that degrades over time.

**Compounding factors:**
- Instructions spread across multiple files create conflicts
- Skills that are thin pointers get bypassed; Claude reads the underlying doc directly
- No verification at step boundaries means errors propagate silently
- Each session is effectively a fresh agent inheriting debt from prior sessions

---

## The Counter-Strategy Framework

**Skills as forcing functions**
A skill that is invoked is harder to bypass than a document that might be read. Skills own their
workflows — documents inform them.

**JIT sequencers**
Skills that gate each step with READ NOW and ✓ verification. Context is loaded exactly when needed,
not front-loaded at session start and forgotten by step 4.

**Single source of truth**
Each behavior is owned by one place. Conflicting instructions get consolidated, not accumulated.

**Skills-first directive**
It is a rule, not a preference, to invoke the relevant skill before executing any established
workflow. Before any repeatable task without a skill, ask Tom if we should build one first.

---

## The Meta-Insight

The problem isn't any single failure — it's that without structure, each session rediscovers the
right approach. The solution is encoding that approach into skills that drive behavior, rather than
relying on Claude to remember it.

When something goes wrong, the question to ask is: **where did structure break down?**
- Was a skill not invoked?
- Did a step proceed without verification?
- Did Claude improvise instead of reading?
- Is there a conflict between two sources of truth?

Answering that question points to the fix.
