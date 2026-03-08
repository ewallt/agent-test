/**
 * generate-audio.mjs
 * Generates ElevenLabs narration for Britain1940 composition.
 *
 * Usage:
 *   $env:ELEVENLABS_API_KEY="your_key_here"; node scripts/generate-audio.mjs
 *
 * Outputs:
 *   public/audio/title.mp3
 *   public/audio/slide-1.mp3  ...  public/audio/slide-5.mp3
 *
 * Voice: George (British male, authoritative)
 * To list all available voices run with --list-voices flag.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("❌  Set ELEVENLABS_API_KEY environment variable first.");
  console.error("    PowerShell: $env:ELEVENLABS_API_KEY=\"sk-...\"");
  process.exit(1);
}

// George — British male, calm and authoritative
// Find other voice IDs by running: node scripts/generate-audio.mjs --list-voices
const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const MODEL_ID = "eleven_multilingual_v2";

const NARRATIONS = [
  {
    id: "title",
    text: "Britain. Nineteen forty. Survival on two fronts.",
  },
  {
    id: "slide-1",
    text: "Following France's sudden collapse in the summer of 1940, Britain found itself completely alone. The nation faced two simultaneous existential threats: a German air invasion across the English Channel, and the systematic strangulation of its Atlantic supply lines. Losing control of either front would mean total defeat.",
  },
  {
    id: "slide-2",
    text: "German commanders knew that any seaborne invasion required air superiority first. The Luftwaffe launched a massive campaign to destroy Fighter Command. But Britain's Dowding System — integrating radar stations, ground observers, and centralized command — allowed outnumbered RAF pilots to intercept incoming formations with devastating efficiency. The planned invasion was permanently halted.",
  },
  {
    id: "slide-3",
    text: "Simultaneously, German submarines hunted in deadly wolfpacks across the North Atlantic, targeting the merchant convoys carrying essential food, fuel, and war supplies from North America. The early years were catastrophic. Unescorted vessels were stalked and destroyed. Britain's survival hung by a thread.",
  },
  {
    id: "slide-4",
    text: "The tide turned through two invisible breakthroughs. Advanced ASDIC sonar allowed Allied destroyers to locate and destroy submerged U-boats. And at Bletchley Park, brilliant cryptanalysts cracked the German Enigma cipher — giving Allied commanders precise intelligence on submarine movements and permanently shifting the strategic advantage.",
  },
  {
    id: "slide-5",
    text: "Long-range escort carriers finally closed the deadly Mid-Atlantic air gap, ensuring convoys were never left unprotected. The U-boat threat was neutralized, and Britain's survival secured. These hard-won victories in the air and at sea laid the essential foundation for the Allied liberation of Europe.",
  },
];

const OUTPUT_DIR = path.resolve("public/audio");

// ── List voices (optional) ────────────────────────────────────────────────────
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

// ── Generate audio ────────────────────────────────────────────────────────────
console.log(`\nGenerating ${NARRATIONS.length} audio clips...\n`);

for (const { id, text } of NARRATIONS) {
  const outPath = path.join(OUTPUT_DIR, `${id}.mp3`);
  process.stdout.write(`  ${id} ... `);

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
    continue;
  }

  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buffer);
  console.log(`✓  saved (${(buffer.length / 1024).toFixed(0)} KB)`);
}

// ── Write slide-durations.ts ──────────────────────────────────────────────────
// Estimate duration from file size using ElevenLabs' ~128kbps CBR output.
// Correction factor 0.974 derived from measured vs. estimated across 5 slides.
const BITRATE_BPS = 128_000;
const CORRECTION = 0.974;

const slideIds = NARRATIONS.filter((n) => n.id !== "title").map((n) => n.id);
const durationsS = slideIds.map((id) => {
  const file = path.join(OUTPUT_DIR, `${id}.mp3`);
  const bytes = fs.statSync(file).size;
  return parseFloat(((bytes * 8) / BITRATE_BPS * CORRECTION).toFixed(3));
});

const today = new Date().toISOString().slice(0, 10);
const tsContent = `/**
 * AUTO-GENERATED by scripts/generate-audio.mjs — do not edit manually.
 * Re-run the script after regenerating audio to update these values.
 * Last generated: ${today} (George voice, eleven_multilingual_v2)
 */

// Estimated durations in seconds (file size ÷ 128kbps × 0.974 correction).
// generate-audio.mjs updates this file automatically after each run.
export const SLIDE_DURATIONS_S: number[] = [
${slideIds.map((id, i) => {
  const slide = NARRATIONS.find((n) => n.id === id);
  return `  ${durationsS[i]}, // ${id} — ${slide?.text.split(" ").slice(0, 5).join(" ")}...`;
}).join("\n")}
];
`;

const durationsFile = path.resolve(__dirname, "../src/slide-durations.ts");
fs.writeFileSync(durationsFile, tsContent);
console.log(`\n✅  Done. Durations written to src/slide-durations.ts`);
console.log("    The dev server will hot-reload automatically.\n");
