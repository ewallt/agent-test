import { BarChartConfig } from './types';

export interface RankedModel {
  model: string;
  lab: string;
  mmlu: number;
  /** 0-indexed rank (0 = highest score) */
  rank: number;
}

export interface Keyframe {
  index: number;
  /** Frame on which this keyframe's transition begins */
  startFrame: number;
  date: string;
  /** The model entry added at this keyframe */
  newModel: string;
  newLab: string;
  /** Top N models at this point in time, sorted by rank */
  topModels: RankedModel[];
  /** Scores for ALL known models at this point in time */
  allScores: Record<string, number>;
  /** Labs for all known models */
  allLabs: Record<string, string>;
}

export interface ScheduledCard {
  title: string;
  body: string;
  startFrame: number;
  endFrame: number;
}

export interface ComputedConstants {
  topN: number;
  fps: number;
  transitionFrames: number;
  holdFrames: number;
  framesPerEntry: number;
}

export function getConstants(config: BarChartConfig): ComputedConstants {
  const transitionFrames = config.transitionFrames ?? 25;
  const holdFrames = config.holdFrames ?? 20;
  return {
    topN: config.topN ?? 10,
    fps: config.fps ?? 30,
    transitionFrames,
    holdFrames,
    framesPerEntry: transitionFrames + holdFrames,
  };
}

export function buildKeyframes(config: BarChartConfig): Keyframe[] {
  const { topN, framesPerEntry } = getConstants(config);

  const sorted = [...config.entries].sort((a, b) => a.date.localeCompare(b.date));

  const currentScores: Record<string, number> = {};
  const currentLabs: Record<string, string> = {};
  const keyframes: Keyframe[] = [];

  for (let i = 0; i < sorted.length; i++) {
    const entry = sorted[i];
    currentScores[entry.model] = entry.mmlu;
    currentLabs[entry.model] = entry.lab;

    const ranked = Object.entries(currentScores)
      .map(([model, mmlu]) => ({ model, lab: currentLabs[model], mmlu }))
      .sort((a, b) => b.mmlu - a.mmlu);

    const topModels: RankedModel[] = ranked
      .slice(0, topN)
      .map((m, rank) => ({ ...m, rank }));

    keyframes.push({
      index: i,
      startFrame: i * framesPerEntry,
      date: entry.date,
      newModel: entry.model,
      newLab: entry.lab,
      topModels,
      allScores: { ...currentScores },
      allLabs: { ...currentLabs },
    });
  }

  return keyframes;
}

export function computeTotalFrames(config: BarChartConfig): number {
  const { framesPerEntry } = getConstants(config);
  return config.entries.length * framesPerEntry + (config.trailingFrames ?? 0);
}

// ── Simultaneous mode ────────────────────────────────────────────────────────
// One keyframe per unique date; all bars animate together each period.

export function buildSimKeyframes(config: BarChartConfig): Keyframe[] {
  const { topN, framesPerEntry } = getConstants(config);

  const byDate = new Map<string, typeof config.entries[number][]>();
  for (const entry of config.entries) {
    if (!byDate.has(entry.date)) byDate.set(entry.date, []);
    byDate.get(entry.date)!.push(entry);
  }

  const dates = [...byDate.keys()].sort();
  const currentScores: Record<string, number> = {};
  const currentLabs: Record<string, string> = {};
  const keyframes: Keyframe[] = [];

  for (let i = 0; i < dates.length; i++) {
    const date = dates[i];
    for (const entry of byDate.get(date)!) {
      currentScores[entry.model] = entry.mmlu;
      currentLabs[entry.model] = entry.lab;
    }

    const ranked = Object.entries(currentScores)
      .map(([model, mmlu]) => ({ model, lab: currentLabs[model], mmlu }))
      .sort((a, b) => b.mmlu - a.mmlu);

    const topModels: RankedModel[] = ranked
      .slice(0, topN)
      .map((m, rank) => ({ ...m, rank }));

    // newModel/newLab: first entry added this period (used for card border color)
    const first = byDate.get(date)![0];

    keyframes.push({
      index: i,
      startFrame: i * framesPerEntry,
      date,
      newModel: first.model,
      newLab: first.lab,
      topModels,
      allScores: { ...currentScores },
      allLabs: { ...currentLabs },
    });
  }

  return keyframes;
}

export function computeSimTotalFrames(config: BarChartConfig): number {
  const { framesPerEntry } = getConstants(config);
  const uniqueDates = new Set(config.entries.map((e) => e.date));
  return uniqueDates.size * framesPerEntry + (config.trailingFrames ?? 0);
}

export function buildSimCardSchedule(
  config: BarChartConfig,
  keyframes: Keyframe[],
): ScheduledCard[] {
  const totalFrames = computeSimTotalFrames(config);
  const { framesPerEntry } = getConstants(config);

  const dates = [...new Set(config.entries.map((e) => e.date))].sort();
  const dateToFrame: Record<string, number> = {};
  dates.forEach((date, i) => { dateToFrame[date] = i * framesPerEntry; });

  // Map each model to the frame of its first date in the dataset
  const modelToFrame: Record<string, number> = {};
  for (const entry of [...config.entries].sort((a, b) => a.date.localeCompare(b.date))) {
    if (!(entry.model in modelToFrame)) {
      modelToFrame[entry.model] = dateToFrame[entry.date];
    }
  }

  void keyframes;

  const scheduled = config.storyCards
    .filter((card) => card.trigger in modelToFrame)
    .map((card) => ({
      title: card.title,
      body: card.body,
      startFrame: modelToFrame[card.trigger],
      endFrame: 0,
    }))
    .sort((a, b) => a.startFrame - b.startFrame);

  for (let i = 0; i < scheduled.length; i++) {
    scheduled[i].endFrame =
      i + 1 < scheduled.length ? scheduled[i + 1].startFrame : totalFrames;
  }

  return scheduled;
}

// ── Sequential mode ───────────────────────────────────────────────────────────

export function buildCardSchedule(
  config: BarChartConfig,
  keyframes: Keyframe[],
): ScheduledCard[] {
  const totalFrames = computeTotalFrames(config);
  const { framesPerEntry } = getConstants(config);

  const sorted = [...config.entries].sort((a, b) => a.date.localeCompare(b.date));
  const modelToFrame: Record<string, number> = {};
  for (let i = 0; i < sorted.length; i++) {
    if (!(sorted[i].model in modelToFrame)) {
      modelToFrame[sorted[i].model] = i * framesPerEntry;
    }
  }

  // Suppress unused-var warning — keyframes param reserved for future use
  void keyframes;

  const scheduled = config.storyCards
    .filter((card) => card.trigger in modelToFrame)
    .map((card) => ({
      title: card.title,
      body: card.body,
      startFrame: modelToFrame[card.trigger],
      endFrame: 0,
    }))
    .sort((a, b) => a.startFrame - b.startFrame);

  for (let i = 0; i < scheduled.length; i++) {
    scheduled[i].endFrame =
      i + 1 < scheduled.length ? scheduled[i + 1].startFrame : totalFrames;
  }

  return scheduled;
}
