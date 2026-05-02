---
name: claude-capabilities
description: >
  Reference skill for Claude's current capabilities — what Claude can do,
  recent model releases, new features, and the current AI landscape. Use this
  skill when uncertain about Claude's own abilities, when a task might require
  a recently-added capability, or when building skills/tools that depend on
  knowing what Claude can and can't do. This skill exists because Claude's
  training has a knowledge cutoff and may not know about recent Anthropic
  releases or capability expansions. Called by skill-creator (notebook path)
  and skill-oiler (knowledge base path).
---

## Notebook Path
*Use this path when called by skill-creator.*

Query the NotebookLM notebook for current, detailed capability information.
Worth the network cost when designing something new.

**Notebook ID:** `9fece757-6ffb-4fb8-a03e-94481ee70574`
**Title:** Claude AI Capabilities — Bridging the Knowledge Cutoff
**Sources:** 53 (deep research, March 2026)
**Covers:** Claude 3.x/4.x model releases, Claude Code, extended thinking,
tool use, computer use, Cowork, benchmarks, Anthropic announcements

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query 9fece757-6ffb-4fb8-a03e-94481ee70574 "<your question>"
```

**Useful queries:**
- "What are the key capabilities of Claude Sonnet 4.6?"
- "What can Claude Code do that it couldn't do in earlier versions?"
- "Does Claude support X?" (computer use, voice, file uploads, etc.)
- "What's the difference between Claude [model A] and [model B]?"
- "How does Claude's extended thinking work?"
- "What are Claude's current context window limits?"

---

## Knowledge Base Path
*Use this path when called by skill-oiler.*

Read the local knowledge base document — lightweight, no network call.

**File:** `C:\Users\tomew\.claude\skills\claude-capabilities\knowledge-base.md`

*(This file is periodically refreshed from the notebook during capabilities
review sessions. If it doesn't exist yet, fall back to the notebook path.)*

---

## Updating This Skill

When the notebook is rebuilt (new models released, capabilities change):
1. Create a new notebook with updated research
2. Update the **Notebook ID** above
3. Update the sources count and date
4. Run a capabilities review session to refresh `knowledge-base.md`
