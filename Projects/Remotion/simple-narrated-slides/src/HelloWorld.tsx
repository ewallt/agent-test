import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const HelloWorld: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const cfg = { damping: 20, stiffness: 80 };

  const titleOpacity   = spring({ frame,                          fps, config: cfg });
  const subtitleOpacity = spring({ frame: Math.max(0, frame - 40), fps, config: cfg });
  const counterOpacity  = spring({ frame: Math.max(0, frame - 80), fps, config: cfg });
  const taglineOpacity  = spring({ frame: Math.max(0, frame - 120), fps, config: cfg });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Title */}
      <h1
        style={{
          color: "white",
          fontSize: 80,
          fontWeight: 900,
          letterSpacing: "0.05em",
          opacity: titleOpacity,
          margin: 0,
        }}
      >
        Hello, Remotion
      </h1>

      {/* Subtitle */}
      <p
        style={{
          color: "#64748b",
          fontSize: 26,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          opacity: subtitleOpacity,
          margin: 0,
        }}
      >
        React-powered video, frame by frame
      </p>

      {/* Live frame counter */}
      <div
        style={{
          opacity: counterOpacity,
          marginTop: 56,
          display: "flex",
          alignItems: "center",
          gap: 20,
        }}
      >
        <code style={{ color: "#94a3b8", fontSize: 20 }}>
          useCurrentFrame()
        </code>
        <span style={{ color: "#334155", fontSize: 24 }}>→</span>
        <code
          style={{
            color: "#38bdf8",
            fontSize: 40,
            fontWeight: 700,
            minWidth: 72,
            textAlign: "right",
          }}
        >
          {frame}
        </code>
      </div>

      {/* Tagline */}
      <p
        style={{
          color: "#334155",
          fontSize: 15,
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          opacity: taglineOpacity,
          marginTop: 16,
        }}
      >
        Every frame is a function call
      </p>
    </AbsoluteFill>
  );
};
