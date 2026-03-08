import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { StepRevealScene as StepRevealSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { CalloutText } from "../components/CalloutText";
import { useTheme } from "../ThemeContext";

// Each bullet appears BULLET_STAGGER frames after the previous
const BULLET_STAGGER = 18;
const TITLE_APPEAR = 15;

export const StepRevealScene: React.FC<StepRevealSceneProps> = ({
  title,
  body,
  doodles = [],
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, TITLE_APPEAR], [0, 1], {
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
        justifyContent: "center",
        padding: "80px 160px",
        fontFamily: THEME.fontFamily,
        position: "relative",
        boxSizing: "border-box",
      }}
    >
      {title && (
        <h2
          style={{
            fontFamily: THEME.headingFamily,
            fontSize: 64,
            fontWeight: 700,
            color: THEME.ink,
            opacity: titleOpacity,
            margin: "0 0 48px 0",
          }}
        >
          {title}
        </h2>
      )}

      <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
        {body.map((line, i) => {
          const bulletStart = TITLE_APPEAR + i * BULLET_STAGGER;
          return (
            <li
              key={i}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: 36,
                fontSize: 48,
                color: THEME.ink,
                lineHeight: THEME.lineHeight,
              }}
            >
              {/* Bullet marker */}
              <span
                style={{
                  color: THEME.accent,
                  fontWeight: 700,
                  marginRight: 24,
                  fontSize: 56,
                  lineHeight: 1,
                  flexShrink: 0,
                  opacity: interpolate(frame, [bulletStart, bulletStart + 8], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                }}
              >
                ●
              </span>
              <CalloutText text={line} startFrame={bulletStart} />
            </li>
          );
        })}
      </ul>

      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
