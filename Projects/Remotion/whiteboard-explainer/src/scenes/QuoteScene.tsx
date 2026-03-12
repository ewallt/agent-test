import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { QuoteScene as QuoteSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { useTheme } from "../ThemeContext";

export const QuoteScene: React.FC<QuoteSceneProps> = ({
  quote,
  attribution,
  doodles = [],
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const quoteMarkScale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140, mass: 1 },
    from: 0.5,
    to: 1,
  });

  const quoteMarkOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteOpacity = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const quoteY = interpolate(frame, [12, 30], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const attrOpacity = interpolate(frame, [38, 54], [0, 1], {
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
        padding: "80px 220px",
        boxSizing: "border-box",
        fontFamily: THEME.fontFamily,
        position: "relative",
      }}
    >
      {/* Opening quote mark */}
      <div
        style={{
          fontSize: 180,
          color: THEME.accent,
          lineHeight: 0.8,
          opacity: quoteMarkOpacity,
          transform: `scale(${quoteMarkScale})`,
          alignSelf: "flex-start",
          marginLeft: 40,
          marginBottom: 8,
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        "
      </div>

      {/* Quote text */}
      <p
        style={{
          fontFamily: THEME.headingFamily,
          fontSize: 68,
          color: THEME.ink,
          textAlign: "center",
          margin: "0 0 52px 0",
          lineHeight: 1.35,
          maxWidth: 1340,
          opacity: quoteOpacity,
          transform: `translateY(${quoteY}px)`,
        }}
      >
        {quote}
      </p>

      {/* Closing rule */}
      <div
        style={{
          width: interpolate(frame, [28, 50], [0, 400], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 2,
          background: THEME.accent,
          marginBottom: 28,
          borderRadius: 1,
          opacity: 0.6,
        }}
      />

      {/* Attribution */}
      {attribution && (
        <p
          style={{
            fontFamily: THEME.fontFamily,
            fontSize: 38,
            color: THEME.accent,
            opacity: attrOpacity,
            margin: 0,
            letterSpacing: 1,
            textAlign: "center",
          }}
        >
          — {attribution}
        </p>
      )}

      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
