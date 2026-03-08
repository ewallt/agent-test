import React from "react";

const DASH = 600;

type Props = { progress: number; color?: string };

export const StarDoodle: React.FC<Props> = ({ progress, color = "#e6a817" }) => {
  const offset = DASH * (1 - progress);

  return (
    <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
      <path
        d="M45 10 L52 34 L78 34 L57 50 L64 74 L45 59 L26 74 L33 50 L12 34 L38 34 Z"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={DASH}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
