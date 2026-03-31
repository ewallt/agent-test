/**
 * generate-white-hat-black-hat-audio-edge.mjs
 * Generates narration for the WhiteHatBlackHat composition using Edge TTS.
 * No API key required — uses Microsoft Edge neural voices.
 *
 * Usage (from simple-narrated-slides/):
 *   node scripts/generate-white-hat-black-hat-audio-edge.mjs
 *
 * To regenerate all files:
 *   node scripts/generate-white-hat-black-hat-audio-edge.mjs --force
 *
 * Outputs:
 *   public/audio/white-hat-black-hat/title.mp3
 *   public/audio/white-hat-black-hat/slide-1.mp3  ...  slide-4.mp3
 *   src/white-hat-black-hat-durations.ts  (auto-generated, do not edit)
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
    text: "White Hat, Black Hat. What if breaking God's law is the only way to uphold it?",
  },
  {
    id: "slide-1",
    text: "Picture the American West: a frontier town living under the shadow of a black-hatted villain. He controls everything — the saloon, the sheriff, the land itself — through lies, theft, and the constant threat of violence. Fear is his currency. When honest people resist, he makes examples of them. The audience watching knows exactly who to root for. The man in the white hat. The hero who will ride in, face down the villain, and restore justice to the town. He always does. That is how the story goes.",
  },
  {
    id: "slide-2",
    text: "But here is where the story takes its twist. The hero, to win, must beat the villain at his own game. He lies to gain the villain's trust. He steals back what was stolen by stealth and deception. And when the moment comes, he kills — not in fair fight alone, but by whatever means are necessary. The audience cheers. Of course it had to be done. The ends justified the means. And yet — look closely now. What actually separates the hero from the villain? Only the color of the hat.",
  },
  {
    id: "slide-3",
    text: "F.T. Wright recognized this same logic operating in popular theology. The argument runs like this: God's law is righteous and must be upheld. But sometimes, to uphold it, God must act outside it. Plagues on Egypt to compel Pharaoh. Floods on the ancient world to cleanse it. Fire on Sodom. Force, destruction, coercion — all in the name of righteousness. Wright names this plainly: it is the false magnification of the law. The claim that God must break His own law to enforce it. Evil reasoning wearing holy costume.",
  },
  {
    id: "slide-4",
    text: "Consider the moment in Samaria. A village refused Jesus and his disciples lodging. The disciples were outraged. Lord, they said, shall we call fire down from heaven to consume them? Jesus turned and rebuked them. He did not call fire. He moved on. That is the pattern, unrepeated. He was mocked, betrayed, falsely accused, and crucified — and never once reached for the power He possessed to destroy His enemies. God never breaks His own law to enforce it. The true magnification of the law is living it perfectly, even to the cross.",
  },
];

const OUTPUT_DIR = path.resolve("public/audio/white-hat-black-hat");
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

// ── Write white-hat-black-hat-durations.ts ────────────────────────────────────
function getMp3DurationS(filePath) {
  const tmpScript = filePath + "_dur.py";
  const fwdPath = filePath.replace(/\\/g, "/");
  fs.writeFileSync(tmpScript, `import mutagen.mp3, json\nf=mutagen.mp3.MP3(${JSON.stringify(fwdPath)})\nprint(f.info.length)\n`);
  try {
    const out = execSync(`python "${tmpScript}"`, { stdio: "pipe" }).toString().trim();
    fs.unlinkSync(tmpScript);
    return parseFloat(out);
  } catch {
    if (fs.existsSync(tmpScript)) fs.unlinkSync(tmpScript);
    return 20.0; // fallback
  }
}

const slideIds = NARRATIONS.filter((n) => n.id !== "title").map((n) => n.id);
const durationsS = slideIds.map((id) => {
  const file = path.join(OUTPUT_DIR, `${id}.mp3`);
  if (!fs.existsSync(file)) return 20.0;
  return parseFloat(getMp3DurationS(file).toFixed(3));
});

const today = new Date().toISOString().slice(0, 10);
const tsContent = `/**
 * AUTO-GENERATED by scripts/generate-white-hat-black-hat-audio-edge.mjs — do not edit manually.
 * Re-run the script after regenerating audio to update these values.
 * Last generated: ${today} (en-GB-RyanNeural, edge-tts)
 */

// Actual durations in seconds (measured by mutagen, not estimated from file size).
export const WHITE_HAT_BLACK_HAT_DURATIONS_S: number[] = [
${slideIds.map((id, i) => {
  const slide = NARRATIONS.find((n) => n.id === id);
  return `  ${durationsS[i]}, // ${id} — ${slide?.text.split(" ").slice(0, 5).join(" ")}...`;
}).join("\n")}
];
`;

const durationsFile = path.resolve(__dirname, "../src/white-hat-black-hat-durations.ts");
fs.writeFileSync(durationsFile, tsContent);
console.log(`\n✅  Done. Durations written to src/white-hat-black-hat-durations.ts`);
console.log("    The dev server will hot-reload automatically.\n");
