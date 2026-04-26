# Augmented Chat — Project Definition

Single-file web apps that enhance AI chat with structured content, pre-written prompt pills, and an AI response layer — either clipboard-based via Gemini in Chrome (GiC) or inline via the Gemini API.

## Apps

| App | Mode | Status |
|-----|------|--------|
| Layered Reader | Inline (Gemini API) | ✅ Built (v1) |

## Skills

- `augmented-chat` — scaffolds a new augmented chat app. See `Projects/AugmentedChat/skills/augmented-chat.md`.
- `gic-integration` — builds GiC cartridges for clipboard mode. See `Projects/AugmentedChat/skills/gic-integration.md`.

## Prompts

| Prompt | Description |
|--------|-------------|
| `prompts/layered-reader-gic-single-source.md` | Layered Reader, GiC mode, single notebook source |
| `prompts/layered-reader-gic-multi-source.md` | Layered Reader, GiC mode, multiple notebook sources |
| `prompts/layered-reader-inline.md` | Layered Reader, inline Gemini API mode |
| `prompts/layered-reader-gic-gear-theme.md` | Layered Reader, GiC mode, 4-theme gear system (from scratch) |
| `prompts/layered-reader-theme-revamp.md` | Refactor existing app to add 4-theme gear system |

## Reference

- App pattern + implementation modes: `Projects/AugmentedChat/documents/architecture.md`
- GiC sr-only layer, cartridge format, validated modes: `Projects/AugmentedChat/documents/gic-architecture.md`
- Layered Reader spec (modes, menu options, tech stack, notes): `Projects/AugmentedChat/documents/layered-reader.md`
- GiC knowledge base draft (YouTube post-upload): `Projects/AugmentedChat/documents/gic-kb-draft.md`
- Cartridges live in: `Projects/NotebookLM/ephemeral-notebook/apps/[appname]/cartridges/`

## Open Items

- GiC prompts panel — collapsible panel in app showing prompt library; active prompt in sr-only; prompts baked in. Not yet built.
