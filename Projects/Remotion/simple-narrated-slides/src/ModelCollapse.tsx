import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// ─── Constants ───────────────────────────────────────────────────────────────
const CYCLE_FRAMES = 60; // 2 seconds at 30 fps → 5 cycles in 10 s
const TOTAL_CYCLES = 5;

// Colors: vibrant green (human) ↔ muddy warm gray (synthetic)
const HUMAN_COLOR = { r: 34, g: 197, b: 94 } as const;   // green-500
const SYNTH_COLOR = { r: 120, g: 113, b: 100 } as const; // warm muddy gray

// ─── Deterministic data-point layout (no Math.random) ────────────────────────
const DATA_POINTS = Array.from({ length: 36 }, (_, i) => ({
  id: i,
  angle: (i * 137.508) % 360,           // golden-angle spread
  startRadius: 280 + (i % 6) * 48,      // 280–520 px from centre
  delay: (i * 13) % CYCLE_FRAMES,       // staggered 0–59 frame delay
  duration: 42 + (i % 5) * 8,           // 42–74 frames travel time
}));

// ─── DataPoint ────────────────────────────────────────────────────────────────
// Each dot remembers the cycle colour it was "born" in — determined by
// which model cycle was active when this loop instance began.
const DataPoint: React.FC<{
  angle: number;
  startRadius: number;
  delay: number;
  duration: number;
}> = ({ angle, startRadius, delay, duration }) => {
  const frame = useCurrentFrame();

  const loopLength = duration + 22; // journey + brief pause before respawn
  const localFrame = frame - delay;
  if (localFrame < 0) return null;

  const loopFrame = localFrame % loopLength;
  if (loopFrame >= duration) return null; // absorbed / respawning

  const progress = loopFrame / duration;

  // Which cycle was active when this loop instance began?
  const loopStartFrame = frame - loopFrame;
  const spawnCycle = Math.floor(loopStartFrame / CYCLE_FRAMES);
  const spawnIsHuman = spawnCycle % 2 === 0;

  const dotColor = spawnIsHuman
    ? "rgba(74,222,128,0.9)"   // green-400
    : "rgba(161,155,143,0.85)"; // warm muddy gray
  const glow = spawnIsHuman
    ? "0 0 8px 2px rgba(74,222,128,0.5)"
    : "0 0 6px 1px rgba(161,155,143,0.3)";

  const rad = (angle * Math.PI) / 180;
  const radius = startRadius * (1 - progress);
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  // Fade out as dot converges on the model
  const opacity = interpolate(progress, [0.78, 1], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const size = interpolate(progress, [0, 1], [9, 3]);

  return (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: dotColor,
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
        opacity,
        boxShadow: glow,
      }}
    />
  );
};

