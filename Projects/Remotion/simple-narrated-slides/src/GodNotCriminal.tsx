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
import { GOD_NOT_CRIMINAL_DURATIONS_S } from "./god-not-criminal-durations";

const TITLE_FRAMES = 150;
const SLIDE_BUFFER_FRAMES = 60;
const TOTAL_SLIDES = 4;

const ACCENT      = "#fb923c";
const ACCENT_DIM  = "#c2410c";
const ACCENT_GLOW = "rgba(251,146,60,0.18)";
const BG          = "#06080f";
const TEXT_MAIN   = "#fff7ed";
const TEXT_BODY   = "#cbd5e1";

export type GodNotCriminalProps = { slideDurations: number[] };

const SLIDES = [
  {
    subtitle: "The Setup",
    title: "The Protection Racket",
    bullets: [
      "A crime syndicate sends an enforcer to a small business owner",
      "The demand: pay protection money — or face the consequences",
      "The owner refuses. He will not be extorted.",
    ],
  },
  {
    subtitle: "The Escalation",
    title: "The Enforcement Begins",
    bullets: [
      "First the windows. Then the warehouse. Then threats to his family.",
      "Every act of violence is designed to break his will",
      "The logic is simple: comply, or we will hurt you more",
    ],
  },
  {
    subtitle: "The Question That Changes Everything",
    title: "What Kind of God Is This?",
    bullets: [
      "Now apply that logic to God: Obey me — or I will destroy you",
      "Plagues, floods, fire — wielded as enforcement tools",
      "That god is not a protector. That god runs a protection racket.",
    ],
  },
  {
    subtitle: "F.T. Wright's Argument",
    title: "God Is Not a Criminal",
    bullets: [
      "God never uses compulsion — His only method is self-giving love",
      "A god who destroys to compel obedience operates on Satan's principle",
      "\"Compelling power is found only under Satan's government. Not God's.\"",
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
const AmbientGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(Math.sin(frame * 0.03), [-1, 1], [0.02, 0.08]);
  return <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 50% at center, rgba(251,146,60,${pulse}) 0%, transparent 70%)`, pointerEvents: "none", zIndex: 1 }} />;
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

const svgProps = {
  stroke: ACCENT, fill: "none",
  strokeWidth: "3" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

// ─── Doodle 1: The Protection Racket ─────────────────────────────────────────
// D0: storefront at right + businessman at counter with normal arms
// b[0]: enforcer figure with hat appears at left
// b[1]: envelope demand floats between them
// b[2]: businessman crosses arms in refusal (normal arms fade out)

const Doodle1: DoodleFC = ({ bullets: b }) => {
  const normalArmsOp = cl(b[2], 1, 0);
  const crossedArmsOp = b[2];

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* Storefront — always visible */}
      <rect x={258} y={148} width={182} height={220} strokeWidth="2.5" />
      {/* Left window */}
      <rect x={273} y={175} width={62} height={52} strokeWidth="2" />
      {/* Right window */}
      <rect x={363} y={175} width={62} height={52} strokeWidth="2" />
      {/* Door */}
      <rect x={305} y={283} width={48} height={85} strokeWidth="2" />
      {/* Counter line */}
      <line x1={266} y1={275} x2={432} y2={275} strokeWidth="2" opacity={0.5} />

      {/* Businessman — head + upper body above counter, always visible */}
      <circle cx={352} cy={200} r={18} />
      <line x1={352} y1={218} x2={352} y2={273} />
      {/* Normal arms */}
      <g opacity={normalArmsOp}>
        <line x1={352} y1={240} x2={326} y2={262} />
        <line x1={352} y1={240} x2={378} y2={262} />
      </g>
      {/* Crossed arms — refusal */}
      <g opacity={crossedArmsOp}>
        <line x1={328} y1={242} x2={378} y2={268} />
        <line x1={378} y1={242} x2={328} y2={268} />
      </g>

      {/* Enforcer — fades in with b[0] */}
      <g opacity={b[0]}>
        <circle cx={106} cy={194} r={19} />
        {/* Hat brim + crown */}
        <line x1={82} y1={177} x2={130} y2={177} strokeWidth="3" />
        <line x1={90} y1={175} x2={122} y2={175} strokeWidth="3.5" />
        <line x1={106} y1={213} x2={106} y2={302} />
        {/* One arm reaching forward toward store */}
        <line x1={106} y1={248} x2={76} y2={270} />
        <line x1={106} y1={248} x2={148} y2={254} />
        <line x1={106} y1={302} x2={84} y2={366} />
        <line x1={106} y1={302} x2={128} y2={366} />
      </g>

      {/* Demand envelope — fades in with b[1] */}
      <g opacity={b[1]}>
        <rect x={182} y={218} width={74} height={56} strokeWidth="2.5" />
        <path d="M 182,218 L 219,248 L 256,218" strokeWidth="2" />
        <line x1={196} y1={254} x2={244} y2={254} strokeWidth="1.5" opacity={0.7} />
        <line x1={196} y1={262} x2={232} y2={262} strokeWidth="1.5" opacity={0.7} />
      </g>

      <line x1={40} y1={456} x2={452} y2={456} strokeWidth="2" opacity={0.35} />
    </svg>
  );
};

// ─── Doodle 2: The Enforcement Begins ────────────────────────────────────────
// D0: storefront + businessman at counter (intact)
// b[0]: left window cracks — intact fades, jagged break appears
// b[1]: flames rise above the roofline
// b[2]: enforcer appears close-up at entrance, arm pointing inside

const Doodle2: DoodleFC = ({ bullets: b }) => {
  const intactWindowOp = cl(b[0], 1, 0);
  const brokenWindowOp = b[0];

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* Building — always visible */}
      <rect x={218} y={148} width={212} height={228} strokeWidth="2.5" />
      {/* Right window — always intact */}
      <rect x={350} y={175} width={62} height={50} strokeWidth="2" />
      {/* Door */}
      <rect x={284} y={288} width={46} height={88} strokeWidth="2" />
      {/* Counter */}
      <line x1={226} y1={282} x2={422} y2={282} strokeWidth="2" opacity={0.5} />

      {/* Left window — intact, fades out with b[0] */}
      <g opacity={intactWindowOp}>
        <rect x={234} y={175} width={62} height={50} strokeWidth="2" />
      </g>
      {/* Left window — broken, fades in with b[0] */}
      <g opacity={brokenWindowOp}>
        <rect x={234} y={175} width={62} height={50} strokeWidth="2" opacity={0.35} />
        <path d="M 265,200 L 248,183 L 255,188 L 244,177" strokeWidth="2.5" />
        <path d="M 265,200 L 282,179 L 274,185 L 283,172" strokeWidth="2.5" />
        <path d="M 265,200 L 242,214 L 248,210 L 236,222" strokeWidth="2.5" />
        <path d="M 265,200 L 287,215 L 280,209 L 292,223" strokeWidth="2.5" />
      </g>

      {/* Businessman — at counter, always visible */}
      <circle cx={346} cy={200} r={17} />
      <line x1={346} y1={217} x2={346} y2={280} />
      <line x1={346} y1={244} x2={322} y2={265} />
      <line x1={346} y1={244} x2={370} y2={265} />

      {/* Flames above building — b[1] */}
      <g opacity={b[1]}>
        <path d="M 218,148 L 228,120 L 246,142 L 263,112 L 281,136 L 299,108 L 318,130 L 336,104 L 355,128 L 374,148" strokeWidth="2.5" />
        <path d="M 240,148 L 248,130 L 258,146" strokeWidth="1.5" opacity={0.55} />
        <path d="M 352,148 L 362,126 L 372,144" strokeWidth="1.5" opacity={0.55} />
      </g>

      {/* Enforcer close-up, pointing in — b[2] */}
      <g opacity={b[2]}>
        <circle cx={146} cy={194} r={18} />
        <line x1={122} y1={178} x2={170} y2={178} strokeWidth="3" />
        <line x1={130} y1={176} x2={162} y2={176} strokeWidth="3.5" />
        <line x1={146} y1={212} x2={146} y2={300} />
        {/* Arm pointing aggressively toward door */}
        <line x1={146} y1={246} x2={218} y2={228} />
        <line x1={146} y1={246} x2={116} y2={268} />
        <line x1={146} y1={300} x2={124} y2={362} />
        <line x1={146} y1={300} x2={168} y2={362} />
      </g>

      <line x1={40} y1={456} x2={452} y2={456} strokeWidth="2" opacity={0.35} />
    </svg>
  );
};

// ─── Doodle 3: What Kind of God Is This? ─────────────────────────────────────
// D0: enthroned crowned figure (left) + three bowing people (right)
// b[0]: lightning bolt strikes down from throne toward the people
// b[1]: flood wave sweeps across the base + small fire above the crowd
// b[2]: protection demand envelope floats from the throne — it's a racket

const Doodle3: DoodleFC = ({ bullets: b }) => (
  <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
    {/* Throne platform steps */}
    <rect x={74} y={326} width={132} height={18} strokeWidth="2" />
    <rect x={90} y={308} width={100} height={18} strokeWidth="2" />
    {/* Throne chair */}
    <rect x={106} y={240} width={68} height={68} strokeWidth="2.5" />
    <rect x={110} y={176} width={60} height={64} strokeWidth="2" />
    {/* Armrests */}
    <line x1={106} y1={256} x2={88} y2={264} strokeWidth="2" />
    <line x1={174} y1={256} x2={192} y2={264} strokeWidth="2" />

    {/* Crowned figure on throne */}
    <circle cx={140} cy={204} r={19} />
    <path d="M 124,194 L 128,180 L 136,190 L 140,178 L 144,190 L 152,180 L 156,194" strokeWidth="2" />
    <line x1={140} y1={223} x2={140} y2={240} />
    <line x1={140} y1={228} x2={106} y2={254} />
    <line x1={140} y1={228} x2={174} y2={254} />

    {/* Bowing people — always visible */}
    <circle cx={326} cy={282} r={13} />
    <path d="M 326,295 Q 316,318 303,326" strokeWidth="2.5" />
    <line x1={315} y1={307} x2={295} y2={299} />

    <circle cx={376} cy={278} r={13} />
    <line x1={376} y1={291} x2={376} y2={330} />
    <line x1={376} y1={307} x2={355} y2={318} />
    <line x1={376} y1={307} x2={396} y2={318} />

    <circle cx={420} cy={284} r={11} opacity={0.7} />
    <path d="M 420,295 Q 410,316 397,322" strokeWidth="2" opacity={0.7} />

    {/* Lightning bolt — b[0] */}
    <g opacity={b[0]}>
      <path d="M 200,232 L 244,276 L 226,286 L 276,336 L 258,346" strokeWidth="3" />
    </g>

    {/* Flood wave + fire — b[1] */}
    <g opacity={b[1]}>
      <path d="M 214,368 Q 238,352 262,368 Q 286,384 310,368 Q 334,352 358,368 Q 382,384 406,368" strokeWidth="2.5" />
      <path d="M 214,384 Q 242,370 270,384 Q 298,398 326,384" strokeWidth="2" opacity={0.55} />
      <path d="M 308,278 L 316,258 L 326,274 L 334,252 L 344,268" strokeWidth="2" opacity={0.85} />
    </g>

    {/* Envelope from throne — b[2] — the protection racket callback */}
    <g opacity={b[2]}>
      <rect x={204} y={218} width={68} height={52} strokeWidth="2.5" />
      <path d="M 204,218 L 238,244 L 272,218" strokeWidth="2" />
      <line x1={218} y1={252} x2={258} y2={252} strokeWidth="1.5" opacity={0.7} />
      <line x1={218} y1={260} x2={248} y2={260} strokeWidth="1.5" opacity={0.7} />
    </g>

    <line x1={40} y1={440} x2={452} y2={440} strokeWidth="2" opacity={0.35} />
  </svg>
);

// ─── Doodle 4: God Is Not a Criminal ─────────────────────────────────────────
// D0: enforcer (hat, fist raised) on left; gentle figure (halo, open arms) on right
// b[0]: large X crosses out the enforcer
// b[1]: rays appear around gentle figure; gift circles appear in open palms
// b[2]: enforcer fades to ghost; gentle figure brightens to full opacity

const Doodle4: DoodleFC = ({ bullets: b }) => {
  const enforcerOp = cl(b[2], 1, 0.2);
  const gentleOp   = cl(b[2], 0.65, 1.0);

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* Faint dividing line between two panels */}
      <line x1={240} y1={80} x2={240} y2={400} strokeWidth="1.5" opacity={0.18} />

      {/* ENFORCER — left panel */}
      <g opacity={enforcerOp}>
        <circle cx={112} cy={186} r={20} />
        {/* Hat */}
        <line x1={88} y1={168} x2={136} y2={168} strokeWidth="3" />
        <line x1={95} y1={166} x2={129} y2={166} strokeWidth="3.5" />
        <line x1={112} y1={206} x2={112} y2={298} />
        {/* Fist raised — upper arm going up-left, forearm short (fist) */}
        <line x1={112} y1={242} x2={86} y2={204} />
        <line x1={86} y1={204} x2={74} y2={192} strokeWidth="3.5" />
        <line x1={112} y1={242} x2={142} y2={264} />
        <line x1={112} y1={298} x2={90} y2={360} />
        <line x1={112} y1={298} x2={134} y2={360} />
        {/* Broken items below */}
        <line x1={68} y1={390} x2={92} y2={382} strokeWidth="2" opacity={0.65} />
        <line x1={80} y1={378} x2={96} y2={398} strokeWidth="2" opacity={0.65} />
        <line x1={114} y1={388} x2={150} y2={380} strokeWidth="2" opacity={0.65} />
        <line x1={132} y1={376} x2={146} y2={396} strokeWidth="2" opacity={0.65} />
      </g>

      {/* X over enforcer — b[0] */}
      <g opacity={b[0]}>
        <line x1={72} y1={166} x2={156} y2={322} strokeWidth="4" />
        <line x1={156} y1={166} x2={72} y2={322} strokeWidth="4" />
      </g>

      {/* GENTLE FIGURE — right panel */}
      <g opacity={gentleOp}>
        <circle cx={362} cy={186} r={20} />
        {/* Halo */}
        <circle cx={362} cy={186} r={32} strokeWidth="1.5" opacity={0.35} />
        <line x1={362} y1={206} x2={362} y2={298} />
        {/* Open arms spread wide — giving gesture */}
        <line x1={362} y1={238} x2={316} y2={218} />
        <line x1={362} y1={238} x2={408} y2={218} />
        <line x1={362} y1={298} x2={340} y2={360} />
        <line x1={362} y1={298} x2={384} y2={360} />
        {/* Gift circles in open palms */}
        <circle cx={308} cy={216} r={8} opacity={b[1]} strokeWidth="2" />
        <circle cx={416} cy={216} r={8} opacity={b[1]} strokeWidth="2" />
      </g>

      {/* Rays around gentle figure — b[1] */}
      <g opacity={b[1]}>
        <line x1={362} y1={150} x2={362} y2={136} strokeWidth="2" />
        <line x1={384} y1={156} x2={394} y2={144} strokeWidth="2" />
        <line x1={396} y1={176} x2={412} y2={170} strokeWidth="2" />
        <line x1={340} y1={156} x2={330} y2={144} strokeWidth="2" />
        <line x1={328} y1={176} x2={312} y2={170} strokeWidth="2" />
      </g>

      <line x1={40} y1={440} x2={452} y2={440} strokeWidth="2" opacity={0.35} />
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
      <Audio src={staticFile("audio/god-not-criminal/title.mp3")} />
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
        Behold Your God · Illustration 02
      </p>
      <div style={{ width: 100 * titleSpring, height: 2, backgroundColor: ACCENT, marginBottom: 32 }} />
      <h1 style={{ color: TEXT_MAIN, fontSize: 88, fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "0.03em", opacity: titleSpring, textAlign: "center", lineHeight: 1.1 }}>God Is Not</h1>
      <h1 style={{ color: ACCENT, fontSize: 88, fontWeight: 700, margin: "0 0 32px 0", letterSpacing: "0.03em", opacity: titleSpring, textAlign: "center", lineHeight: 1.1 }}>a Criminal</h1>
      <p style={{ color: ACCENT_DIM, fontSize: 22, letterSpacing: "0.28em", textTransform: "uppercase", margin: 0, opacity: subtitleSpring, fontWeight: 600 }}>
        What if God used force to compel obedience?
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
      <Audio src={staticFile(`audio/god-not-criminal/slide-${index + 1}.mp3`)} />
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

export const GodNotCriminal: React.FC<GodNotCriminalProps> = ({ slideDurations }) => {
  const starts = slideDurations.reduce<number[]>((acc, dur, i) => {
    acc.push(i === 0 ? TITLE_FRAMES : acc[i - 1] + slideDurations[i - 1]);
    return acc;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <AmbientGlow />
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
