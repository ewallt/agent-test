# Remotion Gotchas

Pitfalls specific to the Remotion video workflow. See `gotchas.md` for shell/auth/general gotchas.

---

## calculateMetadata — do not use

**Problem:** `calculateMetadata` with `getAudioDurationInSeconds` hangs indefinitely in Remotion Studio.

**Root cause:** `getAudioDurationInSeconds` (from `@remotion/media-utils`) uses plain `fetch()`. Remotion's dev server intercepts plain fetch requests to `/static-HASH/*` paths and returns the HTML SPA shell instead of the actual file. The function tries to decode that HTML as audio → the decode step never resolves.

**Symptoms:** "Running calculateMetadata()" spinner in Remotion Studio, composition never loads.

**Fix:** Do not use `calculateMetadata` at all. Use the static durations pattern:
- Store durations in `src/[name]-durations.ts` as a plain exported array
- Root.tsx imports durations at module level; frame counts computed synchronously
- `generate-[name]-audio.mjs` writes the TS file after audio generation (file size ÷ 128kbps × 0.974)
- No async, no spinner possible

---

## Dev server static file access

**How it works:** Remotion's dev server serves static files at hashed paths like `/static-HASH/audio/slide-1.mp3`.

**Plain fetch vs. audio element:** Plain `fetch()` to those paths returns the SPA HTML shell, not the file. `<Audio src={staticFile(...)} />` works correctly because it uses the browser's native audio pipeline (range requests), which the dev server handles differently.

**Implication:** Any code that tries to `fetch()` a static file path at runtime (including media utils that do this under the hood) will receive HTML, not the file.

---

## Chrome audio pipeline can break after forced kill

**Problem:** After killing Chrome (or the Claude Code process that owns it) via Task Manager, Chrome's audio subsystem can break entirely. Audio plays at the JavaScript level (`paused:false`, `muted:false`, `volume:1`) but produces no sound.

**Diagnosis:** Open Windows Volume Mixer while audio is playing. If Chrome is not listed at all (no slider), the audio pipeline is broken.

**Fix:** Close Chrome completely and reopen. A tab refresh or new tab is not enough — the full browser process must restart.

**Confirming code is correct:** Test in a different browser (e.g., Edge) before assuming a code issue. If audio works in Edge, the code is fine and Chrome is the problem.

---

## setPublicDir breaks static file serving

**Problem:** Adding `Config.setPublicDir("./public")` to `remotion.config.ts` breaks static file serving in the dev server. `staticFile()` paths stop resolving to actual files.

**Symptom:** Audio elements report readyState=0 or fail to load; visual assets may also break.

**Fix:** Do not set `setPublicDir`. The default Remotion behaviour already serves `public/` correctly. Remove any `setPublicDir` call and restart the dev server.

---

## Slide 5 audio — preload lag on first play

**Problem:** On the first play of a long composition (2+ minutes), the last slide's audio may be silent because the MP3 hasn't finished buffering when the playhead reaches it.

**Not a code bug.** Works on second play once the file is cached in memory.

**Workaround:** Let the composition play through once before recording/reviewing, or seek directly to the last slide before playing from the beginning.

---

## Dev server must be restarted after TS file changes

**Pattern:** `generate-[name]-audio.mjs` writes updated `[name]-durations.ts` after a run. The Remotion dev server hot-reloads TypeScript source files automatically — no manual restart needed in most cases.

**Exception:** If the server was started before the TS file existed at all, it may not pick up the new file. Restart the server if new composition registrations in Root.tsx aren't appearing in Remotion Studio.

---

## Dev server dies with the Claude Code process

**Reminder:** The Remotion dev server runs as a child process of Claude Code (started via `preview_start`). If Claude Code is killed (Task Manager, crash, OAuth failure), the server dies with it. Next session must restart the server.

**Server start command:** `npm run dev` in the project folder, or use the `preview_start` tool with the existing `launch.json` config.
