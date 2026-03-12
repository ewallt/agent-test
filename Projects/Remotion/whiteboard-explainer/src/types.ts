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

export type FlowNode = {
  id: string;
  label: string;
  x?: number;         // explicit position (overrides auto-layout)
  y?: number;
  height?: number;    // custom box height (default NODE_H = 72)
  startFrame?: number; // overrides auto-computed animation start frame
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
  fromSide?: "top" | "center" | "bottom"; // where on the from-node the edge starts (default center)
  toSide?: "top" | "center" | "bottom";   // where on the to-node the edge ends (default center)
  vertical?: boolean;  // draw a vertical connector (bottom of from-node to top of to-node, same x)
  color?: string;      // override stroke/arrowhead color (default THEME.accent)
  startFrame?: number; // overrides auto-computed animation start frame
};

export type FlowLabel = {
  x?: number;
  y: number;
  text: string;
  startFrame?: number;
  color?: string;
  fontSize?: number;  // overrides default 42
};

export type SceneType =
  | "title"
  | "stepReveal"
  | "diagramBuild"
  | "compare"
  | "outro"
  | "quote"
  | "stat"
  | "flowChart";

export type Scene =
  | TitleScene
  | StepRevealScene
  | DiagramBuildScene
  | CompareScene
  | OutroScene
  | QuoteScene
  | StatScene
  | FlowChartScene;

export type SceneTransition = {
  type: "fade" | "slide" | "wipe" | "flip" | "clockWipe";
  durationInFrames: number;
  direction?: "from-left" | "from-right" | "from-top" | "from-bottom";
};

export type BaseScene = {
  id: string;
  durationInFrames: number;
  transition?: SceneTransition; // transition INTO this scene from the previous
  narration?: string;           // narration text; audio file lives at public/audio/braess/{id}.mp3
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

export type QuoteScene = BaseScene & {
  type: "quote";
  quote: string;
  attribution?: string;
  doodles?: DoodleSpec[];
};

export type StatScene = BaseScene & {
  type: "stat";
  value: string;
  label: string;
  context?: string;
  doodles?: DoodleSpec[];
};

export type FlowChartScene = BaseScene & {
  type: "flowChart";
  title?: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  layout?: "linear-horizontal" | "linear-vertical" | "branching";
  labels?: FlowLabel[];
  doodles?: DoodleSpec[];
};

export type ScenesProps = {
  scenes: Scene[];
  theme?: string;  // key into THEMES registry; defaults to "warmPaper"
};
