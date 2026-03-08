// Wrapper to set CWD to the project folder before launching Remotion Studio
// ── Change this one constant to rename the project folder everywhere ──────────
const FOLDER = "simple-narrated-slides";
// ─────────────────────────────────────────────────────────────────────────────
const path = require("path");
process.chdir(path.join(__dirname, FOLDER));
process.argv = ["node", "remotion", "studio", "src/index.ts", "--port", "3000"];
require(`./${FOLDER}/node_modules/@remotion/cli/remotion-cli.js`);
