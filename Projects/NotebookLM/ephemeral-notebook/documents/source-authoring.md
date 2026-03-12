# Source Authoring — NotebookLM Ephemeral Notebook Workflow

This document explains how Claude writes sources into NotebookLM notebooks and how
that interacts with artifact generation.

---

## The Core Concept

The NLM CLI allows Claude to write to a notebook but not read from it — except that
Claude can see the list of sources. Claude's job is to write the right source documents
into the notebook depending on the design pattern and which artifact flags are set.

---

## Design Pattern 1: Claude as Source

Claude holds all the knowledge. It writes 1–3 source documents and uploads them to the
notebook before any NLM artifact generation happens.

| Source | When | Content |
|--------|------|---------|
| Knowledge base document | Always | The topic content — the core source that drives videos, infographic, and NLM slides |
| Gemini slide manifest | `slideshow: yes` | Structured markdown (title, paragraphs, image prompts per slide) — Gemini reads this source and builds slides from it |
| Web app knowledge document | `app: yes` | A structured knowledge document Claude also uses to populate the app's `FOCUS_PROMPTS` and quiz scope |

All three are uploaded via:
```bash
PYTHONIOENCODING=utf-8 nlm source add <notebook-id> --file <path> --title "<title>" --wait
```

### What each source drives

- **Knowledge base** → NLM video, NLM infographic, NLM slide deck (PDF)
- **Gemini slide manifest** → Gemini reads notebook sources and builds slides with Imagen
- **Web app knowledge doc** → Claude reads it to build the HTML app's explorer prompts and quiz scope; it also enriches the notebook for NLM artifacts

### Artifact generation order

1. Upload all sources first
2. Generate NLM-native artifacts (`nlm video create`, `nlm infographic create`, `nlm slides create`)
3. Write and upload the Gemini slide manifest (if flag set) — Gemini picks it up from notebook sources
4. Build the web app HTML (if flag set) — Claude uses the web app knowledge doc content

---

## Design Pattern 2: Research-Based

NLM does the research — Claude does not write the knowledge base. Instead:

1. Research runs and sources are imported into the notebook
2. Claude lists the sources (`nlm source list <notebook-id>`) to see what's there
3. Claude queries the notebook (`nlm notebook query <notebook-id> "..."`) to extract
   the information it needs
4. Claude uses that information to write the Gemini slide manifest and/or web app
   knowledge document, then uploads them as sources

The number of Claude-written sources is still 0–2 depending on flags — just the
knowledge base source is absent (NLM provided it through research).

---

## Artifact Types Summary

| Artifact | Skill | How produced | Output |
|----------|-------|--------------|--------|
| Video | `notebooklm-video` | `nlm video create` — NLM native | `.mp4` (in NLM UI) |
| Infographic | `notebooklm-infographic` | `nlm infographic create` — NLM native | `.png` |
| Slide deck | `notebooklm-slide` | `nlm slides create` — NLM native | `.pdf` |
| Gemini slides | `notebooklm-slide-manifest` | Claude writes manifest → uploaded as source → Gemini builds | (in Gemini/NLM UI) |
| Web app | `notebooklm-webapp` | Claude writes HTML using web app knowledge doc | `.html` |

---

## Task File Flags

```yaml
# Claude as Source pattern
source: claude-written

# Artifact flags
videos: 1                     # number of videos
video_style: Retro Print
infographic: yes
infographic_orientation: landscape
infographic_detail: standard
infographic_focus: |          # optional
  one-sentence focus string
slides: yes                   # NLM-native slide deck PDF
slide_format: detailed_deck
slideshow: yes                # Gemini slide manifest
slide_style: |
  style token block here
app: yes                      # web app HTML
```
