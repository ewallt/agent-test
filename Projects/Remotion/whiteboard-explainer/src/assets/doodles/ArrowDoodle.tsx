import React from "react";

// Large constant — acceptable V1 imprecision; V2 will use getTotalLength()
const DASH = 500;

type Props = { progress: number; color?: string };

export const ArrowDoodle: React.FC<Props> = ({ progress, color = "#2c2c2c" }) => {
  const offset = DASH * (1 - progress);

  return (
    <svg width="120" height="80" viewBox="0 0 120 80" fill="none">
      {/* Shaft */}
      <path
        d="M10 40 L90 40"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={DASH}
        strokeDashoffset={offset}
      />
      {/* Arrowhead */}
      <path
        d="M75 25 L100 40 L75 55"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={DASH}
        strokeDashoffset={offset}
        fill="none"
      />
    </svg>
  );
};
