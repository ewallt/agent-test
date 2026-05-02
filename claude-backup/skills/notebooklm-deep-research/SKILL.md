---
name: notebooklm-deep-research
description: Generate effective Deep Research prompts for NotebookLM's Discover Sources feature, and guide source curation after results return. Use this skill whenever Tom wants to populate a NotebookLM notebook with web sources, is starting a new notebook from scratch, wants to know what query to use for Deep Research, asks how to find sources on a topic, or is building a meta notebook and needs a research strategy. Trigger on "deep research", "discover sources", "find sources for a notebook", "what should I search for", or any time a notebook needs to be populated.
---

# NotebookLM Deep Research Guide

Helps write full Deep Research prompts and guides source curation after results return. Deep Research is NotebookLM's agentic source discovery feature — it browses hundreds of websites, synthesizes findings into a multi-page report, and returns 40–50 sources to import.

The goal for meta notebooks is a curated set of sources Claude can query effectively — the notebook becomes a knowledge base Tom can invoke on demand. A well-written prompt produces high-quality, relevant sources; a vague one produces generic noise.

**The prompt is the primary control lever.** Everything downstream depends on it.

---

## Step 1 — Understand the Goal

Ask (or infer from context):
- **Topic** — what is the notebook about?
- **Purpose** — meta notebook (Claude will query it), human research, web app source material?
- **Scope** — broad landscape survey, or a specific angle within a known domain?
- **Seed document?** — does Tom already have a high-quality anchor document? If so, the prompt can be more targeted.

For meta notebooks, the purpose shapes the prompt significantly: Claude needs concrete, queryable knowledge — techniques, patterns, examples, implementation specifics — not high-level conceptual overviews.

---

## Step 2 — Write the Deep Research Query

Deep Research queries are **detailed research briefs**, not search queries. A one-sentence query produces generic sources. A well-formed query describes the topic, frames the angle, specifies subtopics to cover, names preferred source types, and signals what to exclude. Think of it as briefing a research assistant, not typing into a search box.

The query is passed directly to `nlm research start` as the QUERY argument — it runs via CLI, not manually through the NotebookLM UI.

**Anatomy of a strong query:**

1. **Opening statement** — what the research is for and what the notebook should contain
2. **Specific subtopics to cover** — named areas within the domain, not just the parent topic
3. **Source type signals** — what kinds of sources to find (academic papers, practitioner guides, official docs, tutorials, case studies)
4. **Angle or framing** — what aspect matters: current best practices, technical implementation, research findings, open debates
5. **Time horizon** (if relevant) — "2022–2025," "current state," "emerging work"
6. **Explicit exclusions** — what to skip (introductory overviews, SEO blog posts, marketing content)

**For meta notebooks specifically:** Emphasize concrete, actionable knowledge over conceptual overviews. Signal this explicitly: ask for "implementation guides," "technique references," "code examples," "practitioner case studies" — not "introductions to" or "overviews of." The notebook will be queried for specific how-to guidance, so sources that explain *how* beat sources that explain *what*.

---

## Step 3 — Example: Weak vs. Strong

**Weak (one-sentence query):**
```
UX design for educational web apps
```

**Strong (full research brief):**
```
I'm building a reference notebook on UX and interaction design patterns for
educational and reference web applications — to be queried for concrete design
guidance when building apps.

Please find sources covering:
- Interaction design patterns specific to learning interfaces (progressive
  disclosure, scaffolding, feedback loops, navigation)
- Visual hierarchy and information architecture for content-heavy apps
- Engagement mechanics that work in educational contexts (not gamification
  theory — concrete UI patterns)
- Accessibility considerations for web apps
- Color, typography, and layout decisions that affect usability
- Case studies and teardowns of well-designed educational or reference apps
- Practitioner guides and design system documentation (e.g., from established
  design teams)

Prefer: practitioner guides, design system docs, usability research, UX case
studies, articles from experienced designers with concrete recommendations.

Avoid: generic "10 tips for UX" blog posts, marketing content, introductory
overviews aimed at beginners, SEO-driven listicles.

Time range: 2020–2025 preferred, though foundational material is fine if it
remains current practice.
```

The difference: the strong version tells Deep Research what subtopics to cover, what source quality to target, and what to skip. It gets sources Claude can actually use.

---

## Step 4 — Choose: Deep vs. Fast Mode

Both run via CLI: `nlm research start "<query>" --notebook-id <id> --mode [deep|fast]`

| Situation | Use |
|---|---|
| Starting from scratch, topic landscape unfamiliar | `--mode deep` |
| Want broad coverage, 40–50 sources | `--mode deep` |
| Strong seeds already exist, need a few more | `--mode fast` |
| Speed matters, topic is well-bounded | `--mode fast` |
| Adding one specific type of source | `--mode fast` |

`--mode deep`: ~5 min, ~40–50 sources. 20/day on Pro.
`--mode fast`: ~30 sec, ~10 sources. Use freely.

---

## Step 5 — Source Curation Guidance

After Deep Research returns, guide Tom through what to select and deselect:

**Import:**
- The synthesis report (top item in the Sources panel) — always import; it's immediately queryable and provides dense coverage
- Academic papers and peer-reviewed research
- Authoritative practitioner guides and official documentation
- Tutorials and implementation references with concrete depth

**Deselect:**
- Paywalled sources — they appear in the list but can't be read; importing wastes a source slot
- SEO content farms and aggregator blogs
- Wikipedia and generic overviews (fine as supplementary, weak as primary sources)
- Dated material if recency matters — check publication dates

**Practical check:** Expect 20–30% of returned sources to be paywalled or low-quality. Curating down to 15–25 strong sources from 40–50 returned is normal and correct.

---

## Step 6 — Multi-Pass Strategy (if needed)

Suggest chaining queries when the topic is large or multi-faceted:

1. **First pass** — broad prompt to map the landscape
2. **Gap check** — query the notebook: "What subtopics or angles are missing from the current sources?"
3. **Second pass** — targeted prompt on the specific gap
4. **Repeat** as needed

Each pass's synthesis report becomes a source for the next layer. This is the right approach when one query can't cover the full scope without becoming too vague.

Recommend multi-pass when:
- The topic has 3+ distinct subtopics that each warrant depth
- A single prompt would need to be so broad it loses precision
- The first pass reveals a promising angle worth its own focused run

---

## Output Format

Produce:
1. **The Deep Research prompt** — full research brief, copy-pasteable, ready to paste into the Discover search box. This is the primary output — make it thorough.
2. **Mode recommendation** (Deep vs. Fast) with one-line rationale
3. **Curation guidance** — brief, specific to the topic: what to prioritize, what to skip
4. **Multi-pass suggestion** if warranted — include the follow-up angle and a starter prompt for it
