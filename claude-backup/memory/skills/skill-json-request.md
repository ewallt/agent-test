# Skill: Process JSON Notebook Request

## What This Does
Receives a JSON notebook request (per notebook-request-spec.md) and executes the
full ephemeral notebook build workflow for each request in the array.

## Input Format
A JSON array of notebook request objects. See notebook-request-spec.md for full spec.
Minimum required field per object: `topic`.

## How to Process Each Request

### 1. Parse the JSON
Extract all fields. Apply defaults for any omitted optional fields:
- `videos` → 3
- `style` → `retro_print`
- `format` → `explainer`
- `slideshow` → `no`
- `slides` → 5 (if `slideshow: yes` and `slides` is omitted)
- `app` → `no`
- `remotion` → `no`
- All other optional fields → Claude decides based on topic and sources

### 2. Derive missing fields
- If `query` is omitted, use `topic` as the research query
- If `framing`, `depth`, `audience`, or `purpose` are provided, use them to shape:
  - The research query (make it more specific)
  - Source selection criteria (what to prioritize)
  - Focus angle design (what each video should emphasize)
- If `focus_angles` are provided, use them directly (one per video, matched to best source)
- If `focus_angles` are omitted, design them after reviewing imported sources
- If `guidance` is provided, treat it as high-priority context that informs all decisions:
  source selection, query refinement, focus angle design, and anything else it touches.
  Guidance is free-form and may contain anything — read it carefully before proceeding.

### 3. Execute the workflow
Follow workflow-playlists.md for each request in sequence.
Key steps:
1. Auth check
2. Create notebook (title = `topic`)
3. Sources — determined by `research` and `copied-text` flags (see skill-copied-text.md):
   - `research: yes` (default) → run research + import sources
   - `copied-text: yes` → add copied text file as a source (see skill-copied-text.md)
   - Both may be yes — research runs first, then copied text source is added
4. Select best N sources (N = `videos`)
5. If `app: yes`, `slideshow: yes`, or `remotion: yes` → READ workflow-playlists.md Step 4.5 NOW and execute before queuing videos:
   - `app: yes` → Briefing Doc report → content survey → build web app → add as source
   - `slideshow: yes` → READ skill-slideshow-manifest.md NOW and generate the manifest
   - `remotion: yes` → Placeholder; skill not yet built — log in handoff report and skip
6. Queue N videos (`--style`, `--format`, `--focus`, `--source-ids` per video)
7. Share notebook publicly
8. Download all videos locally after render
9. Hand off to Tom

### 4. Multiple requests
Process one notebook at a time through steps 1-6 (create → research → queue videos → share).
All notebooks can have videos rendering simultaneously — no need to wait for renders
before starting the next notebook. Download step (7) happens after all renders complete.

### 5. Handoff report
For each notebook, report:
- Notebook title and ID
- Shareable URL
- Artifact IDs and focus angles for each video
- Local download paths (after render)
- If `app: yes`: app file path, focus angles used
- If `slideshow: yes`: manifest artifact ID, download path, slide count and themes used
- If `remotion: yes`: note that skill is not yet built
- Any decisions made for omitted fields (so Tom can evaluate them)

## Notes
- Always confirm with Tom before deleting any notebook
- If `focus_angles` are provided but count doesn't match `videos`, flag it before proceeding
- If any field value is ambiguous or contradictory, note it in the handoff report
- See workflow-playlists.md for full command syntax
