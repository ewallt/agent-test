import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

type Props = {
  text: string;
  startFrame: number;
  style?: React.CSSProperties;
  mode?: "fadeSlide" | "fade";
};

export const CalloutText: React.FC<Props> = ({
  text,
  startFrame,
  style,
  mode = "fadeSlide",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY =
    mode === "fadeSlide"
      ? interpolate(frame, [startFrame, startFrame + 15], [20, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  const scale = spring({
    frame: frame - startFrame,
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.8 },
    from: 0.92,
    to: 1,
  });

  return (
    <span
      style={{
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        display: "inline-block",
        ...style,
      }}
    >
      {text}
    </span>
  );
};
