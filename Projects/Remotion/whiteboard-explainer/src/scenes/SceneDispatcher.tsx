import React from "react";
import { Scene } from "../types";
import { useTheme } from "../ThemeContext";
import { TitleScene } from "./TitleScene";
import { StepRevealScene } from "./StepRevealScene";
import { DiagramBuildScene } from "./DiagramBuildScene";
import { CompareScene } from "./CompareScene";
import { OutroScene } from "./OutroScene";

const TYPE_LABELS: Record<Scene["type"], string> = {
  title: "Title",
  stepReveal: "Step Reveal",
  diagramBuild: "Diagram Build",
  compare: "Compare",
  outro: "Outro",
};

function transitionLabel(scene: Scene): string {
  if (!scene.transition) return "None";
  const { type, direction } = scene.transition;
  const typeLabel: Record<string, string> = {
    fade: "Fade",
    slide: "Slide",
    wipe: "Wipe",
    flip: "Flip",
    clockWipe: "Clock Wipe",
  };
  const dirLabel: Record<string, string> = {
    "from-left": "from Left",
    "from-right": "from Right",
    "from-top": "from Top",
    "from-bottom": "from Bottom",
  };
  const base = typeLabel[type] ?? type;
  return direction ? `${base} ${dirLabel[direction] ?? direction}` : base;
}

function renderScene(scene: Scene): React.ReactNode {
  switch (scene.type) {
    case "title":
      return <TitleScene {...scene} />;
    case "stepReveal":
      return <StepRevealScene {...scene} />;
    case "diagramBuild":
      return <DiagramBuildScene {...scene} />;
    case "compare":
      return <CompareScene {...scene} />;
    case "outro":
      return <OutroScene {...scene} />;
    default: {
      const _exhaustive: never = scene;
      return null;
    }
  }
}

export const SceneDispatcher: React.FC<{ scene: Scene }> = ({ scene }) => {
  const { theme } = useTheme();
  return (
    <div style={{ position: "relative", width: 1920, height: 1080 }}>
      {renderScene(scene)}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 36,
          fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
          textAlign: "right",
          pointerEvents: "none",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 600, color: theme.accent, opacity: 0.7, letterSpacing: 1.5, textTransform: "uppercase" }}>
          {TYPE_LABELS[scene.type]}
        </div>
        <div style={{ fontSize: 18, fontWeight: 400, color: theme.ink, opacity: 0.5, letterSpacing: 0.5 }}>
          {theme.name}
        </div>
        <div style={{ fontSize: 18, fontWeight: 400, color: theme.ink, opacity: 0.5, letterSpacing: 0.5 }}>
          {transitionLabel(scene)}
        </div>
      </div>
    </div>
  );
};
