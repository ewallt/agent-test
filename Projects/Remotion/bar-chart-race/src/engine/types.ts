export interface ModelEntry {
  model: string;
  lab: string;
  date: string; // YYYY-MM-DD
  mmlu: number;
  estimated?: boolean;
}

export interface StoryCard {
  /** Model name whose keyframe triggers this card */
  trigger: string;
  title: string;
  body: string;
}

export interface BarChartConfig {
  /** Remotion composition ID */
  id: string;
  title: string;
  entries: ModelEntry[];
  labColors: Record<string, string>;
  storyCards: StoryCard[];
  /** How many bars to show at once. Default: 10 */
  topN?: number;
  /** Frames per second. Default: 30 */
  fps?: number;
  /** Frames spent animating a new entry. Default: 25 */
  transitionFrames?: number;
  /** Frames to hold after transition. Default: 20 */
  holdFrames?: number;
  /** Path to audio file (resolved via staticFile) */
  musicSrc?: string;
  /** Audio volume 0–1. Default: 0.7 */
  musicVolume?: number;
  /** Extra frames appended after the last keyframe (e.g. a hold at the end). Default: 0 */
  trailingFrames?: number;
  /** Suffix shown after each score value. Default: '%' */
  valueSuffix?: string;
  /** Decimal places shown on bar values. Default: 1 */
  valueDecimals?: number;
  /** Animation mode. 'sequential' = one entry at a time. 'simultaneous' = all bars update together. Default: 'sequential' */
  mode?: 'sequential' | 'simultaneous';
}
