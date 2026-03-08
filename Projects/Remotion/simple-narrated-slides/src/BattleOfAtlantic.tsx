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

// ── Timing constants ───────────────────────────────────────────────────────────
// Must match the values used in Root.tsx to compute slide durations.
export const SLIDE_INTRO_FRAMES  = 24;  // frames before first bullet audio starts
export const BULLET_GAP_FRAMES   = 18;  // silence between bullets (0.6s at 30fps)
export const SLIDE_BUFFER_FRAMES = 45;  // silence after last bullet before slide ends

const TITLE_FRAMES = 120;
const TOTAL_SLIDES = 5;

export type BattleOfAtlanticProps = {
  /** Per-slide array of per-bullet frame counts, computed in Root.tsx */
  bulletDurationsFrames: number[][];
};

// ── Slide content (display text only — narrations live in generate-atlantic-audio.mjs) ──
const SLIDES = [
  {
    subtitle: "Britain's Lifeline",
    title: "The Strategic Stakes",
    bullets: [
      "70% of Britain's food, fuel, and war materials arrived by sea from North America",
      "Germany's goal: sever the convoy routes and starve Britain into surrender",
      "No invasion needed — control the Atlantic, and Britain falls",
    ],
  },
  {
    subtitle: "The Wolfpack Strategy",
    title: "U-boat Terror",
    bullets: [
      "Dönitz's wolfpacks: U-boats converge on a convoy guided by radio signals",
      "Attacking on the surface at night overwhelmed Allied escort vessels",
      "1940–41 — the 'Happy Time': Allied shipping losses reached catastrophic levels",
    ],
  },
  {
    subtitle: "The Killing Ground",
    title: "The Atlantic Gap",
    bullets: [
      "The 'Black Pit': mid-Atlantic waters beyond the reach of land-based aircraft",
      "U-boats hunted unimpeded, free from any threat of air attack",
      "1942 — peak year of losses: over a thousand Allied ships sent to the bottom",
    ],
  },
  {
    subtitle: "Science Turns the Tide",
    title: "The Technology War",
    bullets: [
      "Bletchley Park broke German naval Enigma — wolfpack positions revealed",
      "HF/DF 'Huff Duff' let escorts pinpoint transmitting U-boats before they struck",
      "Escort carriers and long-range Liberators finally closed the deadly Gap",
    ],
  },
  {
    subtitle: "Black May and Beyond",
    title: "The Turning Point",
    bullets: [
      "May 1943: 43 U-boats sunk in a single month — unsustainable losses for Germany",
      "Dönitz withdrew his remaining submarines from the North Atlantic",
      "Allied supply lines secured — the foundation for the liberation of Europe was laid",
    ],
  },
];

// ── Shared overlays ────────────────────────────────────────────────────────────
const ScanlineOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)",
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%)",
      pointerEvents: "none",
      zIndex: 9,
    }}
  />
);

const GlobalProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const progress = frame / (durationInFrames - 1);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: `${progress * 100}%`,
        height: 4,
        backgroundColor: "#0ea5e9",
        zIndex: 20,
        boxShadow: "0 0 8px rgba(14,165,233,0.6)",
      }}
    />
  );
};

