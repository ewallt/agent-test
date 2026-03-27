import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { NUCLEAR_SLIDE_DURATIONS_S } from "./nuclear-durations";

const TITLE_FRAMES = 120;
const SLIDE_BUFFER_FRAMES = 60;
const TOTAL_SLIDES = 4;

const ACCENT      = "#22d3ee";
const ACCENT_DIM  = "#0e7490";
const ACCENT_GLOW = "rgba(34,211,238,0.18)";
const BG          = "#06080f";
const TEXT_MAIN   = "#f0f9ff";
const TEXT_BODY   = "#cbd5e1";

export type NuclearPlantProps = { slideDurations: number[] };

const SLIDES = [
  {
    subtitle: "The Setup",
    title: "The Faithful Technician",
    bullets: [
      "A dedicated technician maintains a dangerous nuclear plant",
      "The hostile town despises him — and demands he leave",
      "He stays, because his presence alone prevents catastrophe",
    ],
  },
  {
    subtitle: "The Breaking Point",
    title: "The Expulsion",
    bullets: [
      "The town marches to the plant and forces him out",
      "He offers no resistance — protection cannot be imposed",
      "He walks away. The reactor begins to destabilize.",
    ],
  },
  {
    subtitle: "The Question That Changes Everything",
    title: "Who Caused the Explosion?",
    bullets: [
      "The plant explodes. The town is destroyed.",
      "The technician did not attack — he was simply absent",
      "He is not the destroyer. He was prevented from saving them.",
    ],
  },
  {
    subtitle: "F.T. Wright's Argument",
    title: "What Scripture Really Means",
    bullets: [
      "God is the technician in every biblical 'destruction' text",
      "God was expelled — He did not attack",
      "Destruction is sin's natural consequence, not divine punishment",
    ],
  },
];

// ─── Overlays ─────────────────────────────────────────────────────────────────

