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
import { WHITE_HAT_BLACK_HAT_DURATIONS_S } from "./white-hat-black-hat-durations";

const TITLE_FRAMES = 207; // measured: title audio is 6.288s (188 frames) + ~19 frames buffer
const SLIDE_BUFFER_FRAMES = 30; // 1s buffer after audio — mutagen durations are accurate
const TOTAL_SLIDES = 4;

const ACCENT      = "#d4a843";
const ACCENT_DIM  = "#8a6820";
const ACCENT_GLOW = "rgba(212,168,67,0.18)";
const BG          = "#0c0805";
const TEXT_MAIN   = "#fef3c7";
const TEXT_BODY   = "#d4c4a0";

export type WhiteHatBlackHatProps = { slideDurations: number[] };

const SLIDES = [
  {
    subtitle: "The Setup",
    title: "The Classic Western",
    bullets: [
      "White hat means hero, black hat means villain — everyone knows the rules",
      "The villain rules the town through lies, theft, and violence",
      "The hero will restore justice. He always does.",
    ],
  },
  {
    subtitle: "The Twist",
    title: "Becoming What You Fight",
    bullets: [
      "To defeat the villain, the hero lies, steals, and kills — using his enemy's own methods",
      "The audience cheers: the ends justified the means",
      "But look carefully: what separates the hero from the villain now? Only the hat.",
    ],
  },
  {
    subtitle: "The False Magnification",
    title: "Satan's White Hat Logic",
    bullets: [
      "Satan argues: God's law must sometimes be broken to be upheld",
      "Plagues, floods, and fire — righteous tools for enforcing righteousness",
      "Wright calls this the false magnification — evil reasoning in holy costume",
    ],
  },
  {
    subtitle: "F.T. Wright's Answer",
    title: "God Never Broke His Law",
    bullets: [
      "Jesus was urged to call fire from heaven, to crush His enemies — He refused",
      "God never uses His own law against itself to enforce it — not once",
      "The true magnification is living the law perfectly, even to the cross",
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
  return <AbsoluteFill style={{ background: `radial-gradient(ellipse 60% 50% at center, rgba(212,168,67,${pulse}) 0%, transparent 70%)`, pointerEvents: "none", zIndex: 1 }} />;
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

// ─── Doodle 1: The Classic Western ───────────────────────────────────────────
// D0: hero (white hat — tall open outline) stands left; building facade right
// b[0]: villain (black hat — wide, hatched) appears right of center
// b[1]: money bag at villain's feet
// b[2]: frightened bystander head peeks from behind right building edge

const Doodle1: DoodleFC = ({ bullets: b }) => (
  <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
    {/* Building facade — right side */}
    <rect x={320} y={120} width={140} height={260} strokeWidth="2.5" />
    <rect x={335} y={148} width={46} height={38} strokeWidth="2" />
    <rect x={399} y={148} width={46} height={38} strokeWidth="2" />
    {/* Saloon door — double swing */}
    <rect x={358} y={282} width={22} height={58} strokeWidth="2" opacity={0.8} />
    <rect x={381} y={282} width={22} height={58} strokeWidth="2" opacity={0.8} />
    {/* Building sign */}
    <rect x={336} y={208} width={108} height={26} strokeWidth="1.5" opacity={0.6} />

    {/* Hero — white hat (tall open-outline crown) */}
    {/* Hat brim */}
    <line x1={92} y1={168} x2={152} y2={168} strokeWidth="2.5" />
    {/* Hat crown */}
    <line x1={99} y1={168} x2={102} y2={138} />
    <line x1={102} y1={138} x2={142} y2={138} />
    <line x1={142} y1={138} x2={145} y2={168} />
    {/* Head */}
    <circle cx={122} cy={190} r={18} />
    {/* Body */}
    <line x1={122} y1={208} x2={122} y2={312} />
    {/* Arms */}
    <line x1={122} y1={248} x2={92} y2={272} />
    <line x1={122} y1={248} x2={152} y2={272} />
    {/* Legs */}
    <line x1={122} y1={312} x2={100} y2={388} />
    <line x1={122} y1={312} x2={144} y2={388} />

    {/* Villain — black hat (wide brim, hatched crown), fades in with b[0] */}
    <g opacity={b[0]}>
      {/* Hat brim — wider */}
      <line x1={198} y1={175} x2={270} y2={175} strokeWidth="2.5" />
      {/* Hat crown — lower, wider */}
      <line x1={206} y1={175} x2={208} y2={152} />
      <line x1={208} y1={152} x2={260} y2={152} />
      <line x1={260} y1={152} x2={262} y2={175} />
      {/* Crown hatching — makes it look dark */}
      <line x1={216} y1={174} x2={221} y2={153} strokeWidth="1.5" opacity={0.8} />
      <line x1={228} y1={174} x2={233} y2={153} strokeWidth="1.5" opacity={0.8} />
      <line x1={240} y1={174} x2={245} y2={153} strokeWidth="1.5" opacity={0.8} />
      <line x1={252} y1={174} x2={255} y2={157} strokeWidth="1.5" opacity={0.8} />
      {/* Head */}
      <circle cx={234} cy={197} r={18} />
      {/* Body */}
      <line x1={234} y1={215} x2={234} y2={315} />
      {/* Arms */}
      <line x1={234} y1={254} x2={204} y2={278} />
      <line x1={234} y1={254} x2={264} y2={278} />
      {/* Legs */}
      <line x1={234} y1={315} x2={212} y2={388} />
      <line x1={234} y1={315} x2={256} y2={388} />
    </g>

    {/* Money bag — b[1] */}
    <g opacity={b[1]}>
      <circle cx={270} cy={360} r={20} strokeWidth="2.5" />
      <line x1={262} y1={340} x2={278} y2={340} strokeWidth="2" />
      <line x1={270} y1={318} x2={270} y2={340} strokeWidth="2" />
    </g>

    {/* Bystander peeking from right building edge — b[2] */}
    <g opacity={b[2]}>
      <circle cx={322} cy={238} r={14} strokeWidth="2" />
      {/* Eyes — wide/scared */}
      <circle cx={317} cy={234} r={3} strokeWidth="1.5" />
      <circle cx={327} cy={234} r={3} strokeWidth="1.5" />
    </g>

    <line x1={40} y1={456} x2={452} y2={456} strokeWidth="2" opacity={0.35} />
  </svg>
);

// ─── Doodle 2: Becoming What You Fight ───────────────────────────────────────
// D0: hero (white hat) left, villain (black hat) right — facing each other
// b[0]: hero draws gun (arm extends horizontal with gun shape)
// b[1]: hero's white hat outline fades; black hat hatching appears (hat changes)
// b[2]: equals sign between the two figures

const Doodle2: DoodleFC = ({ bullets: b }) => {
  const whiteHatOp = cl(b[1], 1, 0);
  const blackHatHatchOp = b[1];
  const armDownOp = cl(b[0], 1, 0);
  const armGunOp = b[0];

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* ── HERO (left, x=124) ── */}
      {/* Hat brim — always visible */}
      <line x1={94} y1={165} x2={154} y2={165} strokeWidth="2.5" />
      {/* White hat crown — fades out with b[1] */}
      <g opacity={whiteHatOp}>
        <line x1={101} y1={165} x2={104} y2={135} />
        <line x1={104} y1={135} x2={144} y2={135} />
        <line x1={144} y1={135} x2={147} y2={165} />
      </g>
      {/* Black hat hatching in hero's crown — fades in with b[1] */}
      <g opacity={blackHatHatchOp}>
        <line x1={101} y1={165} x2={104} y2={148} />
        <line x1={104} y1={148} x2={144} y2={148} />
        <line x1={144} y1={148} x2={147} y2={165} />
        <line x1={112} y1={164} x2={116} y2={149} strokeWidth="1.5" opacity={0.8} />
        <line x1={124} y1={164} x2={128} y2={149} strokeWidth="1.5" opacity={0.8} />
        <line x1={136} y1={164} x2={140} y2={149} strokeWidth="1.5" opacity={0.8} />
      </g>
      {/* Head */}
      <circle cx={124} cy={188} r={18} />
      {/* Body */}
      <line x1={124} y1={206} x2={124} y2={308} />
      {/* Left arm — always down */}
      <line x1={124} y1={246} x2={94} y2={270} />
      {/* Right arm down — fades out when gun drawn */}
      <g opacity={armDownOp}>
        <line x1={124} y1={246} x2={154} y2={270} />
      </g>
      {/* Right arm extended with gun — fades in with b[0] */}
      <g opacity={armGunOp}>
        <line x1={124} y1={246} x2={190} y2={236} />
        {/* Gun shape */}
        <rect x={190} y={228} width={22} height={14} strokeWidth="2" />
        <line x1={202} y1={228} x2={202} y2={218} strokeWidth="2" />
      </g>
      {/* Legs */}
      <line x1={124} y1={308} x2={102} y2={384} />
      <line x1={124} y1={308} x2={146} y2={384} />

      {/* ── VILLAIN (right, x=356) ── */}
      {/* Black hat brim */}
      <line x1={320} y1={172} x2={392} y2={172} strokeWidth="2.5" />
      {/* Black hat crown — lower */}
      <line x1={328} y1={172} x2={330} y2={150} />
      <line x1={330} y1={150} x2={382} y2={150} />
      <line x1={382} y1={150} x2={384} y2={172} />
      {/* Crown hatching */}
      <line x1={338} y1={171} x2={342} y2={151} strokeWidth="1.5" opacity={0.8} />
      <line x1={350} y1={171} x2={354} y2={151} strokeWidth="1.5" opacity={0.8} />
      <line x1={362} y1={171} x2={366} y2={151} strokeWidth="1.5" opacity={0.8} />
      <line x1={374} y1={171} x2={377} y2={156} strokeWidth="1.5" opacity={0.8} />
      {/* Head */}
      <circle cx={356} cy={195} r={18} />
      {/* Body */}
      <line x1={356} y1={213} x2={356} y2={315} />
      {/* Arms */}
      <line x1={356} y1={252} x2={326} y2={276} />
      <line x1={356} y1={252} x2={386} y2={276} />
      {/* Legs */}
      <line x1={356} y1={315} x2={334} y2={384} />
      <line x1={356} y1={315} x2={378} y2={384} />

      {/* Equals sign between them — b[2] */}
      <g opacity={b[2]}>
        <line x1={224} y1={228} x2={264} y2={228} strokeWidth="3" />
        <line x1={224} y1={246} x2={264} y2={246} strokeWidth="3" />
      </g>

      <line x1={40} y1={456} x2={452} y2={456} strokeWidth="2" opacity={0.35} />
    </svg>
  );
};

// ─── Doodle 3: Satan's White Hat Logic ───────────────────────────────────────
// D0: scales of justice (balanced beam + two pans)
// b[0]: sword appears on left pan (force argument)
// b[1]: beam tilts left-heavy (balanced beam fades, tilted beam fades in)
// b[2]: shadowy horned figure behind the scales (Satan)

const Doodle3: DoodleFC = ({ bullets: b }) => {
  const balancedOp = cl(b[1], 1, 0);
  const tiltedOp = b[1];

  return (
    <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
      {/* Post */}
      <line x1={240} y1={430} x2={240} y2={196} strokeWidth="3" />
      <circle cx={240} cy={196} r={8} />

      {/* Balanced beam — fades out with b[1] */}
      <g opacity={balancedOp}>
        <line x1={120} y1={196} x2={360} y2={196} strokeWidth="2.5" />
        {/* Left pan chain + pan */}
        <line x1={120} y1={196} x2={120} y2={252} strokeWidth="1.5" />
        <line x1={96} y1={252} x2={144} y2={252} strokeWidth="2.5" />
        {/* Right pan chain + pan */}
        <line x1={360} y1={196} x2={360} y2={252} strokeWidth="1.5" />
        <line x1={336} y1={252} x2={384} y2={252} strokeWidth="2.5" />
      </g>

      {/* Tilted beam (left heavy) — fades in with b[1] */}
      <g opacity={tiltedOp}>
        <line x1={120} y1={220} x2={360} y2={172} strokeWidth="2.5" />
        {/* Left pan lower */}
        <line x1={120} y1={220} x2={120} y2={284} strokeWidth="1.5" />
        <line x1={96} y1={284} x2={144} y2={284} strokeWidth="2.5" />
        {/* Right pan higher */}
        <line x1={360} y1={172} x2={360} y2={218} strokeWidth="1.5" />
        <line x1={336} y1={218} x2={384} y2={218} strokeWidth="2.5" />
      </g>

      {/* Sword on left pan — b[0] */}
      <g opacity={b[0]}>
        {/* Blade */}
        <line x1={113} y1={284} x2={127} y2={248} strokeWidth="2.5" />
        {/* Point */}
        <line x1={127} y1={248} x2={130} y2={240} strokeWidth="2" />
        {/* Crossguard */}
        <line x1={106} y1={268} x2={134} y2={268} strokeWidth="2.5" />
        {/* Grip */}
        <line x1={110} y1={278} x2={116} y2={286} strokeWidth="2" />
      </g>

      {/* Shadowy horned figure behind scales — b[2] */}
      <g opacity={b[2]}>
        <circle cx={186} cy={128} r={16} strokeWidth="1.5" opacity={0.7} />
        {/* Horns */}
        <line x1={178} y1={114} x2={170} y2={96} strokeWidth="2" opacity={0.7} />
        <line x1={194} y1={114} x2={202} y2={96} strokeWidth="2" opacity={0.7} />
        {/* Body suggestion */}
        <line x1={186} y1={144} x2={186} y2={186} strokeWidth="1.5" opacity={0.55} />
        <line x1={186} y1={162} x2={164} y2={178} strokeWidth="1.5" opacity={0.55} />
        <line x1={186} y1={162} x2={208} y2={178} strokeWidth="1.5" opacity={0.55} />
      </g>

      <line x1={40} y1={456} x2={452} y2={456} strokeWidth="2" opacity={0.35} />
    </svg>
  );
};

// ─── Doodle 4: God Never Broke His Law ───────────────────────────────────────
// D0: two stone law tablets (center-right) + simple cross (left)
// b[0]: Christ figure with open arms appears before the tablets
// b[1]: halo appears above Christ's head
// b[2]: rays radiate from the tablets (law intact, glowing)

const Doodle4: DoodleFC = ({ bullets: b }) => (
  <svg viewBox="0 0 480 480" width="100%" height="100%" {...svgProps}>
    {/* Cross — left */}
    <line x1={120} y1={84} x2={120} y2={380} strokeWidth="2.5" />
    <line x1={80} y1={188} x2={160} y2={188} strokeWidth="2.5" />

    {/* Law tablets — right */}
    {/* Left tablet */}
    <rect x={288} y={124} width={72} height={100} rx={6} ry={6} strokeWidth="2.5" />
    <line x1={300} y1={152} x2={348} y2={152} strokeWidth="1.5" opacity={0.7} />
    <line x1={300} y1={168} x2={348} y2={168} strokeWidth="1.5" opacity={0.7} />
    <line x1={300} y1={184} x2={340} y2={184} strokeWidth="1.5" opacity={0.7} />
    <line x1={300} y1={200} x2={334} y2={200} strokeWidth="1.5" opacity={0.7} />
    {/* Right tablet */}
    <rect x={370} y={124} width={72} height={100} rx={6} ry={6} strokeWidth="2.5" />
    <line x1={382} y1={152} x2={430} y2={152} strokeWidth="1.5" opacity={0.7} />
    <line x1={382} y1={168} x2={430} y2={168} strokeWidth="1.5" opacity={0.7} />
    <line x1={382} y1={184} x2={422} y2={184} strokeWidth="1.5" opacity={0.7} />
    <line x1={382} y1={200} x2={416} y2={200} strokeWidth="1.5" opacity={0.7} />

    {/* Christ figure with open arms — b[0] */}
    <g opacity={b[0]}>
      <circle cx={240} cy={224} r={20} />
      <line x1={240} y1={244} x2={240} y2={348} />
      {/* Arms spread wide */}
      <line x1={240} y1={282} x2={174} y2={252} />
      <line x1={240} y1={282} x2={306} y2={252} />
      {/* Legs */}
      <line x1={240} y1={348} x2={218} y2={410} />
      <line x1={240} y1={348} x2={262} y2={410} />
    </g>

    {/* Halo — b[1] */}
    <g opacity={b[1]}>
      <circle cx={240} cy={224} r={36} strokeWidth="1.5" opacity={0.45} />
    </g>

    {/* Rays from tablets — b[2] */}
    <g opacity={b[2]}>
      <line x1={288} y1={124} x2={274} y2={106} strokeWidth="2" />
      <line x1={324} y1={118} x2={322} y2={98} strokeWidth="2" />
      <line x1={362} y1={118} x2={364} y2={98} strokeWidth="2" />
      <line x1={406} y1={120} x2={418} y2={102} strokeWidth="2" />
      <line x1={442} y1={138} x2={458} y2={126} strokeWidth="2" />
      <line x1={448} y1={174} x2={466} y2={168} strokeWidth="2" />
    </g>

    <line x1={40} y1={456} x2={452} y2={456} strokeWidth="2" opacity={0.35} />
  </svg>
);

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
      <Audio src={staticFile("audio/white-hat-black-hat/title.mp3")} />
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
        Behold Your God · Illustration 03
      </p>
      <div style={{ width: 100 * titleSpring, height: 2, backgroundColor: ACCENT, marginBottom: 32 }} />
      <h1 style={{ color: TEXT_MAIN, fontSize: 88, fontWeight: 700, margin: "0 0 12px 0", letterSpacing: "0.03em", opacity: titleSpring, textAlign: "center", lineHeight: 1.1 }}>White Hat,</h1>
      <h1 style={{ color: ACCENT, fontSize: 88, fontWeight: 700, margin: "0 0 32px 0", letterSpacing: "0.03em", opacity: titleSpring, textAlign: "center", lineHeight: 1.1 }}>Black Hat</h1>
      <p style={{ color: ACCENT_DIM, fontSize: 22, letterSpacing: "0.28em", textTransform: "uppercase", margin: 0, opacity: subtitleSpring, fontWeight: 600 }}>
        What if breaking God&apos;s law is the only way to uphold it?
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
      <Audio src={staticFile(`audio/white-hat-black-hat/slide-${index + 1}.mp3`)} />
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

export const WhiteHatBlackHat: React.FC<WhiteHatBlackHatProps> = ({ slideDurations }) => {
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
