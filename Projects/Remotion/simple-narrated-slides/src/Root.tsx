import React from "react";
import { Composition } from "remotion";
import { ModelCollapse } from "./ModelCollapse";
import { HelloWorld } from "./HelloWorld";
import { Britain1940, type Britain1940Props } from "./Britain1940";
import { BattleOfAtlantic, type BattleOfAtlanticProps } from "./BattleOfAtlantic";
import { NuclearPlant, type NuclearPlantProps } from "./NuclearPlant";
import { GodNotCriminal, type GodNotCriminalProps } from "./GodNotCriminal";
import { WhiteHatBlackHat, type WhiteHatBlackHatProps } from "./WhiteHatBlackHat";
import { SLIDE_DURATIONS_S } from "./slide-durations";
import { ATLANTIC_BULLET_DURATIONS_S } from "./atlantic-durations";
import { NUCLEAR_SLIDE_DURATIONS_S } from "./nuclear-durations";
import { GOD_NOT_CRIMINAL_DURATIONS_S } from "./god-not-criminal-durations";
import { WHITE_HAT_BLACK_HAT_DURATIONS_S } from "./white-hat-black-hat-durations";
import {
  SLIDE_INTRO_FRAMES as ATL_INTRO_FRAMES,
  BULLET_GAP_FRAMES  as ATL_GAP_FRAMES,
  SLIDE_BUFFER_FRAMES as ATL_BUFFER_FRAMES,
} from "./BattleOfAtlantic";

const FPS = 30;
const TITLE_FRAMES = 120;       // 4s opening card — accommodates ~3.5s title audio
const SLIDE_BUFFER_FRAMES = 60; // 2s of silence after each slide's audio ends

// ── WhiteHatBlackHat ──────────────────────────────────────────────────────────
const WHB_BUFFER_FRAMES = 30; // 1s buffer after each slide's audio
const WHB_SLIDE_FRAMES = WHITE_HAT_BLACK_HAT_DURATIONS_S.map(
  (s) => Math.ceil(s * FPS) + WHB_BUFFER_FRAMES
);
const WHB_TOTAL = 207 + WHB_SLIDE_FRAMES.reduce((a, b) => a + b, 0); // 207 = WHB TITLE_FRAMES

// ── GodNotCriminal ────────────────────────────────────────────────────────────
const GNC_SLIDE_FRAMES = GOD_NOT_CRIMINAL_DURATIONS_S.map(
  (s) => Math.ceil(s * FPS) + SLIDE_BUFFER_FRAMES
);
const GNC_TOTAL = TITLE_FRAMES + GNC_SLIDE_FRAMES.reduce((a, b) => a + b, 0);

// ── NuclearPlant ──────────────────────────────────────────────────────────────
const NP_SLIDE_FRAMES = NUCLEAR_SLIDE_DURATIONS_S.map(
  (s) => Math.ceil(s * FPS) + SLIDE_BUFFER_FRAMES
);
const NP_TOTAL = TITLE_FRAMES + NP_SLIDE_FRAMES.reduce((a, b) => a + b, 0);

// ── Britain1940 ───────────────────────────────────────────────────────────────
const B40_SLIDE_FRAMES = SLIDE_DURATIONS_S.map(
  (s) => Math.ceil(s * FPS) + SLIDE_BUFFER_FRAMES
);
const B40_TOTAL = TITLE_FRAMES + B40_SLIDE_FRAMES.reduce((a, b) => a + b, 0);

// ── Battle of the Atlantic ────────────────────────────────────────────────────
// Convert seconds → frames for each bullet, then derive per-slide totals using
// the same formula as BattleOfAtlantic.tsx so Root and the composition agree.
const ATL_BULLET_FRAMES = ATLANTIC_BULLET_DURATIONS_S.map(
  (bullets) => bullets.map((s) => Math.ceil(s * FPS))
);
const ATL_SLIDE_FRAMES = ATL_BULLET_FRAMES.map(
  (bullets) =>
    ATL_INTRO_FRAMES +
    bullets.reduce((sum, dur) => sum + dur + ATL_GAP_FRAMES, 0) +
    ATL_BUFFER_FRAMES
);
const ATL_TOTAL = TITLE_FRAMES + ATL_SLIDE_FRAMES.reduce((a, b) => a + b, 0);

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="ModelCollapse"
        component={ModelCollapse}
        durationInFrames={300}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition
        id="HelloWorld"
        component={HelloWorld}
        durationInFrames={180}
        fps={FPS}
        width={1920}
        height={1080}
      />
      <Composition<Britain1940Props>
        id="Britain1940"
        component={Britain1940}
        durationInFrames={B40_TOTAL}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ slideDurations: B40_SLIDE_FRAMES }}
      />
      <Composition<BattleOfAtlanticProps>
        id="BattleOfAtlantic"
        component={BattleOfAtlantic}
        durationInFrames={ATL_TOTAL}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ bulletDurationsFrames: ATL_BULLET_FRAMES }}
      />
      <Composition<NuclearPlantProps>
        id="NuclearPlant"
        component={NuclearPlant}
        durationInFrames={NP_TOTAL}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ slideDurations: NP_SLIDE_FRAMES }}
      />
      <Composition<GodNotCriminalProps>
        id="GodNotCriminal"
        component={GodNotCriminal}
        durationInFrames={GNC_TOTAL}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ slideDurations: GNC_SLIDE_FRAMES }}
      />
      <Composition<WhiteHatBlackHatProps>
        id="WhiteHatBlackHat"
        component={WhiteHatBlackHat}
        durationInFrames={WHB_TOTAL}
        fps={FPS}
        width={1920}
        height={1080}
        defaultProps={{ slideDurations: WHB_SLIDE_FRAMES }}
      />
    </>
  );
};
