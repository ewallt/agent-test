# YouTube Playlists Guide

A reference for all active YouTube playlists — editorial focus, idea sourcing, and what makes a good video for each.

Technical config (playlistIds, descriptions, hashtags) lives in `youtube-playlists.json`.

---

## History Potpourri

**What this playlist is:** Short, specific historical stories with a surprising angle. The best videos feel like the moment you learn something you can't believe you didn't already know.

**Editorial themes to draw from:**
- Coincidence — two unrelated things colliding with massive consequences
- Small cause, big effect — a wrong turn, a wrong resistor, a stalled engine
- The near-miss — a disaster that almost happened, or a victory that almost didn't
- The unexpected chain of contingency — a failed attempt, a retreat, and then fate drops the target back in front of you (Sarajevo)
- The wrong person in the right place — someone stumbles into a historic moment they had no business being part of
- The decision that was almost made differently — a famous outcome that hinged on one person changing their mind, or almost changing it
- The thing that was obviously wrong but turned out right — Columbus's math, an experiment that "failed" productively
- The discovery hiding in plain sight — something that could have been found centuries earlier but wasn't
- The fake that became real — a deception, forgery, or fiction that had genuine historical consequences
- The expert consensus that was completely wrong — the establishment said no, the outlier was right
- The solution that created a bigger problem — an intervention with unintended consequences that dwarfed the original issue
- The parallel lives — two people who never met but whose stories mirror each other across time or geography
- The thing that was invented twice — two people independently arrived at the same discovery, unknown to each other
- The prediction that came true / the error that worked out

**How to generate ideas:**
Tom brings a theme or concept (e.g. "something small that caused something big") and asks Claude for candidate stories. Claude suggests 5–10 specific historical incidents that fit the theme, Tom picks one, and a focus prompt is written from there.

**What makes a good topic:** Narrow and specific. One incident, one moment, one chain of events — not a broad era or movement. The focus prompt should identify the surprising angle and make the irony or contingency explicit.

**Examples:** The Wrong Turn at Sarajevo, The Wrong Resistor (pacemaker), Robertson's Titan, Able Archer 83.

---

## Movements in Modern Art

**What this playlist is:** Artist biographies tracing the arc of a career, a movement, or a legacy. More straightforward idea-wise — one artist per video.

**How to generate ideas:** Pick an artist from the Impressionist or post-Impressionist era (or adjacent movements). The video traces what made them distinctive, what they were actually solving, and why they matter.

**What makes a good topic:** An artist with a strong angle — a paradox, an underdog story, an outsized influence, or a gap between reputation and reality. Avoid artists whose story is only their biography with no distinctive lens.

**Examples:** Degas (calculated vs. spontaneous), Morisot (presence without recognition), Cézanne (dismantled the picture), Seurat (painting as science), Pissarro (the one everyone came through).

---

## World War Two

**What this playlist is:** A broad collection — battles, strategic overviews, intelligence operations, economic analysis, human stories. No single format.

**How to generate ideas:** Can be a specific operation or battle, a big-picture strategic argument (e.g. the economics of the Nazi war machine), or a human story with wider implications (e.g. Operation Mincemeat, codebreaking). The test is whether there's a strong angle, not whether it fits a template.

**What makes a good topic:** Either a well-known event with an underexplored angle, or a lesser-known story that illuminates something larger about the war.

**Examples:** Able Archer 83 (nearly triggered nuclear war), Kasserine Pass (defeat as transformation), The Closing Window (economic logic of Blitzkrieg), Operation Mincemeat, Codebreaking and the Atlantic.

---

## Lightened With His Glory

**What this playlist is:** Theologically driven videos on righteousness by faith, the everlasting covenant, and the character of God. Source material is primarily E.J. Waggoner and related writers. The goal is ideas that translate well cinematically — concrete, narrative, visually anchored.

**How to generate ideas:** Driven by theological themes in the source material. The key discipline is finding the cinematic angle — not "what does this text argue" but "what physical scene or human moment carries this idea." Ideas that work well are ones with a clear narrative arc or a single vivid image at the center.

**What makes a good topic:** A theological claim that can be grounded in a physical story — Abraham, a specific scene from the Gospels, a passage with a strong visual analog. Avoid topics that are purely argumentative with no narrative anchor.

**Examples:** The Promise Before the Law (Abraham arc), The Glory of the Cross, Galatians 2, Christ-Given Freedom.

---

## Behold Your God

**What this playlist is:** Based primarily on F.T. Wright's *Behold Your God*, exploring the character of God through the lens of the great controversy. Companion to the BYG animated video series.

**How to generate ideas:** Driven by the Wright source material, but can include related theological ideas. Approach is similar to Lightened With His Glory — theologically grounded, cinematic framing, same discipline of finding the visual/narrative anchor.

**What makes a good topic:** A theme from the Wright material with a strong cinematic angle, or a related idea that fits the playlist's focus on divine character, the cross, and what God is actually like.

**Note:** The BYG project also has a separate knowledge base at `Projects/BYG/documents/knowledge-base.md`.

---

## Tips for Healthy Aging

**What this playlist is:** Practical, science-backed videos on lifestyle factors that influence healthy aging and longevity. Based on current research — diet, exercise, sleep, environmental toxins, social connection, and emerging biomarkers.

**Concept — research-first (new workflow):** Unlike other playlists that draw on general knowledge, this one is research-backed. Source material comes from the Super Agers inspiration notebook (`780a38ee`) — Eric Topol's *Ground Truths* and related sources. The workflow is:

1. **Gather foci** — Query the Super Agers notebook to surface candidate video angles. Collect a list before writing anything.
2. **Select** — Tom picks which foci to develop.
3. **Write source docs** — Write cinematic scene source docs grounded in the query results (not general knowledge).
4. **Upload + generate** — Upload sources to Tips for Healthy Aging notebook (`e165ae6b`) and kick off cinematic videos.

**How to generate ideas:** Query the Super Agers notebook with open-ended prompts (e.g. "What are the most surprising or counterintuitive findings about diet and aging?"). Collect 8–12 candidate foci before proposing them to Tom.

**What makes a good topic:** A finding that is specific, surprising, or counterintuitive — something that challenges conventional wisdom or reveals an unexpected mechanism. Avoid vague advice ("exercise is good"); prefer a sharp angle ("VO2 max is the single strongest predictor of all-cause mortality — stronger than smoking").

**Topic list (15 foci — 10 from Tom + 5 from notebook query):**

1. Lifestyle
2. Diet
3. The AI Diet
4. Exercise ✓
5. Sleep
6. Environmental Toxins
7. Social Isolation and the Big Picture
8. Modern Keys to Health and Longevity
9. Optimizing Health and Longevity
10. Healthy Aging and Lifestyle Factors
11. The Blood Test That Predicts Alzheimer's Decades Early ✓
12. Your Biological Clocks: Tracking Organ-Specific Aging
13. The Brain's Nightly Wash Cycle ✓
14. Microplastics: From Arteries to the Brain ✓
15. The Gut Microbiome and Personalized Nutrition

---

## General Notes

- All playlists are currently in a skill-building phase. The primary goal is developing the craft of cinematic video production. Broader distribution strategy comes later when the technology matures.
- For all theological playlists (LWG, BYG): the same scene-writing discipline applies — physical anchor, embedded camera intent, no abstract narration without a visual scene to carry it. See `Projects/NotebookLM/ephemeral-notebook/documents/nlm-cinematic-scene-rules.md`.
- For all playlists: focus prompts are written per video and stored on the dashboard card. The focus prompt is the primary creative steering tool.
