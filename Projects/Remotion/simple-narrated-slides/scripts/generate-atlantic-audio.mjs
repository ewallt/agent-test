/**
 * generate-atlantic-audio.mjs
 * Generates per-bullet ElevenLabs narration for BattleOfAtlantic composition.
 *
 * Architecture: one audio file per bullet, not per slide.
 * Files: public/audio/atlantic/title.mp3
 *        public/audio/atlantic/s1b1.mp3 … s5b3.mp3  (5 slides × 3 bullets = 15 files)
 *
 * Usage:
 *   $env:ELEVENLABS_API_KEY="your_key_here"; node scripts/generate-atlantic-audio.mjs
 *
 * After running, src/atlantic-durations.ts is auto-updated and the dev server hot-reloads.
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
const VOICE_ID = "JBFqnCBsd6RMkjVDRZzb";
const MODEL_ID = "eleven_multilingual_v2";

// ── Content: one narration sentence per bullet ────────────────────────────────
// Each bullet narration is short and self-contained — it plays exactly when
// the matching bullet appears on screen.

const TITLE_NARRATION = "Battle of the Atlantic. 1939 to 1945. The longest campaign of the Second World War.";

const SLIDES = [
  {
    id: 1,
    bullets: [
      "Britain was an island entirely dependent on the sea. Seventy percent of her food, fuel, and war materials arrived by convoy from North America.",
      "Germany understood this vulnerability completely. Sever those Atlantic lifelines, and Britain would be strangled into submission.",
      "Without a single German soldier ever setting foot on English soil.",
    ],
  },
  {
    id: 2,
    bullets: [
      "Admiral Dönitz perfected a lethal innovation: the wolfpack. When a convoy was spotted, U-boats converged from across the ocean, guided by radio coordination.",
      "Attacking together on the surface at night, they overwhelmed the thin screen of Allied escort destroyers.",
      "In 1940 and 1941, German submariners called it the Happy Time. Allied losses were devastating.",
    ],
  },
  {
    id: 3,
    bullets: [
      "At the heart of the ocean lay a vast and deadly void. Land-based aircraft simply could not reach the mid-Atlantic — a stretch sailors grimly called the Black Pit.",
      "Here, wolfpacks hunted completely free from the threat of air attack.",
      "Through 1942, the worst year of the campaign, over a thousand Allied ships were sent to the bottom.",
    ],
  },
  {
    id: 4,
    bullets: [
      "Bletchley Park's cryptanalysts broke German naval Enigma, revealing the convoy routes being targeted by wolfpacks.",
      "High-frequency direction finding — Huff Duff — allowed escort commanders to locate transmitting U-boats before they could strike.",
      "Escort carriers and long-range Liberator aircraft finally extended air cover across the deadly Gap.",
    ],
  },
  {
    id: 5,
    bullets: [
      "The reckoning arrived in May 1943. In a single extraordinary month, Allied forces sank forty-three German submarines.",
      "The losses were so catastrophic that Admiral Dönitz withdrew his remaining U-boats from the North Atlantic.",
      "The Atlantic lifeline was secured, and the stage was set for the liberation of Europe.",
    ],
  },
];

const OUTPUT_DIR = path.resolve("public/audio/atlantic");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

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

console.log("\nGenerating title...\n");
await generateClip(TITLE_NARRATION, "title.mp3");

console.log("\nGenerating per-bullet clips (5 slides × 3 bullets = 15 files)...\n");
for (const slide of SLIDES) {
  for (let b = 0; b < slide.bullets.length; b++) {
    await generateClip(slide.bullets[b], `s${slide.id}b${b + 1}.mp3`);
  }
}

// ── Write atlantic-durations.ts ───────────────────────────────────────────────
// Parse exact duration from MP3 frame headers (no bitrate assumption needed).
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

console.log("\nMeasuring durations from MP3 headers...\n");

const bulletDurations = SLIDES.map((slide) =>
  slide.bullets.map((_, b) => {
    const file = path.join(OUTPUT_DIR, `s${slide.id}b${b + 1}.mp3`);
    const dur  = getMp3DurationSeconds(file);
    console.log(`  s${slide.id}b${b + 1}: ${dur}s`);
    return dur;
  })
);

const today = new Date().toISOString().slice(0, 10);
const tsContent =
`/**
 * AUTO-GENERATED by scripts/generate-atlantic-audio.mjs — do not edit manually.
 * Re-run the script after regenerating audio to update these values.
 * Last generated: ${today} (George voice, eleven_multilingual_v2)
 *
 * Format: ATLANTIC_BULLET_DURATIONS_S[slideIndex][bulletIndex]
 * 5 slides × 3 bullets = 15 values, measured from MP3 frame headers.
 */
export const ATLANTIC_BULLET_DURATIONS_S: number[][] = [
${bulletDurations.map((bullets, s) => {
  const label = ["Strategic Stakes", "U-boat Terror", "Atlantic Gap", "Technology War", "Turning Point"][s];
  return `  [${bullets.join(", ")}], // slide-${s + 1}: ${label}`;
}).join("\n")}
];
`;

const durationsFile = path.resolve(__dirname, "../src/atlantic-durations.ts");
fs.writeFileSync(durationsFile, tsContent);

console.log("\n✅  Done.");
console.log("    Durations written to src/atlantic-durations.ts");
console.log("    The dev server will hot-reload automatically.\n");
