export type DoodleSpec = {
  asset: string;        // key into doodles registry
  x: number;
  y: number;
  scale?: number;
  color?: string;       // stroke color; defaults to theme ink
  revealStart: number;  // frame offset within scene
  revealEnd: number;
};

export type ColumnSpec = {
  heading: string;
  items: string[];
};

export type SceneType =
  | "title"
  | "stepReveal"
  | "diagramBuild"
  | "compare"
  | "outro";

export type Scene =
  | TitleScene
  | StepRevealScene
  | DiagramBuildScene
  | CompareScene
  | OutroScene;

export type SceneTransition = {
  type: "fade" | "slide" | "wipe" | "flip" | "clockWipe";
  durationInFrames: number;
  direction?: "from-left" | "from-right" | "from-top" | "from-bottom";
};

export type BaseScene = {
  id: string;
  durationInFrames: number;
  transition?: SceneTransition; // transition INTO this scene from the previous
};

export type TitleScene = BaseScene & {
  type: "title";
  title: string;
  subtitle?: string;
  doodles?: DoodleSpec[];
};

export type StepRevealScene = BaseScene & {
  type: "stepReveal";
  title?: string;
  body: string[];
  doodles?: DoodleSpec[];
};

export type DiagramBuildScene = BaseScene & {
  type: "diagramBuild";
  title?: string;
  doodles: DoodleSpec[];
};

export type CompareScene = BaseScene & {
  type: "compare";
  title?: string;
  left: ColumnSpec;
  right: ColumnSpec;
  doodles?: DoodleSpec[];
};

export type OutroScene = BaseScene & {
  type: "outro";
  title: string;
  body?: string[];
  doodles?: DoodleSpec[];
};

export type ScenesProps = {
  scenes: Scene[];
  theme?: string;  // key into THEMES registry; defaults to "warmPaper"
};
