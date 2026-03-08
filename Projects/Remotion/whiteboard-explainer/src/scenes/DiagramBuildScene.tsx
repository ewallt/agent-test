import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { DiagramBuildScene as DiagramBuildSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { useTheme } from "../ThemeContext";

export const DiagramBuildScene: React.FC<DiagramBuildSceneProps> = ({
  title,
  doodles,
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: THEME.bg,
        position: "relative",
        fontFamily: THEME.fontFamily,
        overflow: "hidden",
      }}
    >
      {title && (
        <h2
          style={{
            fontFamily: THEME.headingFamily,
            fontSize: 56,
            fontWeight: 700,
            color: THEME.ink,
            opacity: titleOpacity,
            margin: 0,
            padding: "48px 160px 0",
          }}
        >
          {title}
        </h2>
      )}

      {/* Doodles are placed absolutely using their x/y coordinates */}
      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
