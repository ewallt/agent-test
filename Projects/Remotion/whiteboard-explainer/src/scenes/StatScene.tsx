import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { StatScene as StatSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { useTheme } from "../ThemeContext";

export const StatScene: React.FC<StatSceneProps> = ({
  value,
  label,
  context,
  doodles = [],
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const valueScale = spring({
    frame,
    fps,
    config: { damping: 9, stiffness: 110, mass: 1.3 },
    from: 0.3,
    to: 1,
  });

  const valueOpacity = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(frame, [22, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelY = interpolate(frame, [22, 40], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contextOpacity = interpolate(frame, [42, 58], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Decorative rule under value
  const ruleWidth = interpolate(frame, [10, 35], [0, 500], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: THEME.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 200px",
        boxSizing: "border-box",
        fontFamily: THEME.fontFamily,
        position: "relative",
      }}
    >
      {/* Big value */}
      <div
        style={{
          fontFamily: THEME.headingFamily,
          fontSize: 220,
          fontWeight: 700,
          color: THEME.accent,
          lineHeight: 1,
          opacity: valueOpacity,
          transform: `scale(${valueScale})`,
          marginBottom: 16,
        }}
      >
        {value}
      </div>

      {/* Decorative rule */}
      <div
        style={{
          width: ruleWidth,
          height: 3,
          background: THEME.accent,
          marginBottom: 36,
          borderRadius: 2,
          opacity: 0.5,
        }}
      />

      {/* Label */}
      <p
        style={{
          fontFamily: THEME.fontFamily,
          fontSize: 50,
          color: THEME.ink,
          textAlign: "center",
          margin: "0 0 20px 0",
          maxWidth: 1100,
          opacity: labelOpacity,
          transform: `translateY(${labelY}px)`,
          lineHeight: 1.35,
        }}
      >
        {label}
      </p>

      {/* Context */}
      {context && (
        <p
          style={{
            fontFamily: THEME.fontFamily,
            fontSize: 34,
            color: THEME.ink,
            opacity: contextOpacity * 0.55,
            margin: 0,
            letterSpacing: 2,
            textAlign: "center",
          }}
        >
          {context}
        </p>
      )}

      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
