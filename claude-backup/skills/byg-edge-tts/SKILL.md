---
name: byg-edge-tts
description: Generate narration audio for BYG (Behold Your God) illustration videos using Microsoft Edge TTS — free, no API key, no quota. Use this skill whenever building a new BYG video and audio needs to be generated, when regenerating audio for an existing BYG composition, or when asking how to set up or run the edge-tts audio pipeline for simple-narrated-slides.
---

# BYG Edge TTS — Audio Generation

Narration for BYG illustration videos is generated using the `edge-tts` Python package (Microsoft Edge neural voices). Free, no API key, no account, no quota.

## Quick Reference

| Item | Value |
|------|-------|
| Default voice | `en-GB-RyanNeural` (British male, calm — closest match to ElevenLabs George) |
| Output format | MP3 (128kbps) |
| Template script | `scripts/generate-white-hat-black-hat-audio-edge.mjs` |
| Audio output dir | `public/audio/{slug}/` |
| Durations file | `src/{slug}-durations.ts` — auto-generated, never edit manually |
| Run from | `Projects/Remotion/simple-narrated-slides/` |

## One-Time Setup

```
pip install edge-tts
```

Verify: `python -c "import edge_tts; print('edge-tts ready')"`

## Running the Script

```powershell
cd C:\Users\tomew\Documents\agent-test\Projects\Remotion\simple-narrated-slides
node scripts/generate-{slug}-audio-edge.mjs
```

- Skips files that already exist — safe to re-run
- Use `--force` to regenerate everything

The script produces `public/audio/{slug}/title.mp3`, `slide-1.mp3` … `slide-N.mp3` and writes real durations to `src/{slug}-durations.ts`. The Remotion dev server hot-reloads automatically.

## Adding Audio to a New Composition

1. Copy the template script:
   ```powershell
   cp scripts/generate-white-hat-black-hat-audio-edge.mjs scripts/generate-{slug}-audio-edge.mjs
   ```

2. **READ NOW: `Projects/Remotion/simple-narrated-slides/scripts/generate-white-hat-black-hat-audio-edge.mjs`**
   Read the actual template file before editing the copy. Work from the live file, not from memory or the description below.

3. Edit the new script — the four things to change:
   - `NARRATIONS` array — replace title and slide narration texts
   - `OUTPUT_DIR` — change to `"public/audio/{slug}"`
   - Durations file path — change `white-hat-black-hat-durations` to `{slug}-durations`
   - Export constant name — change `WHITE_HAT_BLACK_HAT_DURATIONS_S` to `{SLUG}_DURATIONS_S`

4. **READ NOW: `Projects/Remotion/simple-narrated-slides/src/white-hat-black-hat-durations.ts`**
   Read the placeholder durations file before creating the new one — copy its structure, rename the export, update the comment.

5. Run the script to generate MP3s and write real durations.

## Why the Script Uses a Temp File (Windows)

The script writes a temp `.py` file per clip rather than using `python -c "..."` inline. This avoids Windows shell escaping failures when narration text contains apostrophes (Wright's, God's, Satan's, etc.). The temp file uses `JSON.stringify()` for safe string encoding:

```javascript
const pyScript = `import asyncio, edge_tts\nasync def main():\n    c = edge_tts.Communicate(${JSON.stringify(text)}, ${JSON.stringify(VOICE)})\n    await c.save(${JSON.stringify(outPathFwd)})\nasyncio.run(main())\n`;
fs.writeFileSync(tmpFile, pyScript, "utf8");
execSync(`python "${tmpFile}"`, { stdio: "pipe" });
fs.unlinkSync(tmpFile);
```

The temp file is deleted after each clip. If the script fails mid-run, a `_tmp_*.py` file may be left behind — delete it and retry.

## Duration Measurement

Durations are measured using `mutagen` (Python library) — reads the actual MP3 duration directly rather than estimating from file size. This is reliable for both CBR and VBR files. The script writes measured durations automatically to `src/{slug}-durations.ts`. Never edit that file manually — re-running the script is the right way to refresh durations.

One-time setup: `pip install mutagen`

## Voice Options

| Voice | Style |
|-------|-------|
| `en-GB-RyanNeural` | British male, calm — **BYG default** |
| `en-GB-SoniaNeural` | British female, warm and clear |
| `en-US-ChristopherNeural` | American male, authoritative |
| `en-US-GuyNeural` | American male, neutral |

To list all available English voices:
```python
import asyncio, edge_tts
async def main():
    voices = await edge_tts.list_voices()
    for v in voices:
        if v['Locale'].startswith('en-'):
            print(v['ShortName'], v['Gender'])
asyncio.run(main())
```

## Troubleshooting

**Script runs but no file created**
- Check `python --version` — Python must be on PATH
- Look for leftover `_tmp_*.py` files in the audio folder — delete and retry

**Audio sounds too fast**
Add a `rate` parameter to the `Communicate()` call in the script:
```python
c = edge_tts.Communicate(text, voice, rate="-10%")
```

**Durations are wrong in the video**
Re-run the generation script to refresh `*-durations.ts`. Use `--force` if needed. The dev server hot-reloads automatically.

## Reference

Full guide: `Projects/BYG/documents/edge-tts-guide.html`
