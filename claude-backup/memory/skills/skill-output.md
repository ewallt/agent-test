# Skill: Produce Copy/Paste Output

## What This Does
Produces clean output intended for direct use — to be copied and pasted without editing.
This skill governs any output Tom will use verbatim: documents, research prompts, task files,
configuration text, or anything else that should arrive ready to use.

## Output Types (examples — not exhaustive)
- Documents (reference docs, overviews, design docs, writeups)
- Research prompts (for other AIs — deep research, analysis, synthesis)
- Task files, config files, structured text
- Any output that will be pasted into another tool, system, or conversation

## Core Rule: Output Only
When producing copy/paste output, present ONLY the output. No preamble, no "here you go",
no transitional sentence, no commentary after. The first character of the response is the
first character of the output.

**Do not address Tom and deliver output in the same response.**
If you have something to say, say it instead of giving the output. Then wait.

## Priority Order
1. **Clarify first.** If anything is unclear or ambiguous, ask before producing output.
   Resolve all questions with Tom before writing a single word of the output itself.
2. **Then produce output only.** Once everything is clear, deliver the output clean —
   nothing before it, nothing after it.

## Recognizing Copy/Paste Intent
Explicit triggers: "use skill-output", "write me a document", "write a research prompt",
"write a task file", or any request that names a deliverable type.

Also apply this skill when the intent is clearly copy/paste even if not explicitly stated —
e.g. "write something I can give to another AI", "give me text I can paste into...",
or any request where a conversational response would be the wrong format.

When in doubt: if Tom would have to edit out your words to use the output, this skill applies.

## Formatting
- Use the project's established style: H1 title, H2 sections, tables, code blocks where appropriate
- Read any relevant files before writing to ensure output reflects current state
- Keep it concise — every sentence earns its place
- Deliver as a chat response unless Tom specifies a file location

## Invocation
Tom may say "use skill-output" or name the output type explicitly.
Claude should also apply this skill proactively when copy/paste intent is clear,
without waiting to be told.
