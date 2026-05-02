---
name: playlist-ideas
description: Generate new video topic ideas for a given playlist, automatically checking what's already been done to avoid duplicates. Use this skill whenever Tom asks for video ideas, topic suggestions, or "what should we do next" for any playlist — History Potpourri, Geography Potpourri, World War Two, Movements in Modern Art, Big Ideas, etc. Also use when Tom asks for a specific number of ideas (e.g. "give me 8 GP videos").
---

# Playlist Ideas

Generates specific video topic ideas for a playlist, distributed across underrepresented structural categories, filtered against what's already been done.

Two modes:
- **Default (Tom asks for N ideas):** Go all the way to specific video topics — do not stop to ask Tom to pick categories.
- **Category mode (Tom explicitly asks for "generating ideas" or "categories"):** Present the 13 categories and wait for Tom to pick before suggesting topics.

## Step 1 — Load existing videos

Read `C:\Users\tomew\Documents\agent-test\documents\video-dashboard-data.json`.

Filter by the requested playlist name. Collect all `title` values. Hold in memory; do not display unless Tom asks.

## Step 2 — Identify underrepresented categories (default mode only)

The 13 structural categories are:
1. Coincidences
2. Small causes with big effects
3. Near-misses
4. Wrong turns
5. Accidental discoveries
6. The thing invented twice
7. The expert consensus that was completely wrong
8. The solution that created a bigger problem
9. The fake that became real
10. The prediction that came true
11. The decision that almost went the other way
12. The discovery hiding in plain sight
13. The wrong person in the right place

Read the existing video titles and reason about which categories they represent. Pick 2–3 categories that are least represented (or not represented at all) in the existing list. These are the categories to generate from.

## Step 3 — Distribute and generate

Distribute N ideas across the chosen categories (e.g. for 8 ideas across 3 categories: 3 + 3 + 2). For each category, generate enough specific topic ideas to fill its allocation. Topics must:
- Fit the category's structural angle
- Fit the playlist's subject scope and tone
- Be narrow and specific — one incident, one place, one chain of events
- Have a clear surprising angle or irony

## Step 4 — Filter and present

Remove any idea that closely matches an existing video (same subject, same angle). A close match means a viewer who saw the existing video would feel they already got this one.

Present as a numbered list. Lead each idea with a proposed YouTube-style title, followed by one sentence on the angle. Group by category with a brief header.

If fewer ideas survive filtering than requested, note the gap and offer to generate from another category.
