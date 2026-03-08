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

const BUILD = "B3";
const TITLE_FRAMES = 120;       // 4s — accommodates 3.5s title audio + breathing room
const SLIDE_BUFFER_FRAMES = 60; // 2s silence appended after each slide's audio
const TOTAL_SLIDES = 5;

export type Britain1940Props = {
  slideDurations: number[]; // per-slide frame count, set by Root.tsx
};

const SLIDES = [
  {
    subtitle: "Britain Stands Alone",
    title: "The Strategic Situation of 1940",
    bullets: [
      "France collapsed; Britain faced existential isolation",
      "Two simultaneous threats: air invasion & Atlantic strangulation",
      "Losing either front meant total defeat",
    ],
  },
  {
    subtitle: "Air Superiority Decided Everything",
    title: "The Battle of Britain",
    bullets: [
      "Luftwaffe needed air control for a Channel crossing",
      "Dowding System: radar, ground observers & centralized command",
      "Outnumbered RAF pilots inflicted unsustainable losses, halting the invasion",
    ],
  },
  {
    subtitle: "Survival Through Supply Lines",
    title: "The Atlantic Tonnage War",
    bullets: [
      "U-boat wolfpacks systematically hunted merchant convoys",
      "Early years brought catastrophic Allied shipping losses",
      "Britain's food and raw materials hung by a thread",
    ],
  },
  {
    subtitle: "The Invisible Turning Points",
    title: "Technology & Cryptography",
    bullets: [
      "ASDIC sonar allowed escort destroyers to locate and destroy U-boats",
      "Bletchley Park cracked German Enigma communications",
      "Intelligence intercepts shifted strategic advantage to the Allies",
    ],
  },
  {
    subtitle: "From Survival to Victory",
    title: "The Foundation for Liberation",
    bullets: [
      "Escort carriers finally closed the dangerous Mid-Atlantic air gap",
      "U-boat threat neutralized; Britain's survival secured",
      "Hard-won victories provided the foundation for liberating Europe",
    ],
  },
];

// ─── Scanline Overlay ─────────────────────────────────────────────────────────
// Subtle horizontal lines give a CRT/documentary film texture — on-theme for 1940s
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

// ─── Vignette ─────────────────────────────────────────────────────────────────
// Darkens edges for a cinematic, focused feel
const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      background:
        "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%)",
      pointerEvents: "none",
      zIndex: 9,
    }}
  />
);

// ─── Global Progress Bar ──────────────────────────────────────────────────────
// Amber line at very bottom tracking position through the entire composition
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
        backgroundColor: "#b45309",
        zIndex: 20,
        boxShadow: "0 0 8px rgba(180,83,9,0.6)",
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

  // Decorative border corners that draw in with the title
  const cornerSize = interpolate(titleSpring, [0, 1], [0, 32]);

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
      <Audio src={staticFile("audio/title.mp3")} />

      {/* Top-left corner bracket */}
      <div style={{ position: "absolute", top: 60, left: 80 }}>
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#b45309" }} />
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#b45309" }} />
      </div>
      {/* Top-right corner bracket */}
      <div style={{ position: "absolute", top: 60, right: 80, display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#b45309" }} />
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#b45309", alignSelf: "flex-end" }} />
      </div>
      {/* Bottom-left corner bracket */}
      <div style={{ position: "absolute", bottom: 60, left: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#b45309" }} />
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#b45309" }} />
      </div>
      {/* Bottom-right corner bracket */}
      <div style={{ position: "absolute", bottom: 60, right: 80, display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "flex-end" }}>
        <div style={{ width: 2, height: cornerSize, backgroundColor: "#b45309", alignSelf: "flex-end" }} />
        <div style={{ width: cornerSize, height: 2, backgroundColor: "#b45309" }} />
      </div>

      <div style={{ width: 120 * titleSpring, height: 3, backgroundColor: "#b45309", marginBottom: 36 }} />
      <h1
        style={{
          color: "#fef3c7",
          fontSize: 100,
          fontWeight: 700,
          margin: "0 0 28px 0",
          letterSpacing: "0.06em",
          opacity: titleSpring,
          textAlign: "center",
        }}
      >
        Britain 1940
      </h1>
      <p
        style={{
          color: "#92400e",
          fontSize: 26,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          margin: 0,
          opacity: subtitleSpring,
          fontFamily: "system-ui, sans-serif",
          fontWeight: 600,
        }}
      >
        Survival on Two Fronts
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

  // Stagger bullets across the audio portion only (excluding the 2s silence buffer),
  // so bullet 3 appears before the narration finishes rather than during silence.
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
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Narration audio */}
      <Audio src={staticFile(`audio/slide-${index + 1}.mp3`)} />

      {/* Slide counter — top right */}
      <div
        style={{
          position: "absolute",
          top: 52,
          right: 80,
          color: "rgba(180,83,9,0.75)",
          fontFamily: "system-ui, sans-serif",
          fontSize: 20,
          letterSpacing: "0.22em",
          fontWeight: 600,
          opacity: titleIn,
        }}
      >
        {slideLabel}
      </div>

      {/* Amber accent line */}
      <div style={{ width: accentWidth, height: 3, backgroundColor: "#b45309", marginBottom: 28 }} />

      {/* Subtitle */}
      <p
        style={{
          color: "#92400e",
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

      {/* Title */}
      <h2
        style={{
          color: "#fef3c7",
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

      {/* Bullets — slide in from left */}
      {bullets.map((text, i) => {
        const s = bulletSpring(i);
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
                backgroundColor: "#b45309",
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

// ─── Composition ──────────────────────────────────────────────────────────────
export const Britain1940: React.FC<Britain1940Props> = ({ slideDurations }) => {
  const starts = slideDurations.reduce<number[]>((acc, dur, i) => {
    acc.push(i === 0 ? TITLE_FRAMES : acc[i - 1] + slideDurations[i - 1]);
    return acc;
  }, []);

  return (
    <AbsoluteFill style={{ backgroundColor: "#0c0a09" }}>
      {/* Atmospheric overlays — always on top */}
      <ScanlineOverlay />
      <Vignette />
      <GlobalProgressBar />

      {/* Build indicator — remove when confirmed working */}
      <div style={{
        position: "absolute", top: 16, left: 24, zIndex: 99,
        color: "rgba(251,191,36,0.9)", fontFamily: "monospace", fontSize: 18, fontWeight: 700,
        letterSpacing: "0.1em",
      }}>{BUILD}</div>

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
