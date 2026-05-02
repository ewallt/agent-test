---
name: BYG audio — Edge TTS replaces ElevenLabs
description: BYG illustration videos use Microsoft Edge TTS for narration, not ElevenLabs
type: feedback
---

BYG narration audio is generated with Microsoft Edge TTS (via the `byg-edge-tts` skill), not ElevenLabs.

**Why:** ElevenLabs is no longer used for BYG. Edge TTS is free, requires no API key, and has no quota.

**How to apply:** When working on any BYG illustration video that needs audio, use the `byg-edge-tts` skill. Do not reference ElevenLabs API keys or ElevenLabs generation scripts for BYG work. The older non-BYG compositions (Britain1940, BattleOfAtlantic) still have ElevenLabs scripts but those are legacy.
