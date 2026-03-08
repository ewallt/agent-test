import { describe, it, expect } from 'vitest';
import {
  buildKeyframes,
  buildCardSchedule,
  computeTotalFrames,
  getConstants,
} from '../src/engine/compute';
import { data as aiMmluConfig } from '../data/ai-mmlu/barchart';

// ─── Constants ────────────────────────────────────────────────────────────────

describe('getConstants', () => {
  it('uses defaults when optional fields are omitted', () => {
    const c = getConstants({ ...aiMmluConfig, topN: undefined, fps: undefined });
    expect(c.topN).toBe(10);
    expect(c.fps).toBe(30);
    expect(c.transitionFrames).toBe(25);
    expect(c.holdFrames).toBe(20);
    expect(c.framesPerEntry).toBe(45);
  });

  it('respects overrides', () => {
    const c = getConstants({ ...aiMmluConfig, transitionFrames: 10, holdFrames: 5 });
    expect(c.framesPerEntry).toBe(15);
  });
});

// ─── Keyframes ────────────────────────────────────────────────────────────────

describe('buildKeyframes', () => {
  const kfs = buildKeyframes(aiMmluConfig);

  it('produces one keyframe per entry', () => {
    expect(kfs).toHaveLength(aiMmluConfig.entries.length);
  });

  it('keyframes are sorted by date (startFrame increases monotonically)', () => {
    for (let i = 1; i < kfs.length; i++) {
      expect(kfs[i].startFrame).toBeGreaterThan(kfs[i - 1].startFrame);
    }
  });

  it('startFrame = index * framesPerEntry', () => {
    const { framesPerEntry } = getConstants(aiMmluConfig);
    kfs.forEach((kf, i) => {
      expect(kf.startFrame).toBe(i * framesPerEntry);
    });
  });

  it('topModels never exceeds topN', () => {
    const { topN } = getConstants(aiMmluConfig);
    kfs.forEach((kf) => {
      expect(kf.topModels.length).toBeLessThanOrEqual(topN);
    });
  });

  it('topModels are sorted highest score first', () => {
    kfs.forEach((kf) => {
      for (let i = 1; i < kf.topModels.length; i++) {
        expect(kf.topModels[i].mmlu).toBeLessThanOrEqual(kf.topModels[i - 1].mmlu);
      }
    });
  });

  it('ranks are 0-indexed and contiguous', () => {
    kfs.forEach((kf) => {
      kf.topModels.forEach((m, i) => {
        expect(m.rank).toBe(i);
      });
    });
  });

  it('first keyframe is GPT-3 (earliest entry)', () => {
    expect(kfs[0].topModels[0].model).toBe('GPT-3');
  });
});

// ─── Total frames ─────────────────────────────────────────────────────────────

describe('computeTotalFrames', () => {
  it('equals entries.length * framesPerEntry + trailingFrames', () => {
    const { framesPerEntry } = getConstants(aiMmluConfig);
    const expected =
      aiMmluConfig.entries.length * framesPerEntry +
      (aiMmluConfig.trailingFrames ?? 0);
    expect(computeTotalFrames(aiMmluConfig)).toBe(expected);
  });

  it('matches legacy value: 35 entries * 45 + 60 trailing = 1635', () => {
    expect(computeTotalFrames(aiMmluConfig)).toBe(1635);
  });
});

// ─── Card schedule ────────────────────────────────────────────────────────────

describe('buildCardSchedule', () => {
  const kfs = buildKeyframes(aiMmluConfig);
  const schedule = buildCardSchedule(aiMmluConfig, kfs);

  it('produces one scheduled card per story card with a valid trigger', () => {
    expect(schedule).toHaveLength(aiMmluConfig.storyCards.length);
  });

  it('schedule is sorted by startFrame', () => {
    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].startFrame).toBeGreaterThanOrEqual(schedule[i - 1].startFrame);
    }
  });

  it('first card starts at frame 0 (GPT-3 trigger)', () => {
    expect(schedule[0].startFrame).toBe(0);
  });

  it('last card ends at TOTAL_FRAMES', () => {
    const totalFrames = computeTotalFrames(aiMmluConfig);
    expect(schedule[schedule.length - 1].endFrame).toBe(totalFrames);
  });

  it('cards are contiguous — no gaps', () => {
    for (let i = 1; i < schedule.length; i++) {
      expect(schedule[i].startFrame).toBe(schedule[i - 1].endFrame);
    }
  });

  it('matches legacy trigger frames for key cards', () => {
    // GPT-3 is index 0 → frame 0
    expect(schedule.find((c) => c.title === 'The race begins')?.startFrame).toBe(0);
    // Mistral 7B is index 6 → frame 270
    expect(schedule.find((c) => c.title === 'Open source joins the race')?.startFrame).toBe(270);
    // o1 is index 19 → frame 855
    expect(schedule.find((c) => c.title === 'The reasoning era begins')?.startFrame).toBe(855);
    // GPT-5 is index 29 → frame 1305
    expect(schedule.find((c) => c.title === 'GPT-5 arrives')?.startFrame).toBe(1305);
  });

  it('every card duration is at least 3 seconds (90 frames)', () => {
    schedule.forEach((card) => {
      const duration = card.endFrame - card.startFrame;
      expect(duration).toBeGreaterThanOrEqual(90);
    });
  });
});
