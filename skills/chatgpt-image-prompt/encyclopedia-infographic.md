# Encyclopedia Infographic — Instructions

## What this produces

A full structured text prompt for ChatGPT Images 2.0 that generates a single-page
encyclopedia knowledge poster with:
- A hyper-realistic 3D pop-out central subject (portrait for people, lifelike illustration for animals/plants)
- 8 subject-specific knowledge modules with real, specific content
- A connection network linking everything
- Dense scientific annotation in vintage naturalist / academic journal style
- Aspect ratio 4:5

---

## Step 1 — Gather inputs

You need three things:
- **Subject Type**: Animal, Plant, or Person
- **Subject Name**: e.g., The Mantis Shrimp, Marie Curie, The Venus Flytrap
- **Scientific Name** (if applicable): e.g., *Odontodactylus scyllarus* — leave blank for people

If any are missing, ask before proceeding.

---

## Step 2 — Generate 8 subject-specific modules

This is the heart of the work. Do NOT leave modules as vague placeholders.
Every module must have:
- A clear bold NAME (e.g., "ANATOMICAL CROSS-SECTION")
- Specific illustrated content described in detail — diagrams, timelines, charts, sub-panels
- Real facts, labeled elements, and annotated details for that subject

### What makes a good set of 8 modules

Good modules together give a complete picture. Aim for variety across:
- **Structure** (anatomy, morphology, chemistry)
- **Process** (lifecycle, behavior, method, discovery arc)
- **Context** (history, geography, ecology, culture)
- **Impact** (legacy, applications, influence, significance)
- **Comparison** (relatives, rivals, predecessors, scale)

Avoid 8 variations on the same type. A set with 4 anatomy modules is weak.
The Einstein example is the gold standard: biography, theory, discovery, quantum,
brain, world map, cultural impact — each completely different.

### Module defaults by subject type

**Person:**
1. Biographical timeline — illustrated key dates and events
2. Core theory or method — diagrams of their central contribution
3. Key discovery or work — the specific breakthrough, with annotated diagrams
4. Debates or controversies — rivals, critics, competing ideas
5. Influence map — who they mentored, who influenced them
6. Cognitive profile or working method — how they thought and worked
7. World influence map — institutions, countries, named after them, predictions confirmed
8. Cultural legacy — popular image, quotes, lasting archetype

**Animal:**
1. External anatomy — labeled diagram of the whole animal
2. Internal anatomy or physiology — cross-section or key system
3. Geographic distribution — world or regional map with habitat overlay
4. Lifecycle — illustrated stages from birth to maturity
5. Feeding behavior and diet — method, prey, ecological role
6. Unique adaptations — the things that make it extraordinary
7. Evolutionary history — lineage, closest relatives, divergence timeline
8. Conservation status and threats — IUCN status, population trend, human impact

**Plant:**
1. Botanical anatomy — labeled external diagram (roots, stem, leaves, flower, fruit)
2. Reproductive structures — flower or seed anatomy in detail
3. Lifecycle — germination through senescence
4. Geographic distribution and native range — map with climate overlay
5. Ecological relationships — pollinators, seed dispersers, symbioses
6. Active compounds or mechanisms — chemistry (for carnivorous plants: trapping mechanism)
7. Medicinal, industrial, or cultural uses — historical and modern
8. Related species and taxonomy — family tree or notable relatives

These are starting points, not rules. Adapt them to what's most interesting about the
specific subject. A mantis shrimp warrants a visual system module. A Venus flytrap
warrants a trap mechanism module. Use judgment.

---

## Step 3 — Write the full prompt

Once you know the subject and have planned 8 modules, write the complete structured
text prompt below. Fill in every section with real, specific content.

**Do not output a skeleton.** Every module description must contain actual facts,
specific elements, and what the AI should illustrate — not just the module's name.

Use the Einstein example as the quality benchmark: each module description is a
paragraph that tells the AI what to draw, label, and annotate.

---

## Prompt template

Output this as a clean text block, ready to paste directly into ChatGPT:

---

```
Role: World-class Scientific Encyclopedia Illustrator & Knowledge Graph Architect.

Task: Generate a highly detailed, extremely intricate, and visually stunning "Universal Illustrated Encyclopedia Science Infographic" in a classic, unbranded (NO logos) scientific encyclopedia style.

Subject: [Subject Type] — [Subject Name] ([Date range or scientific name if applicable])

Style: Fine, detailed scientific illustration on a retro, aged beige/cream paper background. Delicate ink linework [adapt style note to subject type — e.g., "combining portrait engraving tradition with blueprint-style scientific diagrams" for people; "in the tradition of 18th–19th century natural history plates" for animals/plants]. Inspired by vintage academic journals and scientific monographs.

---

KEY VISUAL REQUIREMENTS:

1. Lifelike 3D Pop-Out Central Subject:

[Write a specific, vivid description of the central figure — what it looks like, how it's posed, what makes it visually dramatic. For people: engraved portrait style, specific physical details, expression, what they're doing. For animals: full body or portrait, specific pose, dramatic lighting. For plants: the most visually striking form — flowering, cross-section, with characteristic features prominent. The figure must burst forward from the page with anamorphic 3D pop-out effect.]

2. Layout & Strategic White Space:

- Central Subject: Dominates the center with intentional strategic white space immediately surrounding it.
- Surrounding Modules: 8 distinct, tightly organized knowledge modules filling left, right, top, bottom, and corners. Each with clearly ruled border, bold serif header, and dense illustrated content.

3. Connection Network:

Complex web of fine leader lines, arrows, dotted lines, brackets, and notation pointers connecting the central subject to all modules and cross-linking modules to each other.

4. Text & Annotation:

- Main Title: Large, beautifully hand-lettered serif title "[SUBJECT NAME]" with subtitle "[subtitle — scientific name in italic, or dates and title for people]" in elegant italic underneath.
- All module headers in bold uppercase serif.
- Every diagram element annotated with precise English leader lines.
- [Scientific terms / mathematical terms / botanical terms] in italic throughout.
- [Professor's chalkboard-style / naturalist's field journal] handwritten notes in margins.

---

MODULE STRUCTURE (8 Modules):

[Write each module as: Module N — HEADER IN CAPS, followed by a full paragraph describing exactly what the module contains — specific elements to illustrate, what gets labeled, key facts to include. Be as specific as the Einstein example. This is what you are writing for the AI to render.]

Module 1 — [NAME]
[Full description of content, diagrams, labels, and specific facts]

Module 2 — [NAME]
[Full description...]

Module 3 — [NAME]
[Full description...]

Module 4 — [NAME]
[Full description...]

Module 5 — [NAME]
[Full description...]

Module 6 — [NAME]
[Full description...]

Module 7 — [NAME]
[Full description...]

Module 8 — [NAME]
[Full description...]

---

OVERALL COMPOSITION:

Ultra-dense information in 8 structured modules. Strategic empty space around the central [portrait/figure/illustration] allows the hyper-realistic 3D pop-out subject to dominate. No logos or branding. All annotations in clear English. Serif typography for titles; italic for [scientific names / equations / botanical terms]; [naturalist's cursive / professor's chalk-style] for margin notes. Aspect Ratio: 4:5.
```

---

## Output

Output the completed prompt as a plain text block. No preamble. No JSON. No explanation before it.

After the prompt, add one line:

> **Paste directly into ChatGPT Images 2.0. Use thinking mode for best results.**
