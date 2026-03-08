import React from "react";

const DASH = 400;

type Props = { progress: number; color?: string };

export const BracketDoodle: React.FC<Props> = ({ progress, color = "#2980b9" }) => {
  const offset = DASH * (1 - progress);

  return (
    <svg width="60" height="120" viewBox="0 0 60 120" fill="none">
      {/* Opening bracket shape */}
      <path
        d="M40 10 L20 10 L20 110 L40 110"
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
