import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { TitleScene as TitleSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { useTheme } from "../ThemeContext";

export const TitleScene: React.FC<TitleSceneProps> = ({
  title,
  subtitle,
  doodles = [],
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0, 20], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, stiffness: 160, mass: 0.9 },
    from: 0.9,
    to: 1,
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
        position: "relative",
        fontFamily: THEME.fontFamily,
      }}
    >
      {/* Decorative horizontal rule */}
      <div
        style={{
          width: interpolate(frame, [5, 30], [0, 700], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 3,
          background: THEME.accent,
          marginBottom: 40,
          borderRadius: 2,
        }}
      />

      <h1
        style={{
          fontFamily: THEME.headingFamily,
          fontSize: 96,
          fontWeight: 700,
          color: THEME.ink,
          margin: 0,
          textAlign: "center",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          maxWidth: 1400,
          lineHeight: 1.15,
        }}
      >
        {title}
      </h1>

      {subtitle && (
        <p
          style={{
            fontFamily: THEME.fontFamily,
            fontSize: 44,
            color: THEME.ink,
            opacity: subtitleOpacity * 0.75,
            marginTop: 32,
            transform: `scale(${subtitleScale})`,
            textAlign: "center",
            maxWidth: 1100,
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          width: interpolate(frame, [5, 30], [0, 700], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          height: 3,
          background: THEME.accent,
          marginTop: 40,
          borderRadius: 2,
        }}
      />

      {/* Doodle layer */}
      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
