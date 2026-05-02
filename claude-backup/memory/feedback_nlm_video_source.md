---
name: feedback_nlm_video_source
description: Default pattern for NLM video generation — write a dedicated source document per video
type: feedback
---

Default: write a dedicated source doc per video, upload it, generate with `--source-ids` pointing to that source.

**Why:** Keeps the video scoped; prevents cross-contamination from other notebook sources.
**How to apply:** Multi-source generation is valid but the exception — make it a conscious choice.

**File naming:** Always rename the downloaded file to match the card title (Claude's title). The nlmTitle field on the card tracks the NLM-generated name. Never ask Tom which title to use — the card title wins every time.
