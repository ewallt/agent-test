// Renders a Remotion composition to MP4.
//
// Usage:   node render.js [CompositionId]
// Example: node render.js BattleOfAtlantic
//          node render.js Britain1940
//
// Output goes to: output/<CompositionId>.mp4 (next to this file)
// Defaults to BattleOfAtlantic if no argument is given.
//
// ── Change this one constant to rename the project folder everywhere ──────────
const FOLDER = "simple-narrated-slides";
// ─────────────────────────────────────────────────────────────────────────────

const path = require("path");
const fs   = require("fs");

const composition = process.argv[2] || "BattleOfAtlantic";
const outputDir   = path.join(__dirname, "output");
const outputFile  = path.join(outputDir, `${composition}.mp4`);

fs.mkdirSync(outputDir, { recursive: true });

const projectDir  = path.join(__dirname, FOLDER);
const entrySrc    = "src/index.ts";

console.log(`\n🎬  Rendering: ${composition}`);
console.log(`📂  Output:    ${outputFile}\n`);

process.chdir(projectDir);
process.argv = [
  "node", "remotion", "render",
  entrySrc,
  composition,
  outputFile,
];

require(`./${FOLDER}/node_modules/@remotion/cli/remotion-cli.js`);