// ── Title Card ─────────────────────────────────────────────────────────────────
const TitleCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [TITLE_FRAMES - 20, TITLE_FRAMES], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const cfg = { damping: 20, stiffness: 55 };
  const titleSpring    = spring({ frame,                          fps, config: cfg });
  const subtitleSpring = spring({ frame: Math.max(0, frame - 22), fps, config: cfg });
  const cornerSize     = interpolate(titleSpring, [0, 1], [0, 32]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      <Audio src={staticFile("audio/atlantic/title.mp3")} />

      {/* Corner brackets */}
      <div style={{ position: "absolute", top: 60, left: 80 }}>
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#0ea5e9" }} />
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#0ea5e9" }} />
      </div>
      <div style={{ position: "absolute", top: 60, right: 80, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#0ea5e9" }} />
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#0ea5e9", alignSelf: "flex-end" }} />
      </div>
      <div style={{ position: "absolute", bottom: 60, left: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#0ea5e9" }} />
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#0ea5e9" }} />
      </div>
      <div style={{ position: "absolute", bottom: 60, right: 80, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end" }}>
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#0ea5e9", alignSelf: "flex-end" }} />
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#0ea5e9" }} />
      </div>

      <div style={{ width: 140 * titleSpring, height: 3, backgroundColor: "#0ea5e9", marginBottom: 36 }} />
      <h1
        style={{
          color: "#e0f2fe",
          fontSize: 88,
          fontWeight: 700,
          margin: "0 0 28px 0",
          letterSpacing: "0.04em",
          opacity: titleSpring,
          textAlign: "center",
        }}
      >
        Battle of the Atlantic
      </h1>
      <p
        style={{
          color: "#38bdf8",
          fontSize: 22,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          margin: 0,
          opacity: subtitleSpring,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
        }}
      >
        The Longest Campaign · 1939–1945
      </p>
    </AbsoluteFill>
  );
};

// ── Slide ──────────────────────────────────────────────────────────────────────
const Slide: React.FC<{
  subtitle: string;
  title: string;
  bullets: string[];
  slideIndex: number;
  bulletDurationsFrames: number[];
  durationInFrames: number;
}> = ({ subtitle, title, bullets, slideIndex, bulletDurationsFrames, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const cfg     = { damping: 22, stiffness: 75 };
  const titleIn = spring({ frame, fps, config: cfg });

  // Compute exact start frame for each bullet from bullet durations.
  // Bullet 0 starts at SLIDE_INTRO_FRAMES; each subsequent bullet starts after
  // the previous bullet's audio + gap.
  const bulletStartFrames = bullets.map((_, i) => {
    let start = SLIDE_INTRO_FRAMES;
    for (let j = 0; j < i; j++) {
      start += bulletDurationsFrames[j] + BULLET_GAP_FRAMES;
    }
    return start;
  });

  const accentWidth = interpolate(titleIn, [0, 1], [0, 72]);
  const slideLabel  = `${String(slideIndex + 1).padStart(2, "0")} / ${String(TOTAL_SLIDES).padStart(2, "0")}`;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 160px",
        opacity,
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Per-bullet audio — each clip plays at the exact frame its bullet appears */}
      {bullets.map((_, i) => (
        <Sequence
          key={`audio-${i}`}
          from={bulletStartFrames[i]}
          durationInFrames={bulletDurationsFrames[i] + BULLET_GAP_FRAMES}
        >
          <Audio src={staticFile(`audio/atlantic/s${slideIndex + 1}b${i + 1}.mp3`)} />
        </Sequence>
      ))}

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          top: 52,
          right: 80,
          color: "rgba(14,165,233,0.75)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 20,
          letterSpacing: "0.22em",
          fontWeight: 600,
          opacity: titleIn,
        }}
      >
        {slideLabel}
      </div>

      <div style={{ width: accentWidth, height: 3, backgroundColor: "#0ea5e9", marginBottom: 28 }} />

      <p
        style={{
          color: "#38bdf8",
          fontSize: 19,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          margin: "0 0 14px 0",
          opacity: titleIn,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
        }}
      >
        {subtitle}
      </p>

      <h2
        style={{
          color: "#e0f2fe",
          fontSize: 62,
          fontWeight: 700,
          margin: "0 0 52px 0",
          lineHeight: 1.15,
          opacity: titleIn,
          transform: `translateX(${interpolate(titleIn, [0, 1], [-30, 0])}px)`,
        }}
      >
        {title}
      </h2>

      {/* Bullets — each springs in at its exact start frame, audio plays simultaneously */}
      {bullets.map((text, i) => {
        const s = spring({ frame: Math.max(0, frame - bulletStartFrames[i]), fps, config: cfg });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 22,
              marginBottom: 26,
              opacity: s,
              transform: `translateX(${interpolate(s, [0, 1], [-50, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: "#0ea5e9",
                marginTop: 13,
                flexShrink: 0,
              }}
            />
            <p
              style={{
                color: "#d1d5db",
                fontSize: 30,
                margin: 0,
                lineHeight: 1.55,
                fontFamily: "system-ui, sans-serif",
                fontWeight: 400,
              }}
            >
              {text}
            </p>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── Composition ────────────────────────────────────────────────────────────────
export const BattleOfAtlantic: React.FC<BattleOfAtlanticProps> = ({ bulletDurationsFrames }) => {
  // Compute per-slide total durations from bullet durations.
  // This must match the calculation in Root.tsx.
  const slideDurations = bulletDurationsFrames.map((bullets) =>
    SLIDE_INTRO_FRAMES +
    bullets.reduce((sum, dur) => sum + dur + BULLET_GAP_FRAMES, 0) +
    SLIDE_BUFFER_FRAMES
  );

  const starts = slideDurations.reduce<number[]>((acc, dur, i) => {
    acc.push(i === 0 ? TITLE_FRAMES : acc[i - 1] + slideDurations[i - 1]);
    return acc;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c1a2e" }}>
      <ScanlineOverlay />
      <Vignette />
      <GlobalProgressBar />

      <Sequence from={0} durationInFrames={TITLE_FRAMES}>
        <TitleCard />
      </Sequence>

      {SLIDES.map((slide, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={slideDurations[i]}>
          <Slide
            subtitle={slide.subtitle}
            title={slide.title}
            bullets={slide.bullets}
            slideIndex={i}
            bulletDurationsFrames={bulletDurationsFrames[i]}
            durationInFrames={slideDurations[i]}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