// ─── TheModel ─────────────────────────────────────────────────────────────────
// Central blob. At each cycle boundary a spring-driven jitter makes
// the shape incoherent before it settles back to a circle.
const TheModel: React.FC<{
  cycleFrame: number;
  isHuman: boolean;
  fps: number;
  cycleIndex: number;
}> = ({ cycleFrame, isHuman, fps, cycleIndex }) => {
  // Four independent springs — each corner lags the previous slightly.
  // Low damping → over-shoots → organic wobble.
  const cfg = { damping: 5, stiffness: 260, mass: 0.45 };
  const s0 = spring({ frame: cycleFrame,                      fps, config: cfg });
  const s1 = spring({ frame: Math.max(0, cycleFrame - 3),     fps, config: cfg });
  const s2 = spring({ frame: Math.max(0, cycleFrame - 6),     fps, config: cfg });
  const s3 = spring({ frame: Math.max(0, cycleFrame - 9),     fps, config: cfg });

  // Each corner alternates distortion direction for an asymmetric blob
  const amplitude = 40;
  const c0 = 50 + (1 - s0) * +amplitude;
  const c1 = 50 + (1 - s1) * -amplitude;
  const c2 = 50 + (1 - s2) * +amplitude;
  const c3 = 50 + (1 - s3) * -amplitude;

  // Brief scale-punch at transition then settles to 1.0
  const scaleSpring = spring({
    frame: cycleFrame,
    fps,
    config: { damping: 8, stiffness: 220, mass: 0.5 },
  });
  const scale = interpolate(scaleSpring, [0, 1], [1.22, 1.0]);

  // Colour: snaps on cycle boundary (no CSS transition — frame-accurate)
  const { r, g, b } = isHuman ? HUMAN_COLOR : SYNTH_COLOR;
  const modelColor = `rgb(${r},${g},${b})`;
  const glowColor = isHuman
    ? "rgba(34,197,94,0.45)"
    : "rgba(120,113,100,0.35)";

  // Progressive degradation: each synthetic cycle dims the glow slightly
  const degradation = Math.min(cycleIndex / (TOTAL_CYCLES - 1), 1);
  const outerGlowSize = interpolate(degradation, [0, 1], [45, 20]);

  return (
    <div
      style={{
        position: "relative",
        width: 200,
        height: 200,
        backgroundColor: modelColor,
        // 8-value border-radius: H radii / V radii — creates asymmetric blob
        borderRadius: `${c0}% ${c1}% ${c2}% ${c3}% / ${c3}% ${c0}% ${c1}% ${c2}%`,
        transform: `scale(${scale})`,
        boxShadow: `0 0 ${outerGlowSize}px 8px ${glowColor}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "none",
      }}
    >
      <span
        style={{
          color: "rgba(0,0,0,0.55)",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          userSelect: "none",
          textAlign: "center",
          lineHeight: 1.4,
          padding: "0 12px",
        }}
      >
        The{"\n"}Model
      </span>
    </div>
  );
};

// ─── Generation Counter ───────────────────────────────────────────────────────
// Shows small pills for each cycle, filled when reached.
const GenerationPips: React.FC<{ cycleIndex: number }> = ({ cycleIndex }) => {
  return (
    <div className="flex gap-3">
      {Array.from({ length: TOTAL_CYCLES }, (_, i) => {
        const isHumanCycle = i % 2 === 0;
        const reached = i <= cycleIndex;
        const bg = reached
          ? isHumanCycle
            ? "rgba(34,197,94,0.85)"
            : "rgba(120,113,100,0.85)"
          : "rgba(255,255,255,0.1)";
        return (
          <div
            key={i}
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: bg,
              border: "1px solid rgba(255,255,255,0.15)",
            }}
          />
        );
      })}
    </div>
  );
};

// ─── Main Composition ─────────────────────────────────────────────────────────
export const ModelCollapse: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cycleIndex = Math.floor(frame / CYCLE_FRAMES);
  const cycleFrame = frame % CYCLE_FRAMES;
  const isHuman = cycleIndex % 2 === 0;

  // Fade-in the status label at the start of each cycle
  const labelFade = spring({
    frame: cycleFrame,
    fps,
    config: { damping: 20, stiffness: 120 },
  });

  const statusText = isHuman ? "Consuming Human Data" : "Consuming Synthetic Data";
  const statusColor = isHuman ? "#4ade80" : "#a09b8f";
  const statusBorder = isHuman ? "rgba(74,222,128,0.4)" : "rgba(161,155,143,0.3)";
  const statusBg = isHuman ? "rgba(74,222,128,0.07)" : "rgba(161,155,143,0.07)";

  // Subtle vignette opacity pulses with the cycle
  const vignette = interpolate(cycleFrame, [0, 10, 60], [0.6, 0.3, 0.3], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill className="bg-gray-950 flex items-center justify-center overflow-hidden">

      {/* Radial vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,${vignette}) 100%)`,
          pointerEvents: "none",
        }}
      />

      {/* Title block */}
      <div className="absolute top-10 left-0 right-0 flex flex-col items-center gap-2">
        <h1
          className="text-white font-black uppercase tracking-[0.22em]"
          style={{ fontSize: 52 }}
        >
          The Recursive Loop
        </h1>
        <p className="text-gray-500 text-sm tracking-[0.3em] uppercase">
          Model Collapse · Visualization
        </p>
      </div>

      {/* Orbit ring */}
      <div
        className="absolute rounded-full"
        style={{
          width: 580,
          height: 580,
          border: "1px solid rgba(255,255,255,0.06)",
          boxShadow: "inset 0 0 40px rgba(255,255,255,0.02)",
        }}
      />

      {/* Flowing data points */}
      {DATA_POINTS.map((dp) => (
        <DataPoint
          key={dp.id}
          angle={dp.angle}
          startRadius={dp.startRadius}
          delay={dp.delay}
          duration={dp.duration}
        />
      ))}

      {/* Central model blob */}
      <TheModel
        cycleFrame={cycleFrame}
        isHuman={isHuman}
        fps={fps}
        cycleIndex={cycleIndex}
      />

      {/* Status + pips */}
      <div
        className="absolute bottom-24 flex flex-col items-center gap-4"
        style={{ opacity: labelFade }}
      >
        <div
          className="px-7 py-2 rounded-full text-sm font-bold tracking-widest uppercase"
          style={{
            color: statusColor,
            border: `1px solid ${statusBorder}`,
            backgroundColor: statusBg,
            letterSpacing: "0.18em",
          }}
        >
          {statusText}
        </div>

        <GenerationPips cycleIndex={cycleIndex} />

        <p className="text-gray-700 text-xs tracking-[0.25em] uppercase">
          Generation {cycleIndex + 1} of {TOTAL_CYCLES}
        </p>
      </div>

    </AbsoluteFill>
  );
};
