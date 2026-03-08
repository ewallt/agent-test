import React from "react";

const DASH = 500;

type Props = { progress: number; color?: string };

export const CircleDoodle: React.FC<Props> = ({ progress, color = "#2c2c2c" }) => {
  const offset = DASH * (1 - progress);

  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
      <ellipse
        cx="50"
        cy="50"
        rx="40"
        ry="35"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={DASH}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
