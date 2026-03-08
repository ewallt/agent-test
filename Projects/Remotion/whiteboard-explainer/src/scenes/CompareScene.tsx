import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { CompareScene as CompareSceneProps } from "../types";
import { DoodleReveal } from "../components/DoodleReveal";
import { CalloutText } from "../components/CalloutText";
import { useTheme } from "../ThemeContext";

const TITLE_FRAMES = 15;
const HEADING_FRAMES = 25;
const ITEM_STAGGER = 15;

export const CompareScene: React.FC<CompareSceneProps> = ({
  title,
  left,
  right,
  doodles = [],
}) => {
  const { theme: THEME } = useTheme();
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, TITLE_FRAMES], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const dividerScaleY = interpolate(frame, [HEADING_FRAMES, HEADING_FRAMES + 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const maxItems = Math.max(left.items.length, right.items.length);

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        background: THEME.bg,
        display: "flex",
        flexDirection: "column",
        fontFamily: THEME.fontFamily,
        position: "relative",
        boxSizing: "border-box",
        padding: "60px 80px",
      }}
    >
      {title && (
        <h2
          style={{
            fontFamily: THEME.headingFamily,
            fontSize: 56,
            fontWeight: 700,
            color: THEME.ink,
            textAlign: "center",
            opacity: titleOpacity,
            margin: "0 0 40px 0",
          }}
        >
          {title}
        </h2>
      )}

      <div style={{ display: "flex", flex: 1, gap: 0, alignItems: "stretch" }}>
        {/* Left column */}
        <div style={{ flex: 1, padding: "0 60px" }}>
          <h3
            style={{
              fontFamily: THEME.headingFamily,
              fontSize: 44,
              color: THEME.accent,
              opacity: interpolate(frame, [HEADING_FRAMES, HEADING_FRAMES + 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              margin: "0 0 28px 0",
            }}
          >
            {left.heading}
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {left.items.map((item, i) => (
              <li
                key={i}
                style={{
                  fontSize: 38,
                  color: THEME.ink,
                  marginBottom: 24,
                  lineHeight: THEME.lineHeight,
                }}
              >
                <CalloutText
                  text={`▸ ${item}`}
                  startFrame={HEADING_FRAMES + 15 + i * ITEM_STAGGER}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Centre divider */}
        <div
          style={{
            width: 3,
            background: THEME.ink,
            opacity: 0.2,
            transform: `scaleY(${dividerScaleY})`,
            transformOrigin: "top center",
            borderRadius: 2,
            alignSelf: "stretch",
          }}
        />

        {/* Right column */}
        <div style={{ flex: 1, padding: "0 60px" }}>
          <h3
            style={{
              fontFamily: THEME.headingFamily,
              fontSize: 44,
              color: THEME.highlight,
              opacity: interpolate(frame, [HEADING_FRAMES, HEADING_FRAMES + 12], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              margin: "0 0 28px 0",
            }}
          >
            {right.heading}
          </h3>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {right.items.map((item, i) => (
              <li
                key={i}
                style={{
                  fontSize: 38,
                  color: THEME.ink,
                  marginBottom: 24,
                  lineHeight: THEME.lineHeight,
                }}
              >
                <CalloutText
                  text={`▸ ${item}`}
                  startFrame={HEADING_FRAMES + 15 + i * ITEM_STAGGER}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {doodles.map((d) => (
        <DoodleReveal key={d.asset + d.x + d.y} {...d} color={d.color ?? THEME.ink} />
      ))}
    </div>
  );
};
