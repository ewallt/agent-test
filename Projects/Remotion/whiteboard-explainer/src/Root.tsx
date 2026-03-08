import React from "react";
import { Composition } from "remotion";
import { WhiteboardVideo } from "./WhiteboardVideo";
import { ScenesProps } from "./types";
import exampleScenes from "../scenes.example_1.json";
import exampleScenes2 from "../scenes.example_2.json";

// Calculate total duration accounting for transition overlaps
function totalFrames(scenes: ScenesProps["scenes"]): number {
  return scenes.reduce((sum, s, i) => {
    const transitionOverlap = i > 0 && s.transition ? s.transition.durationInFrames : 0;
    return sum + s.durationInFrames - transitionOverlap;
  }, 0);
}

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="WhiteboardExplainer-1"
        component={WhiteboardVideo as React.ComponentType<ScenesProps>}
        durationInFrames={totalFrames(exampleScenes.scenes as ScenesProps["scenes"])}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={exampleScenes as ScenesProps}
        calculateMetadata={({ props }) => ({
          durationInFrames: totalFrames((props as ScenesProps).scenes),
        })}
      />
      <Composition
        id="WhiteboardExplainer-2"
        component={WhiteboardVideo as React.ComponentType<ScenesProps>}
        durationInFrames={totalFrames(exampleScenes2.scenes as ScenesProps["scenes"])}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={exampleScenes2 as ScenesProps}
        calculateMetadata={({ props }) => ({
          durationInFrames: totalFrames((props as ScenesProps).scenes),
        })}
      />
    </>
  );
};
