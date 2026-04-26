# Ephemeral Notebook Workflow

Full end-to-end sequencer for running a notebook. Each step tells you what to read
before executing. Do not proceed to the next step until the current step is complete. ✓

---

## Step 0 — Pre-flight

**READ NOW:** `documents/source-authoring.md` — understand design patterns before continuing.

1. Check auth: `PYTHONIOENCODING=utf-8 nlm auth status`
2. If expired: `PYTHONIOENCODING=utf-8 nlm login`
3. Read the task file in `tasks/` — parse ALL flags before doing anything else

✓ Auth confirmed
✓ Task file parsed — flags noted: source pattern, videos, slides, slideshow, infographic, app

---

## Step 1 — Determine Design Pattern

| Task file field | Pattern |
|-----------------|---------|
| `source: claude-written` | Claude as Source — Claude writes all knowledge |
| `research: yes` | Research-based — NLM fetches sources from the web |
| `copied-text: yes` | Tom provides the source text directly |

✓ Design pattern identified

---

## Step 2 — Create the Notebook

```bash
PYTHONIOENCODING=utf-8 nlm notebook create "<topic title>"
```

✓ Notebook ID captured and noted

---

## Step 3 — Write and Upload Sources

**Upload order matters — knowledge base first, then slide manifest, then web app doc.**

### Claude as Source pattern

**Step 3a — Knowledge base document (always)**

**READ NOW:** `documents/source-knowledge-base.md`
⚠️ This document is a TODO stub. Ask Tom for guidance before proceeding.

- Save to: `staging/<key>.txt`
- Upload: `PYTHONIOENCODING=utf-8 nlm source add <notebook-id> --file staging/<key>.txt --title "<Topic>" --wait`

✓ Knowledge base written and uploaded

**Step 3b — Gemini slide manifest (if `slideshow: yes`)**

**READ NOW:** `notebooklm-slide-manifest` skill

- Save to: `slideshows/<key>.md`
- Upload: `PYTHONIOENCODING=utf-8 nlm source add <notebook-id> --file slideshows/<key>.md --title "<Topic> Slide Manifest" --wait`

✓ Slide manifest written and uploaded  *(skip if slideshow: no)*

**Step 3c — Web app knowledge document (if `app: yes`)**

**READ NOW:** `documents/source-web-app.md`
⚠️ This document is a TODO stub. Ask Tom for guidance before proceeding.

- Upload: `PYTHONIOENCODING=utf-8 nlm source add <notebook-id> --file <path> --title "<Topic> Web App Knowledge" --wait`

✓ Web app knowledge doc written and uploaded  *(skip if app: no)*

---

### Research-based pattern

**Step 3a — Run research**

```bash
PYTHONIOENCODING=utf-8 nlm research start "<query>" --notebook-id <id> --mode fast
PYTHONIOENCODING=utf-8 nlm research status <id> --max-wait 300
PYTHONIOENCODING=utf-8 nlm research import <id> <task-id>
```

✓ Sources imported — verify count with `nlm source list <id>`

**Step 3b — Query notebook to inform Claude-written sources**

```bash
PYTHONIOENCODING=utf-8 nlm notebook query <id> "<question>"
```

Use query results to write slide manifest and/or web app knowledge doc (Steps 3b/3c above).

---

## Step 4 — Generate NLM Artifacts

**READ NOW:** relevant artifact skill(s) for any artifact you are about to generate:
- Video → `notebooklm-video` skill
- NLM slides → `notebooklm-slide` skill
- Infographic → `notebooklm-infographic` skill

Run only what the task file flags indicate:

```bash
# Video (if videos: N)
PYTHONIOENCODING=utf-8 nlm video create <notebook-id> --style <style> --confirm

# NLM slide deck (if slides: yes)
PYTHONIOENCODING=utf-8 nlm slides create <notebook-id> --confirm

# Infographic (if infographic: yes)
PYTHONIOENCODING=utf-8 nlm infographic create <notebook-id> --orientation <o> --detail <d> --confirm
```

✓ All flagged artifacts triggered

---

## Step 5 — Poll and Download

```bash
PYTHONIOENCODING=utf-8 nlm studio status <notebook-id>
```

Wait for `completed` on each artifact, then download:

```bash
# Slides
PYTHONIOENCODING=utf-8 nlm download slide-deck <notebook-id> --output artifacts/<key>/<key>-slides.pdf

# Infographic
PYTHONIOENCODING=utf-8 nlm download infographic <notebook-id> --output artifacts/<key>/infographic.png

# Video — CLI download unreliable; note artifact ID, accessible in NLM UI
```

✓ All available artifacts downloaded

---

## Step 6 — Build Claude Artifacts

**Step 6a — Web app (if `app: yes`)**

**READ NOW:** `notebooklm-webapp` skill

Before building, query the notebook to get NLM's synthesized content from the sources. Use these responses to populate FOCUS_PROMPTS — do not rely on Claude's own knowledge of the topic.

```bash
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query <notebook-id> "<question about main themes>"
PYTHONIOENCODING=utf-8 /c/Users/tomew/.local/bin/nlm notebook query <notebook-id> "<question about specific angle>"
# repeat until all focus angles are covered
```

- Output: `apps/<key>.html`

✓ Web app built  *(skip if app: no)*

---

## Step 7 — Share and Wrap Up

```bash
PYTHONIOENCODING=utf-8 nlm share public <notebook-id>
```

- Move task file: `mv tasks/<key>.md completed/<key>.md`
- Append run log entry to END of `run-log.md`

✓ Notebook shared
✓ Task file moved
✓ Run log written

---

## Known Gotchas

- Always use `PYTHONIOENCODING=utf-8` prefix — missing it causes UnicodeEncodeError
- Research import may time out but succeed — check source count before retrying
- Video status often reports "unknown" — CLI download may fail; check NLM UI
- `nlm source add --wait` blocks until processed — always use it
- Session expires in ~20 min — re-run `nlm login` if commands start failing
- Always append run log to END of file — do not insert mid-file

---

## TODO Items

- `source-knowledge-base.md` — format and structure for the Claude-written knowledge base document
- `source-web-app.md` — format and structure for the web app knowledge document
