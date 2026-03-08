import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { OutroScene as OutroSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { useTheme } from "../ThemeContext";

export const OutroScene: React.FC<OutroSceneProps> = ({
  title,
  body = [],
  doodles = [],
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 140, mass: 1 },
    from: 0.8,
    to: 1,
  });

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: THEME.outroBg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        fontFamily: THEME.fontFamily,
      }}
    >
      {/* Glow ring */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${THEME.accent}33 0%, transparent 70%)`,
          opacity: interpolate(frame, [0, 30], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />

      <h1
        style={{
          fontFamily: THEME.headingFamily,
          fontSize: 100,
          fontWeight: 700,
          color: "#ffffff",
          margin: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          maxWidth: 1400,
          lineHeight: 1.15,
          position: "relative",
        }}
      >
        {title}
      </h1>

      {body.map((line, i) => (
        <p
          key={i}
          style={{
            fontFamily: THEME.fontFamily,
            fontSize: 42,
            color: "#ffffff",
            opacity: interpolate(frame, [25 + i * 12, 40 + i * 12], [0, 0.8], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            margin: "16px 0 0 0",
            textAlign: "center",
            maxWidth: 1100,
            position: "relative",
          }}
        >
          {line}
        </p>
      ))}

      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
