import React from "react";

const DASH = 300;

type Props = { progress: number; color?: string };

export const CheckDoodle: React.FC<Props> = ({ progress, color = "#27ae60" }) => {
  const offset = DASH * (1 - progress);

  return (
    <svg width="80" height="70" viewBox="0 0 80 70" fill="none">
      <path
        d="M10 38 L30 58 L70 12"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={DASH}
        strokeDashoffset={offset}
      />
    </svg>
  );
};
