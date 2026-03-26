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

const TITLE_FRAMES = 120;       // 4s — accommodates title audio + breathing room
const SLIDE_BUFFER_FRAMES = 60; // 2s silence after each slide's audio
const TOTAL_SLIDES = 4;

// Accent colors — cool cyan, evoking a reactor's blue glow
const ACCENT       = "#22d3ee"; // bright cyan
const ACCENT_DIM   = "#0e7490"; // deep teal for subtitles
const ACCENT_GLOW  = "rgba(34,211,238,0.18)";
const BG           = "#06080f"; // near-black with a blue cast
const TEXT_MAIN    = "#f0f9ff"; // cool off-white
const TEXT_BODY    = "#cbd5e1"; // slate for bullets

export type NuclearPlantProps = {
  slideDurations: number[]; // per-slide frame count, set by Root.tsx
};

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

// ─── Atmospheric Overlays ─────────────────────────────────────────────────────

const ScanlineOverlay: React.FC = () => (
  <AbsoluteFill
    style={{
      backgroundImage:
        "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.06) 3px, rgba(0,0,0,0.06) 4px)",
      pointerEvents: "none",
      zIndex: 10,
    }}
  />
);

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
      pointerEvents: "none",
      zIndex: 9,
    }}
  />
);

// Subtle pulsing glow at center — like a reactor hum
const ReactorGlow: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.03, 0.10],
  );
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse 60% 50% at center, rgba(34,211,238,${pulse}) 0%, transparent 70%)`,
        pointerEvents: "none",
        zIndex: 1,
      }}
    />
  );
};

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
        height: 3,
        backgroundColor: ACCENT,
        zIndex: 20,
        boxShadow: `0 0 10px ${ACCENT}`,
      }}
    />
  );
};

// ─── Title Card ───────────────────────────────────────────────────────────────

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
  const cornerSize = interpolate(titleSpring, [0, 1], [0, 36]);

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Audio src={staticFile("audio/nuclear/title.mp3")} />

      {/* Corner brackets */}
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

      {/* Series label */}
      <p
        style={{
          color: ACCENT_DIM,
          fontSize: 18,
          letterSpacing: "0.35em",
          textTransform: "uppercase",
          margin: "0 0 24px 0",
          opacity: subtitleSpring,
          fontWeight: 600,
        }}
      >
        Behold Your God · Illustration 01
      </p>

      <div style={{ width: 100 * titleSpring, height: 2, backgroundColor: ACCENT, marginBottom: 32 }} />

      <h1
        style={{
          color: TEXT_MAIN,
          fontSize: 88,
          fontWeight: 700,
          margin: "0 0 12px 0",
          letterSpacing: "0.03em",
          opacity: titleSpring,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        The Nuclear
      </h1>
      <h1
        style={{
          color: ACCENT,
          fontSize: 88,
          fontWeight: 700,
          margin: "0 0 32px 0",
          letterSpacing: "0.03em",
          opacity: titleSpring,
          textAlign: "center",
          lineHeight: 1.1,
        }}
      >
        Power Plant
      </h1>

      <p
        style={{
          color: ACCENT_DIM,
          fontSize: 22,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          margin: 0,
          opacity: subtitleSpring,
          fontWeight: 600,
        }}
      >
        What does it mean when God "destroys"?
      </p>
    </AbsoluteFill>
  );
};

// ─── Individual Slide ─────────────────────────────────────────────────────────

const Slide: React.FC<{
  subtitle: string;
  title: string;
  bullets: string[];
  index: number;
  durationInFrames: number;
}> = ({ subtitle, title, bullets, index, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn  = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: "clamp" });
  const fadeOut = interpolate(frame, [durationInFrames - 18, durationInFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const opacity = Math.min(fadeIn, fadeOut);

  const cfg = { damping: 22, stiffness: 75 };
  const titleIn = spring({ frame, fps, config: cfg });

  const audioPortion = durationInFrames - SLIDE_BUFFER_FRAMES;
  const bulletSpring = (i: number) => {
    const delay = Math.floor(audioPortion * 0.1) + i * Math.floor(audioPortion * 0.27);
    return spring({ frame: Math.max(0, frame - delay), fps, config: cfg });
  };

  const accentWidth = interpolate(titleIn, [0, 1], [0, 72]);
  const slideLabel = `${String(index + 1).padStart(2, "0")} / ${String(TOTAL_SLIDES).padStart(2, "0")}`;

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 160px",
        opacity,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Audio src={staticFile(`audio/nuclear/slide-${index + 1}.mp3`)} />

      {/* Slide counter */}
      <div
        style={{
          position: "absolute",
          top: 52,
          right: 80,
          color: ACCENT_DIM,
          fontSize: 20,
          letterSpacing: "0.22em",
          fontWeight: 600,
          opacity: titleIn,
        }}
      >
        {slideLabel}
      </div>

      {/* Accent line */}
      <div style={{ width: accentWidth, height: 2, backgroundColor: ACCENT, marginBottom: 28, boxShadow: `0 0 8px ${ACCENT}` }} />

      {/* Subtitle */}
      <p
        style={{
          color: ACCENT_DIM,
          fontSize: 18,
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          margin: "0 0 14px 0",
          opacity: titleIn,
          fontWeight: 600,
        }}
      >
        {subtitle}
      </p>

      {/* Title */}
      <h2
        style={{
          color: TEXT_MAIN,
          fontSize: 64,
          fontWeight: 700,
          margin: "0 0 52px 0",
          lineHeight: 1.15,
          opacity: titleIn,
          transform: `translateX(${interpolate(titleIn, [0, 1], [-30, 0])}px)`,
        }}
      >
        {title}
      </h2>

      {/* Bullets */}
      {bullets.map((text, i) => {
        const s = bulletSpring(i);
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 22,
              marginBottom: 28,
              opacity: s,
              transform: `translateX(${interpolate(s, [0, 1], [-50, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: ACCENT,
                marginTop: 13,
                flexShrink: 0,
                boxShadow: `0 0 6px ${ACCENT}`,
              }}
            />
            <p
              style={{
                color: TEXT_BODY,
                fontSize: 30,
                margin: 0,
                lineHeight: 1.55,
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

      <Sequence from={0} durationInFrames={TITLE_FRAMES}>
        <TitleCard />
      </Sequence>

      {SLIDES.map((slide, i) => (
        <Sequence key={i} from={starts[i]} durationInFrames={slideDurations[i]}>
          <Slide
            subtitle={slide.subtitle}
            title={slide.title}
            bullets={slide.bullets}
            index={i}
            durationInFrames={slideDurations[i]}
          />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
