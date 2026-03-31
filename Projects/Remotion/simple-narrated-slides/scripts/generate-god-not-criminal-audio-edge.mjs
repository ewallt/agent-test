/**
 * generate-god-not-criminal-audio-edge.mjs
 * Generates narration for the GodNotCriminal composition using Edge TTS.
 * No API key required — uses Microsoft Edge neural voices.
 *
 * Usage (from simple-narrated-slides/):
 *   node scripts/generate-god-not-criminal-audio-edge.mjs
 *
 * To regenerate a specific file (skip --skip-existing):
 *   node scripts/generate-god-not-criminal-audio-edge.mjs --force
 *
 * Outputs:
 *   public/audio/god-not-criminal/title.mp3
 *   public/audio/god-not-criminal/slide-1.mp3  ...  slide-4.mp3
 *   src/god-not-criminal-durations.ts  (auto-generated, do not edit)
 *
 * Voice: en-GB-RyanNeural (British male, calm and authoritative)
 */

import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FORCE = process.argv.includes("--force");

const VOICE = "en-GB-RyanNeural";

const NARRATIONS = [
  {
    id: "title",
    text: "God Is Not a Criminal. What if God used force to compel obedience?",
  },
  {
    id: "slide-1",
    text: "Imagine a crime syndicate operating in a small city. One day, they send an enforcer to a local business owner. The message is simple: pay protection money, or face consequences. The owner refuses. He will not be intimidated, and he will not be extorted. The enforcer leaves — but not empty-handed. He leaves with a warning.",
  },
  {
    id: "slide-2",
    text: "The consequences begin. First the windows are smashed. Then the warehouse burns. Then come threats against his family. Each act of escalating violence has one purpose: to break the owner's will through fear and pain. Comply, or we will hurt you more. This is the logic of coercion — of a power that rules through force.",
  },
  {
    id: "slide-3",
    text: "Now apply that same logic to God. Obey me — or I will destroy you. Plagues on Egypt. Flood on the world. Fire on Sodom. Wielded as enforcement tools to compel submission. Wright puts the question plainly: if that is how God operates, what kind of God is this? That god is not a protector. That god is running a protection racket.",
  },
  {
    id: "slide-4",
    text: "F.T. Wright's answer is unequivocal: God is not a criminal. God never uses compulsion — His only method is self-giving love. A god who destroys to compel obedience is not the God of Scripture. He operates on Satan's principle, not God's. As Ellen White wrote: Compelling power is found only under Satan's government. The Lord's principles are not of this order. God wins through revelation, through love — never through force.",
  },
];

const OUTPUT_DIR = path.resolve("public/audio/god-not-criminal");
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// ── Generate audio ────────────────────────────────────────────────────────────
console.log(`\nGenerating ${NARRATIONS.length} audio clips (voice: ${VOICE})...\n`);

for (const { id, text } of NARRATIONS) {
  const outPath = path.join(OUTPUT_DIR, `${id}.mp3`);

  if (!FORCE && fs.existsSync(outPath)) {
    console.log(`  ${id} ... skipped (already exists)`);
    continue;
  }

  process.stdout.write(`  ${id} ... `);

  // Write a temp Python file to avoid shell escaping issues on Windows
  const tmpFile = path.join(OUTPUT_DIR, `_tmp_${id}.py`);
  const outPathFwd = outPath.replace(/\\/g, "/");
  const pyScript = `import asyncio, edge_tts\nasync def main():\n    c = edge_tts.Communicate(${JSON.stringify(text)}, ${JSON.stringify(VOICE)})\n    await c.save(${JSON.stringify(outPathFwd)})\nasyncio.run(main())\n`;
  fs.writeFileSync(tmpFile, pyScript, "utf8");

  try {
    execSync(`python "${tmpFile}"`, { stdio: "pipe" });
    fs.unlinkSync(tmpFile);
    const size = fs.statSync(outPath).size;
    console.log(`✓  saved (${(size / 1024).toFixed(0)} KB)`);
  } catch (err) {
    if (fs.existsSync(tmpFile)) fs.unlinkSync(tmpFile);
    console.error(`FAILED: ${err.stderr?.toString() || err.message}`);
  }
}

// ── Write god-not-criminal-durations.ts ──────────────────────────────────────
// Per-file bitrate detection — handles mixed sources (ElevenLabs=128kbps, Edge TTS=80kbps)
const CORRECTION = 0.974;

function detectMp3Bitrate(filePath) {
  const buf = Buffer.alloc(10000);
  const fd = fs.openSync(filePath, "r");
  const bytesRead = fs.readSync(fd, buf, 0, 10000, 0);
  fs.closeSync(fd);
  let i = 0;
  if (buf.toString("ascii", 0, 3) === "ID3") {
    const tagSize = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f);
    i = tagSize + 10;
  }
  while (i < bytesRead - 4) {
    if (buf[i] === 0xff && (buf[i + 1] & 0xe0) === 0xe0) {
      const idx = (buf[i + 2] >> 4) & 0xf;
      const table = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 0];
      return table[idx] * 1000;
    }
    i++;
  }
  return 128_000; // fallback
}

const slideIds = NARRATIONS.filter((n) => n.id !== "title").map((n) => n.id);
const durationsS = slideIds.map((id) => {
  const file = path.join(OUTPUT_DIR, `${id}.mp3`);
  if (!fs.existsSync(file)) return 20.0; // fallback if file missing
  const bytes = fs.statSync(file).size;
  const bitrateBps = detectMp3Bitrate(file);
  return parseFloat(((bytes * 8) / bitrateBps * CORRECTION).toFixed(3));
});

const today = new Date().toISOString().slice(0, 10);
const tsContent = `/**
 * AUTO-GENERATED by scripts/generate-god-not-criminal-audio-edge.mjs — do not edit manually.
 * Re-run the script after regenerating audio to update these values.
 * Last generated: ${today} (en-GB-RyanNeural, edge-tts)
 */

// Estimated durations in seconds (file size ÷ 128kbps × 0.974 correction).
export const GOD_NOT_CRIMINAL_DURATIONS_S: number[] = [
${slideIds.map((id, i) => {
  const slide = NARRATIONS.find((n) => n.id === id);
  return `  ${durationsS[i]}, // ${id} — ${slide?.text.split(" ").slice(0, 5).join(" ")}...`;
}).join("\n")}
];
`;

const durationsFile = path.resolve(__dirname, "../src/god-not-criminal-durations.ts");
fs.writeFileSync(durationsFile, tsContent);
console.log(`\n✅  Done. Durations written to src/god-not-criminal-durations.ts`);
console.log("    The dev server will hot-reload automatically.\n");
