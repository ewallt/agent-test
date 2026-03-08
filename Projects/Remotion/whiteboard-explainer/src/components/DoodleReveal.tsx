import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

// SVG doodle registry — add new doodle components here
import { ArrowDoodle } from "../assets/doodles/ArrowDoodle";
import { CircleDoodle } from "../assets/doodles/CircleDoodle";
import { StarDoodle } from "../assets/doodles/StarDoodle";
import { CheckDoodle } from "../assets/doodles/CheckDoodle";
import { BracketDoodle } from "../assets/doodles/BracketDoodle";

const DOODLE_REGISTRY: Record<string, React.FC<{ progress: number; color?: string }>> = {
  arrow: ArrowDoodle,
  circle: CircleDoodle,
  star: StarDoodle,
  check: CheckDoodle,
  bracket: BracketDoodle,
};

type Props = {
  asset: string;
  x: number;
  y: number;
  scale?: number;
  revealStart: number;
  revealEnd: number;
  color?: string;
};

export const DoodleReveal: React.FC<Props> = ({
  asset,
  x,
  y,
  scale = 1,
  revealStart,
  revealEnd,
  color = "#2c2c2c",
}) => {
  const frame = useCurrentFrame();
  const progress = interpolate(frame, [revealStart, revealEnd], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const DoodleComponent = DOODLE_REGISTRY[asset];
  if (!DoodleComponent) {
    // Unknown asset — render nothing rather than crash
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        pointerEvents: "none",
      }}
    >
      <DoodleComponent progress={progress} color={color} />
    </div>
  );
};
