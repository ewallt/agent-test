/**
 * generate-braess-audio.mjs
 * Generates per-scene ElevenLabs narration for WhiteboardExplainer-3 (Braess's Paradox).
 *
 * Architecture: one audio file per scene, keyed by scene.id.
 * Files land in: public/audio/braess/{scene.id}.mp3
 *
 * After generating, the script measures audio durations and updates durationInFrames
 * in scenes.example_3.json if any scene is shorter than its narration requires.
 *
 * Usage (from whiteboard-explainer/ directory):
 *   $env:ELEVENLABS_API_KEY="sk-..."; node scripts/generate-braess-audio.mjs
 *
 * Options:
 *   --list-voices   Print available ElevenLabs voices and exit
 *   --scene <id>    Regenerate a single scene only (e.g. --scene t3-title-001)
 *   --dry-run       Print narration text without calling ElevenLabs
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(__dirname, "..");

const API_KEY = process.env.ELEVENLABS_API_KEY;
const DRY_RUN = process.argv.includes("--dry-run");

if (!API_KEY && !DRY_RUN) {
  console.error("❌  Set ELEVENLABS_API_KEY environment variable first.");
  console.error("    PowerShell: $env:ELEVENLABS_API_KEY=\"sk-...\"");
  process.exit(1);
}

// George — British male, calm and authoritative (same voice as BattleOfAtlantic)
const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const MODEL_ID = "eleven_multilingual_v2";

const FPS = 30;
const AUDIO_BUFFER_FRAMES = 45; // 1.5s hold after narration ends

// ── List voices ───────────────────────────────────────────────────────────────
if (process.argv.includes("--list-voices")) {
  const res = await fetch("https://api.elevenlabs.io/v1/voices", {
    headers: { "xi-api-key": API_KEY },
  });
  const { voices } = await res.json();
  console.log("\nAvailable voices:");
  for (const v of voices) {
    console.log(`  ${v.voice_id}  ${v.name}  (${v.labels?.accent ?? ""} ${v.labels?.gender ?? ""})`);
  }
  process.exit(0);
}

// ── Load scenes JSON ──────────────────────────────────────────────────────────
const scenesPath = path.join(PROJECT_ROOT, "scenes.example_3.json");
const scenesData = JSON.parse(fs.readFileSync(scenesPath, "utf8"));
const scenes = scenesData.scenes.filter((s) => s.narration);

if (scenes.length === 0) {
  console.log("No scenes with narration found in scenes.example_3.json.");
  process.exit(0);
}

// ── Filter to single scene if --scene flag given ──────────────────────────────
const sceneFilter = (() => {
  const idx = process.argv.indexOf("--scene");
  return idx !== -1 ? process.argv[idx + 1] : null;
})();

const targetScenes = sceneFilter
  ? scenes.filter((s) => s.id === sceneFilter)
  : scenes;

if (sceneFilter && targetScenes.length === 0) {
  console.error(`❌  No scene with id "${sceneFilter}" found (or it has no narration).`);
  process.exit(1);
}

// ── Dry run ───────────────────────────────────────────────────────────────────
if (DRY_RUN) {
  console.log("\n🔍  Dry run — narration text for each scene:\n");
  for (const s of targetScenes) {
    console.log(`  [${s.id}]`);
    console.log(`  "${s.narration}"\n`);
  }
  process.exit(0);
}

// ── Audio output directory ────────────────────────────────────────────────────
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "audio", "braess");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Generate a single clip ────────────────────────────────────────────────────
async function generateClip(text, filename) {
  const outPath = path.join(OUTPUT_DIR, filename);
  process.stdout.write(`  ${filename} ... `);

  const res = await fetch(
    `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`,
    {
      method: "POST",
      headers: {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text,
        model_id: MODEL_ID,
        voice_settings: {
          stability: 0.55,
          similarity_boost: 0.75,
          style: 0.2,
          use_speaker_boost: true,
        },
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    console.error(`FAILED (${res.status}): ${err}`);
    return null;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  console.log(`✓  ${(buffer.length / 1024).toFixed(0)} KB`);
  return buffer.length;
}

// ── Parse MP3 duration from frame headers ────────────────────────────────────
function getMp3DurationSeconds(filepath) {
  const buf = fs.readFileSync(filepath);
  let totalFrames = 0;
  let i = 0;
  while (i < buf.length - 4) {
    if (buf[i] === 0xFF && (buf[i + 1] & 0xE0) === 0xE0) {
      const b1 = buf[i + 1];
      const b2 = buf[i + 2];
      const version = (b1 >> 3) & 0x3;
      const layer   = (b1 >> 1) & 0x3;
      const bitrateIdx  = (b2 >> 4) & 0xF;
      const sampleIdx   = (b2 >> 2) & 0x3;
      if (version === 3 && layer === 1) {
        const bitrates    = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
        const sampleRates = [44100, 48000, 32000, 0];
        const bitrate    = bitrates[bitrateIdx] * 1000;
        const sampleRate = sampleRates[sampleIdx];
        if (bitrate > 0 && sampleRate > 0) {
          const padding   = (b2 >> 1) & 0x1;
          const frameSize = Math.floor(144 * bitrate / sampleRate) + padding;
          if (frameSize > 0) { totalFrames++; i += frameSize; continue; }
        }
      }
    }
    i++;
  }
  return parseFloat((totalFrames * 1152 / 44100).toFixed(3));
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log(`\nGenerating narration for ${targetScenes.length} scene(s)...\n`);

for (const scene of targetScenes) {
  await generateClip(scene.narration, `${scene.id}.mp3`);
}

// ── Measure durations + update JSON if needed ─────────────────────────────────
console.log("\nMeasuring durations and checking scene lengths...\n");

let jsonUpdated = false;

for (const scene of targetScenes) {
  const file = path.join(OUTPUT_DIR, `${scene.id}.mp3`);
  if (!fs.existsSync(file)) continue;

  const durSec = getMp3DurationSeconds(file);
  const minFrames = Math.ceil(durSec * FPS) + AUDIO_BUFFER_FRAMES;

  // Find the scene in scenesData and update if needed
  const jsonScene = scenesData.scenes.find((s) => s.id === scene.id);
  if (jsonScene && jsonScene.durationInFrames < minFrames) {
    console.log(
      `  ${scene.id}: audio ${durSec}s → needs ${minFrames}f, was ${jsonScene.durationInFrames}f → updating`
    );
    jsonScene.durationInFrames = minFrames;
    jsonUpdated = true;
  } else {
    console.log(
      `  ${scene.id}: audio ${durSec}s → needs ${minFrames}f, current ${jsonScene?.durationInFrames}f ✓`
    );
  }
}

if (jsonUpdated) {
  fs.writeFileSync(scenesPath, JSON.stringify(scenesData, null, 2) + "\n");
  console.log("\n✏️   Updated scenes.example_3.json with extended durationInFrames values.");
} else {
  console.log("\n✓   All scene durations are already long enough.");
}

console.log("\n✅  Done.");
console.log(`    Audio files: public/audio/braess/`);
console.log("    The dev server will hot-reload automatically.\n");
