# Edge TTS — Audio Generation Guide

*For the Behold Your God project and any future Remotion narrated-slides compositions.*
*Last updated: 2026-03-28*

---

## What It Is

Edge TTS is a free Python library that uses Microsoft Edge's neural text-to-speech voices. No API key, no account, no usage limits. Audio quality is comparable to ElevenLabs for narration purposes.

- Python package: `edge-tts` (v7.2.8+)
- Voice used: `en-GB-RyanNeural` (British male, calm and authoritative — closest match to the George voice from ElevenLabs)
- Output format: MP3

---

## One-Time Setup

Install the Python package (only needed once per machine):

```powershell
pip install edge-tts
```

---

## Generating Audio for a BYG Composition

Each composition has its own generation script in `scripts/`. The script:
- Skips files that already exist (safe to re-run)
- Use `--force` to regenerate all files
- Writes real durations to the `*-durations.ts` file after generation

### GodNotCriminal (Illustration 02)

```powershell
cd C:\Users\tomew\Documents\agent-test\Projects\Remotion\simple-narrated-slides
node scripts/generate-god-not-criminal-audio-edge.mjs
```

Output files:
```
public/audio/god-not-criminal/title.mp3
public/audio/god-not-criminal/slide-1.mp3
public/audio/god-not-criminal/slide-2.mp3
public/audio/god-not-criminal/slide-3.mp3
public/audio/god-not-criminal/slide-4.mp3
src/god-not-criminal-durations.ts  ← auto-updated
```

---

## Adding Edge TTS to a New Composition

When building a new BYG illustration video, copy the generation script and adapt it:

```powershell
cp scripts/generate-god-not-criminal-audio-edge.mjs scripts/generate-{slug}-audio-edge.mjs
```

Then edit:
1. `NARRATIONS` array — update title and slide narration text
2. `OUTPUT_DIR` — change to `public/audio/{slug}`
3. Durations file path — change `god-not-criminal-durations` to `{slug}-durations`
4. The export constant name in the written `.ts` file

---

## Voice Options

To list all available voices:

```python
import asyncio, edge_tts
async def main():
    voices = await edge_tts.list_voices()
    for v in voices:
        if 'en-GB' in v['ShortName'] or 'en-US' in v['ShortName']:
            print(v['ShortName'], v['Gender'])
asyncio.run(main())
```

Good alternatives to `en-GB-RyanNeural`:
| Voice | Style |
|-------|-------|
| `en-GB-RyanNeural` | British male, calm ← **current default** |
| `en-GB-SoniaNeural` | British female, warm |
| `en-US-GuyNeural` | American male, neutral |
| `en-US-ChristopherNeural` | American male, authoritative |

---

## Why We Switched from ElevenLabs

ElevenLabs free tier is 10,000 characters/month. The full BYG series (~11 videos) requires ~15,000 characters total — more than one month's allowance. Edge TTS is unlimited and free, with comparable quality for narration use.

ElevenLabs audio already generated (NuclearPlant, partial GodNotCriminal) remains in use — there's no need to regenerate it.

---

## Troubleshooting

**Script fails silently / file not created**
The generation script writes a temporary `.py` file to avoid Windows shell escaping issues. If it fails, check that `python` is on your PATH:
```powershell
python --version
```

**Audio sounds rushed**
Edge TTS rate can be adjusted in the script by passing a `rate` parameter:
```python
edge_tts.Communicate(text, voice, rate="-10%")  # slow down slightly
```

**Durations are off**
The script estimates duration from MP3 file size using `file_size ÷ 128kbps × 0.974`. Re-run the script after regenerating audio to refresh the durations file.