const ScanlineOverlay: React.FC = () => (
  <AbsoluteFill style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)", pointerEvents: "none", zIndex: 10 }} />
);
const Vignette: React.FC = () => (
  <AbsoluteFill style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)", pointerEvents: "none", zIndex: 9 }} />
);
const ReactorGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.04), [-1, 1], [0.03, 0.10]);
  return <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 50% at center, rgba(34,211,238,${pulse}) 0%, transparent 70%)`, pointerEvents: "none", zIndex: 1 }} />;
};
const GlobalProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  return <div style={{ position: "absolute", bottom: 0, left: 0, width: `${(frame / (durationInFrames - 1)) * 100}%`, height: 3, backgroundColor: ACCENT, zIndex: 20, boxShadow: `0 0 10px ${ACCENT}` }} />;
};

// ─── Doodle helpers ───────────────────────────────────────────────────────────

type DoodleProps = { bullets: number[] };
type DoodleFC = React.FC<DoodleProps>;

const cl = (t: number, a: number, b: number) =>
  interpolate(t, [0, 1], [a, b], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

const toRad = (deg: number) => (deg * Math.PI) / 180;

const svgProps = {
  stroke: ACCENT, fill: "none",
  strokeWidth: "3" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// Reactor dome: glowing circle + radiating lines. cracked=0 is calm, cracked=1 is jagged.
const ReactorDome: React.FC<{ cx: number; cy: number; r: number; cracked?: number }> = ({ cx, cy, r, cracked = 0 }) => {
  const calmAngles   = [0, 45, 90, 135, 180, 225, 270, 315];
  const erratAngles  = [18, 72, 105, 148, 200, 248, 282, 328];
  const erratLengths = [24, 12, 30, 10, 22, 16, 28, 13];

  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={ACCENT_GLOW} stroke={ACCENT} strokeWidth="2.5" />
      <circle cx={cx} cy={cy} r={r * 0.32} fill="rgba(34,211,238,0.3)" strokeWidth="0" />
      {/* calm lines */}
      <g opacity={1 - cracked}>
        {calmAngles.map((deg, i) => {
          const rad = toRad(deg);
          return <line key={i}
            x1={cx + Math.cos(rad) * (r + 6)}  y1={cy + Math.sin(rad) * (r + 6)}
            x2={cx + Math.cos(rad) * (r + 20)} y2={cy + Math.sin(rad) * (r + 20)}
            strokeWidth="2.5" />;
        })}
      </g>
      {/* erratic lines + crack */}
      <g opacity={cracked}>
        {erratAngles.map((deg, i) => {
          const rad = toRad(deg);
          return <line key={i}
            x1={cx + Math.cos(rad) * (r + 4)}  y1={cy + Math.sin(rad) * (r + 4)}
            x2={cx + Math.cos(rad) * (r + 4 + erratLengths[i])} y2={cy + Math.sin(rad) * (r + 4 + erratLengths[i])}
            strokeWidth="2" />;
        })}
        <path d={`M ${cx - 8},${cy - r - 4} L ${cx + 10},${cy - 14} L ${cx - 7},${cy + 10} L ${cx + 9},${cy + r + 4}`}
          strokeWidth="3.5" />
      </g>
    </g>
  );
};

// ─── Doodle 1: The Faithful Technician ───────────────────────────────────────
// D0: reactor dome + unmanned control panel
// b[0]: technician arrives at panel
// b[1]: crowd appears at right, arms pointing at technician
// b[2]: panel technician fades out; barrier technician stands between reactor and crowd

const Doodle1: DoodleFC = ({ bullets: b }) => {
  const panelTechOp  = b[0] * cl(b[2], 1, 0);
  const crowdOp      = b[1];
  const barrierOp    = b[2];

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* Reactor dome — always */}
      <ReactorDome cx={122} cy={218} r={50} />

      {/* Control panel — always */}
      <rect x={258} y={160} width={90} height={162} strokeWidth="2.5" />
      <line x1={273} y1={197} x2={333} y2={197} strokeWidth="2" />
      <line x1={273} y1={226} x2={333} y2={226} strokeWidth="2" />
      <line x1={273} y1={255} x2={333} y2={255} strokeWidth="2" />

      {/* Panel technician — at the panel, fades in with b[0], out with b[2] */}
      <g opacity={panelTechOp}>
        <circle cx={244} cy={148} r={20} />
        <line x1={244} y1={168} x2={244} y2={258} />
        <line x1={244} y1={205} x2={270} y2={218} /> {/* arm on panel */}
        <line x1={244} y1={205} x2={220} y2={228} />
        <line x1={244} y1={258} x2={224} y2={318} />
        <line x1={244} y1={258} x2={264} y2={318} />
      </g>

      {/* Crowd — far right, arms pointing left toward technician, fades in with b[1] */}
      <g opacity={crowdOp}>
        <circle cx={382} cy={160} r={17} />
        <line x1={382} y1={177} x2={382} y2={258} />
        <line x1={382} y1={208} x2={344} y2={226} /> {/* arm pointing left */}
        <line x1={382} y1={208} x2={404} y2={228} />
        <line x1={382} y1={258} x2={362} y2={316} />
        <line x1={382} y1={258} x2={402} y2={316} />

        <circle cx={435} cy={166} r={14} opacity={0.72} />
        <line x1={435} y1={180} x2={435} y2={252} opacity={0.72} />
        <line x1={435} y1={208} x2={400} y2={224} opacity={0.72} strokeWidth="2.5" />
        <line x1={435} y1={208} x2={454} y2={226} opacity={0.72} />
        <line x1={435} y1={252} x2={418} y2={308} opacity={0.72} />
        <line x1={435} y1={252} x2={452} y2={306} opacity={0.72} />
      </g>

      {/* Barrier technician — between reactor and crowd, facing reactor, fades in with b[2] */}
      <g opacity={barrierOp}>
        <circle cx={200} cy={200} r={20} />
        <line x1={200} y1={220} x2={200} y2={310} />
        <line x1={200} y1={255} x2={162} y2={272} /> {/* arm reaching toward reactor */}
        <line x1={200} y1={255} x2={224} y2={278} />
        <line x1={200} y1={310} x2={180} y2={368} />
        <line x1={200} y1={310} x2={220} y2={368} />
      </g>

      <line x1={40} y1={456} x2={455} y2={456} strokeWidth="2" opacity={0.35} />
    </svg>
  );
};

// ─── Doodle 2: The Expulsion ──────────────────────────────────────────────────
// D0: marching crowd (left) with arrows → reactor at right
// b[0]: crowd surrounds technician at plant entrance
// b[1]: technician steps out, open palms — no resistance
// b[2]: technician walks away (far left, from behind); reactor cracks

const Doodle2: DoodleFC = ({ bullets: b }) => {
  const d0Op = cl(b[0], 1, 0);
  const d1Op = b[0] * cl(b[1], 1, 0);
  const d2Op = b[1] * cl(b[2], 1, 0);
  const d3Op = b[2];

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* Reactor dome — always, cracks with b[2] */}
      <ReactorDome cx={390} cy={195} r={42} cracked={b[2]} />

      {/* D0: marching crowd + direction arrows */}
      <g opacity={d0Op}>
        <circle cx={68} cy={165} r={16} />
        <line x1={68} y1={181} x2={68} y2={255} />
        <line x1={68} y1={210} x2={46} y2={232} />
        <line x1={68} y1={210} x2={92} y2={218} />
        <line x1={68} y1={255} x2={50} y2={310} />
        <line x1={68} y1={255} x2={88} y2={308} />

        <circle cx={132} cy={160} r={16} />
        <line x1={132} y1={176} x2={132} y2={250} />
        <line x1={132} y1={205} x2={110} y2={228} />
        <line x1={132} y1={205} x2={156} y2={215} />
        <line x1={132} y1={250} x2={114} y2={305} />
        <line x1={132} y1={250} x2={152} y2={303} />

        <circle cx={190} cy={168} r={13} opacity={0.65} />
        <line x1={190} y1={181} x2={190} y2={248} opacity={0.65} />
        <line x1={190} y1={208} x2={172} y2={228} opacity={0.65} />
        <line x1={190} y1={208} x2={210} y2={218} opacity={0.65} />
        <line x1={190} y1={248} x2={174} y2={300} opacity={0.65} />
        <line x1={190} y1={248} x2={206} y2={298} opacity={0.65} />

        {/* Arrows pointing right */}
        <line x1={75} y1={136} x2={110} y2={136} strokeWidth="2.5" />
        <path d="M 105,129 L 115,136 L 105,143" strokeWidth="2.5" />
        <line x1={140} y1={130} x2={175} y2={130} strokeWidth="2.5" />
        <path d="M 170,123 L 180,130 L 170,137" strokeWidth="2.5" />
      </g>

      {/* D1: technician at plant entrance, crowd surrounding him */}
      <g opacity={d1Op}>
        {/* Technician — center */}
        <circle cx={235} cy={158} r={20} />
        <line x1={235} y1={178} x2={235} y2={268} />
        <line x1={235} y1={212} x2={210} y2={238} />
        <line x1={235} y1={212} x2={260} y2={238} />
        <line x1={235} y1={268} x2={215} y2={325} />
        <line x1={235} y1={268} x2={255} y2={325} />
        {/* Crowd surrounding */}
        <circle cx={162} cy={162} r={15} />
        <line x1={162} y1={177} x2={162} y2={252} />
        <line x1={162} y1={208} x2={140} y2={228} />
        <line x1={162} y1={208} x2={186} y2={220} />
        <line x1={162} y1={252} x2={144} y2={306} />
        <line x1={162} y1={252} x2={180} y2={304} />

        <circle cx={308} cy={162} r={15} />
        <line x1={308} y1={177} x2={308} y2={252} />
        <line x1={308} y1={208} x2={284} y2={222} />
        <line x1={308} y1={208} x2={330} y2={228} />
        <line x1={308} y1={252} x2={290} y2={306} />
        <line x1={308} y1={252} x2={326} y2={304} />
      </g>

      {/* D2: technician stepped out, open palms — arms raised wide */}
      <g opacity={d2Op}>
        <circle cx={155} cy={162} r={20} />
        <line x1={155} y1={182} x2={155} y2={272} />
        {/* Arms raised, palms open — spread wide */}
        <line x1={155} y1={212} x2={112} y2={198} /> {/* left arm up and out */}
        <line x1={155} y1={212} x2={198} y2={198} /> {/* right arm up and out */}
        <line x1={155} y1={272} x2={135} y2={330} />
        <line x1={155} y1={272} x2={175} y2={330} />
        {/* Crowd now behind him, blocking entrance */}
        <circle cx={295} cy={162} r={15} opacity={0.8} />
        <line x1={295} y1={177} x2={295} y2={252} opacity={0.8} />
        <line x1={295} y1={208} x2={272} y2={225} opacity={0.8} />
        <line x1={295} y1={208} x2={316} y2={228} opacity={0.8} />
        <line x1={295} y1={252} x2={278} y2={306} opacity={0.8} />
        <line x1={295} y1={252} x2={313} y2={304} opacity={0.8} />

        <circle cx={342} cy={168} r={13} opacity={0.6} />
        <line x1={342} y1={181} x2={342} y2={250} opacity={0.6} />
        <line x1={342} y1={208} x2={323} y2={228} opacity={0.6} />
        <line x1={342} y1={208} x2={360} y2={226} opacity={0.6} />
        <line x1={342} y1={250} x2={328} y2={302} opacity={0.6} />
        <line x1={342} y1={250} x2={358} y2={300} opacity={0.6} />
      </g>

      {/* D3: technician walking away — far left, from behind; panel unmanned */}
      <g opacity={d3Op}>
        {/* From-behind figure, mid-stride */}
        <circle cx={70} cy={165} r={18} />
        <line x1={70} y1={183} x2={70} y2={268} />
        <line x1={70} y1={218} x2={46} y2={245} /> {/* arm back-left */}
        <line x1={70} y1={218} x2={94} y2={240} /> {/* arm back-right */}
        <line x1={70} y1={268} x2={46} y2={326} /> {/* leg forward */}
        <line x1={70} y1={268} x2={93} y2={322} /> {/* leg back */}
        {/* Unmanned panel — faint ghost */}
        <rect x={258} y={160} width={70} height={140} strokeWidth="1.5" opacity={0.25} />
        <line x1={268} y1={195} x2={318} y2={195} strokeWidth="1.5" opacity={0.25} />
        <line x1={268} y1={222} x2={318} y2={222} strokeWidth="1.5" opacity={0.25} />
        <line x1={268} y1={249} x2={318} y2={249} strokeWidth="1.5" opacity={0.25} />
      </g>

      <line x1={40} y1={456} x2={452} y2={456} strokeWidth="2" opacity={0.35} />
    </svg>
  );
};

// ─── Doodle 3: Who Caused the Explosion? ─────────────────────────────────────
// D0: explosion starburst where reactor was + two broken buildings
// b[0]: destruction confirmed — third box tilts
// b[1]: technician appears at far right, empty space separates him from explosion
// b[2]: nothing added — the gap is the argument; image holds as verdict

const Doodle3: DoodleFC = ({ bullets: b }) => (
  <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
    {/* Explosion starburst — always visible */}
    <circle cx={175} cy={192} r={42} fill={ACCENT_GLOW} strokeWidth="0" />
    <circle cx={175} cy={192} r={20} fill="rgba(34,211,238,0.28)" strokeWidth="0" />
    <path d="M 175,150 L 185,112 L 172,96 L 188,58 L 175,44" />
    <path d="M 205,165 L 240,132 L 228,114 L 268,84 L 256,68" />
    <path d="M 218,192 L 258,182 L 254,164 L 302,156 L 298,140" />
    <path d="M 205,220 L 238,254 L 224,265 L 260,302" />
    <path d="M 175,234 L 172,278 L 158,285 L 172,326" />
    <path d="M 145,220 L 110,254 L 124,268 L 88,308" />
    <path d="M 132,192 L 90,183 L 95,165 L 48,157 L 54,142" />
    <path d="M 145,165 L 112,132 L 124,114 L 88,86 L 100,70" />

    {/* Broken buildings — always visible */}
    {/* Box 1 — tilted */}
    <path d="M 62,385 L 58,332 L 108,326 L 112,380 Z" />
    <line x1={58} y1={347} x2={108} y2={341} strokeWidth="2" />
    <line x1={80} y1={384} x2={78} y2={355} strokeWidth="2" />
    {/* Box 2 — slightly broken */}
    <path d="M 125,390 L 122,345 L 168,342 L 170,388 Z" />
    <path d="M 130,368 L 145,360 L 142,348" strokeWidth="2" opacity={0.7} /> {/* crack */}

    {/* Third box — falls with b[0] */}
    <g opacity={b[0]}>
      <path d="M 200,395 L 204,348 L 245,352 L 240,398 Z" transform={`rotate(${cl(b[0], 0, 12)}, 222, 372)`} />
    </g>

    {/* Technician — far right, appears with b[1] */}
    <g opacity={b[1]}>
      <circle cx={422} cy={192} r={20} />
      <line x1={422} y1={212} x2={422} y2={302} />
      <line x1={422} y1={248} x2={398} y2={272} /> {/* arms at sides */}
      <line x1={422} y1={248} x2={446} y2={272} />
      <line x1={422} y1={302} x2={402} y2={360} />
      <line x1={422} y1={302} x2={442} y2={360} />
    </g>

    {/* D3: nothing new — gap between x≈305 and x≈400 is the argument */}

    <line x1={40} y1={456} x2={455} y2={456} strokeWidth="2" opacity={0.35} />
  </svg>
);

// ─── Doodle 4: What Scripture Really Means ───────────────────────────────────
// D0: same technician figure, now with a halo — God is the technician
// b[0]: three icons appear below: city (Sodom), wave (flood), triangle (Egypt)
// b[1]: God steps back; arrows on icons push outward — He is being expelled
// b[2]: icons break apart; God stands to side, open hands, halo intact

const Doodle4: DoodleFC = ({ bullets: b }) => {
  // God starts far right, steps further right (expelled) with b[1]
  const godShift  = cl(b[1], 0, 36);
  // Left arm extends back toward icons with b[0]; stays extended as God moves right
  const armTipX   = cl(b[0], 390, 295);
  const armTipY   = cl(b[0], 235, 225);
  const intactOp  = cl(b[2], 1, 0);
  const brokenOp  = b[2];

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* God — far right, walking away but looking back, arm reaching left */}
      <g transform={`translate(${godShift}, 0)`}>
        {/* Head — offset left of body to suggest looking back */}
        <circle cx={385} cy={140} r={18} />
        {/* Body */}
        <line x1={395} y1={158} x2={395} y2={252} />
        {/* Left arm — extends back toward icons (outstretched hand) */}
        <line x1={395} y1={205} x2={armTipX} y2={armTipY} />
        {/* Right arm — tucked forward (walking away) */}
        <line x1={395} y1={205} x2={420} y2={245} />
        {/* Legs — walking stride, angled right */}
        <line x1={395} y1={252} x2={372} y2={325} />
        <line x1={395} y1={252} x2={418} y2={325} />
      </g>

      {/* City (Sodom) — two buildings, left side */}
      <g opacity={intactOp}>
        <rect x={52} y={295} width={40} height={52} strokeWidth="2.5" />
        <path d="M 48,295 L 72,276 L 96,295" strokeWidth="2" />
        <rect x={102} y={308} width={32} height={39} strokeWidth="2" />
        <path d="M 99,308 L 118,293 L 137,308" strokeWidth="2" />
      </g>
      {/* Broken city */}
      <g opacity={brokenOp}>
        <rect x={52} y={295} width={40} height={52} strokeWidth="2.5" transform="rotate(-10, 72, 321)" />
        <path d="M 48,295 L 72,276 L 96,295" strokeWidth="2" transform="rotate(-10, 72, 295)" />
        <path d="M 68,347 L 74,320 L 70,298" strokeWidth="2" />
        <rect x={102} y={308} width={32} height={39} strokeWidth="2" transform="rotate(13, 118, 327)" />
        <path d="M 115,347 L 120,325 L 117,310" strokeWidth="2" />
      </g>

      {/* Wave (Flood) — right of city */}
      <g opacity={intactOp}>
        <path d="M 185,340 Q 202,322 219,340 Q 236,358 253,340 Q 270,322 287,340 Q 304,358 321,340" strokeWidth="2.5" />
        <line x1={185} y1={362} x2={321} y2={362} strokeWidth="2" opacity={0.45} />
      </g>
      {/* Broken wave — overwhelmed, chaotic */}
      <g opacity={brokenOp}>
        <path d="M 172,328 Q 194,300 216,328 Q 238,356 260,328 Q 282,300 304,328 Q 326,356 348,328" strokeWidth="2.5" />
        <path d="M 172,358 Q 198,340 224,358 Q 250,376 276,358" strokeWidth="2" opacity={0.7} />
      </g>

      <line x1={40} y1={440} x2={455} y2={440} strokeWidth="2" opacity={0.35} />
    </svg>
  );
};

const SLIDE_DOODLES: DoodleFC[] = [Doodle1, Doodle2, Doodle3, Doodle4];

// ─── Title Card ───────────────────────────────────────────────────────────────

const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const fadeIn  = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [TITLE_FRAMES - 20, TITLE_FRAMES], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);
  const cfg = { damping: 20, stiffness: 55 };
  const titleSpring    = spring({ frame, fps, config: cfg });
  const subtitleSpring = spring({ frame: Math.max(0, frame - 22), fps, config: cfg });
  const cornerSize = interpolate(titleSpring, [0, 1], [0, 36]);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Audio src={staticFile("audio/nuclear/title.mp3")} />
      <div style={{ position: "absolute", top: 60, left: 80 }}>
        <div style={{ width: cornerSize, height: 2, backgroundColor: ACCENT }} />
        <div style={{ width: 2, height: cornerSize, backgroundColor: ACCENT }} />
      </div>
      <div style={{ position: "absolute", top: 60, right: 80, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div style={{ width: cornerSize, height: 2, backgroundColor: ACCENT }} />
        <div style={{ width: 2, height: cornerSize, backgroundColor: ACCENT, alignSelf: "flex-end" }} />
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ width: 2, height: cornerSize, backgroundColor: ACCENT }} />
        <div style={{ width: cornerSize, height: 2, backgroundColor: ACCENT }} />
      </div>
      <div style={{ position: "absolute", bottom: 60, right: 80, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end" }}>
        <div style={{ width: 2, height: cornerSize, backgroundColor: ACCENT, alignSelf: "flex-end" }} />
        <div style={{ width: cornerSize, height: 2, backgroundColor: ACCENT }} />
      </div>
      <p style={{ color: ACCENT_DIM, fontSize: 18, letterSpacing: "0.35em", textTransform: "uppercase", margin: "0 0 24px 0", opacity: subtitleSpring, fontWeight: 600 }}>
        Behold Your God · Illustration 01
      </p>
      <div style={{ width: 100 * titleSpring, height: 2, backgroundColor: ACCENT, marginBottom: 32 }} />
      <h1 style={{ color: TEXT_MAIN, fontSize: 88, fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "0.03em", opacity: titleSpring, textAlign: "center", lineHeight: 1.1 }}>The Nuclear</h1>
      <h1 style={{ color: ACCENT, fontSize: 88, fontWeight: 700, margin: "0 0 32px 0", letterSpacing: "0.03em", opacity: titleSpring, textAlign: "center", lineHeight: 1.1 }}>Power Plant</h1>
      <p style={{ color: ACCENT_DIM, fontSize: 22, letterSpacing: "0.28em", textTransform: "uppercase", margin: 0, opacity: subtitleSpring, fontWeight: 600 }}>
        What does it mean when God "destroys"?
      </p>
    </AbsoluteFill>
  );
};

// ─── Slide ────────────────────────────────────────────────────────────────────

const Slide: React.FC<{
  subtitle: string; title: string; bullets: string[];
  index: number; durationInFrames: number; DoodleComponent: DoodleFC;
}> = ({ subtitle, title, bullets, index, durationInFrames, DoodleComponent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const opacity = Math.min(fadeIn, fadeOut);

  const cfg = { damping: 22, stiffness: 75 };
  const titleIn = spring({ frame, fps, config: cfg });
  const audioPortion = durationInFrames - SLIDE_BUFFER_FRAMES;

  const bulletSpring = (i: number) => {
    const delay = Math.floor(audioPortion * 0.1) + i * Math.floor(audioPortion * 0.27);
    return spring({ frame: Math.max(0, frame - delay), fps, config: cfg });
  };

  const bulletSprings = [0, 1, 2].map(bulletSpring);
  const accentWidth = interpolate(titleIn, [0, 1], [0, 72]);

  return (
    <AbsoluteFill style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: "80px 120px", gap: 60, opacity, fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <Audio src={staticFile(`audio/nuclear/slide-${index + 1}.mp3`)} />
      <div style={{ position: "absolute", top: 52, right: 80, color: ACCENT_DIM, fontSize: 20, letterSpacing: "0.22em", fontWeight: 600, opacity: titleIn }}>
        {String(index + 1).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ width: accentWidth, height: 2, backgroundColor: ACCENT, marginBottom: 28, boxShadow: `0 0 8px ${ACCENT}` }} />
        <p style={{ color: ACCENT_DIM, fontSize: 24, letterSpacing: "0.28em", textTransform: "uppercase", margin: "0 0 18px 0", opacity: titleIn, fontWeight: 600 }}>{subtitle}</p>
        <h2 style={{ color: TEXT_MAIN, fontSize: 84, fontWeight: 700, margin: "0 0 64px 0", lineHeight: 1.15, opacity: titleIn, transform: `translateX(${interpolate(titleIn, [0, 1], [-30, 0])}px)` }}>{title}</h2>
        {bullets.map((text, i) => {
          const s = bulletSprings[i];
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 28, marginBottom: 36, opacity: s, transform: `translateX(${interpolate(s, [0, 1], [-50, 0])}px)` }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: ACCENT, marginTop: 17, flexShrink: 0, boxShadow: `0 0 6px ${ACCENT}` }} />
              <p style={{ color: TEXT_BODY, fontSize: 40, margin: 0, lineHeight: 1.55, fontWeight: 400 }}>{text}</p>
            </div>
          );
        })}
      </div>
      <div style={{ width: 500, height: 500, flexShrink: 0, opacity: titleIn }}>
        <DoodleComponent bullets={bulletSprings} />
      </div>
    </AbsoluteFill>
  );
};

// ─── Composition ──────────────────────────────────────────────────────────────

export const NuclearPlant: React.FC<NuclearPlantProps> = ({ slideDurations }) => {
  const starts = slideDurations.reduce<number[]>((acc, dur, i) => {
    acc.push(i === 0 ? TITLE_FRAMES : acc[i - 1] + slideDurations[i - 1]);
    return acc;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <ReactorGlow />
      <ScanlineOverlay />
      <Vignette />
      <GlobalProgressBar />
      <Sequence from={0} durationInFrames={TITLE_FRAMES}><TitleCard /></Sequence>
      {SLIDES.map((slide, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={slideDurations[i]}>
          <Slide subtitle={slide.subtitle} title={slide.title} bullets={slide.bullets}
            index={i} durationInFrames={slideDurations[i]} DoodleComponent={SLIDE_DOODLES[i]} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
