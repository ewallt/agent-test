# Skill: Design Pattern 003 — Single Notebook

## What This Is
Pattern 003 handles topics that fit naturally into one notebook with 3-5 videos.
Input: a parsed task (topic + optional fields).
Output: a single well-formed JSON object ready for the json/ handoff folder.

## When to Use This Pattern
Use Pattern 003 when:
- Topic is self-contained and bounded
- No obvious natural subdivisions into major sub-topics
- 3-5 videos would cover it adequately
- Decomposing it would feel artificial or produce shallow content

Examples:
- A cognitive bias (availability heuristic, confirmation bias)
- A specific historical event (Battle of Midway, Cuban Missile Crisis)
- A single concept or theory (game theory, supply and demand)
- A focused book or argument (Overy's Why the Allies Won)

Do NOT use Pattern 003 when:
- Topic spans multiple major phases or dimensions that each deserve depth
- Initial assessment suggests 6+ videos would be needed
- Topic has clear natural subdivisions (use Pattern 004 or higher)

## Step 1: Assess the Topic
Ask:
1. Can this be thoroughly covered in 3-5 videos?
2. Are there natural subdivisions? If yes, how many and how substantial?
3. How much source material exists? (Narrow topics may have less)
4. What is the natural depth — survey or deep dive?

If answers point to a single notebook, proceed. If subdivisions are substantial, escalate to Pattern 004.

## Step 2: Determine Video Count
Default: 3 videos. Adjust based on:
- **3 videos**: Focused topic, clear 3-angle treatment, or Tom specified 3
- **4 videos**: Topic has 4 meaningfully distinct angles, none reducible
- **5 videos**: Genuinely rich topic with 5 clear dimensions — use sparingly

If Tom specified a video count, use it. Otherwise use judgment.

## Step 3: Set Depth
- **deep**: Topic warrants thorough treatment, sources likely rich, Tom wants to understand it fully
- **survey**: Topic is broad even within single notebook scope, or serves as orientation

Default: deep. Use survey only when topic breadth within one notebook is clearly wide.

## Step 4: Construct the Research Query
- Start with the topic as written
- If framing or guidance narrows the angle, sharpen the query accordingly
- Make it specific enough to find high-quality sources, not so narrow it misses relevant material

Examples:
- Topic: "The Availability Heuristic" → Query: "availability heuristic risk perception Kahneman Tversky decision-making examples"
- Topic: "Stoic Philosophy" + guidance "practical modern application" → Query: "Stoic philosophy practical application modern life Marcus Aurelius Epictetus"

## Step 5: Use or Write the Guidance
Guidance is context for Claude — it informs source selection, query refinement, and
most importantly, how to design focus angles for each video. It is never passed directly
to NotebookLM. Claude reads it and translates it into tight per-video `--focus` prompts.

**If Tom (or an upstream AI) provided guidance in the task file:**
Read it carefully. It may describe what each video should cover, what angles matter,
what the topic is really about, or what the intended audience needs. Use it directly —
do not discard or overwrite it. You may expand or sharpen it, but honor the intent.

**If no guidance was provided:**
Construct it yourself based on the topic and pattern assessment:
- What are the most important or interesting dimensions of this topic?
- What would make each video distinct and useful?
- What is the notebook for — learning, reference, sharing?

Good guidance is specific, angle-oriented, and actionable.
Poor guidance is generic ("cover the main points") or overly restrictive.

**Note on focus angles:**
Individual video focus angles are written at execution time (not in the JSON) and should
each be a single tight directive — one angle, one idea. NotebookLM follows focus prompts
loosely; if you give it a list, it picks the most compelling item and may drop the rest.
Guidance informs what those focus angles should be. See skill-video-strategy.md.

## Step 6: Produce the JSON
Assemble all fields into a valid JSON object:

```json
{
  "topic": "<topic as written or lightly cleaned up>",
  "videos": <number>,
  "style": "retro_print",
  "format": "explainer",
  "depth": "<deep or survey>",
  "query": "<research query if different from topic>",
  "guidance": "<constructed guidance string>"
}
```

Omit `query` if it would be identical to `topic`.
Omit `framing`, `audience`, `purpose`, `focus_angles` unless specifically needed —
the guidance string carries most of that weight.

## Step 7: Save to JSON Folder
Write the JSON as a single-element array to:
`C:\Users\tomew\Documents\agent-test\playlists\json\<task-filename>.json`

Example: if task file was `stoics.txt`, save to `playlists\json\stoics.json`.

## Notes
- Style is always `retro_print` unless Tom specified otherwise in the task file
- Format is always `explainer` unless Tom specified `brief`
- This pattern produces exactly one JSON object (one notebook)
- After saving to json/, hand off to the calling workflow to trigger next steps
