import React from "react";
import { Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";
import { ScenesProps, SceneTransition } from "./types";
import { SceneDispatcher } from "./scenes/SceneDispatcher";
import { ThemeProvider } from "./ThemeContext";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPresentation(t: SceneTransition): any {
  switch (t.type) {
    case "fade":      return fade();
    case "slide":     return slide({ direction: t.direction ?? "from-right" });
    case "wipe":      return wipe({ direction: t.direction ?? "from-right" });
    case "flip":      return flip({ direction: t.direction ?? "from-right" });
    case "clockWipe": return clockWipe({ width: 1920, height: 1080 });
  }
}

export const WhiteboardVideo: React.FC<ScenesProps> = ({ scenes, theme = "warmPaper" }) => {
  // Build a flat list of Sequence and Transition elements — no Fragments,
  // no conditional nulls. TransitionSeries requires direct Sequence/Transition children.
  const children: React.ReactNode[] = [];

  scenes.forEach((scene, i) => {
    if (i > 0 && scene.transition) {
      children.push(
        <TransitionSeries.Transition
          key={`transition-${scene.id}`}
          presentation={getPresentation(scene.transition)}
          timing={linearTiming({ durationInFrames: scene.transition.durationInFrames })}
        />
      );
    }
    children.push(
      <TransitionSeries.Sequence key={scene.id} durationInFrames={scene.durationInFrames}>
        {scene.narration ? <Audio src={staticFile(`audio/braess/${scene.id}.mp3`)} /> : null}
        <SceneDispatcher scene={scene} />
      </TransitionSeries.Sequence>
    );
  });

  // Spread children as individual args — TransitionSeries inspects direct children
  // and rejects arrays or Fragment wrappers.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (
    <ThemeProvider themeName={theme}>
      {(React.createElement as any)(TransitionSeries, {}, ...children)}
    </ThemeProvider>
  );
};
