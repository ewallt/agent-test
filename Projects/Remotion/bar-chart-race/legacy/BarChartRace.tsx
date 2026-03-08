import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, Easing, Audio } from 'remotion';
import { DATA, LAB_COLORS, STORY_CARDS, ModelEntry } from './data';
import music from './Signal Through the Dark.mp3';

const FPS = 30;
const HOLD_FRAMES = 20; // frames to pause on each new model entry
const TRANSITION_FRAMES = 25; // frames to animate bar growth

const WIDTH = 1280;
const HEIGHT = 720;
const BAR_AREA_LEFT = 300;
const BAR_AREA_RIGHT = 60;
const BAR_HEIGHT = 32;
const BAR_GAP = 10;
const TOP_N = 10;
const CHART_TOP = 100;

// Sort data by date
const sortedData = [...DATA].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
);

// Build keyframes: one per model entry
type KeyFrame = {
  startFrame: number;
  endFrame: number;
  newEntry: ModelEntry;
  allVisible: ModelEntry[]; // all entries released so far
};

function buildKeyframes(): KeyFrame[] {
  const frames: KeyFrame[] = [];
  let cursor = 0;
  for (let i = 0; i < sortedData.length; i++) {
    const allVisible = sortedData.slice(0, i + 1);
    frames.push({
      startFrame: cursor,
      endFrame: cursor + TRANSITION_FRAMES + HOLD_FRAMES,
      newEntry: sortedData[i],
      allVisible,
    });
    cursor += TRANSITION_FRAMES + HOLD_FRAMES;
  }
  return frames;
}

const KEYFRAMES = buildKeyframes();
export const TOTAL_FRAMES = KEYFRAMES[KEYFRAMES.length - 1].endFrame + FPS * 2;

// Precompute story card schedule: each card runs from its trigger to the next card's trigger
const CARD_SCHEDULE = STORY_CARDS.map((card) => {
  const kf = KEYFRAMES.find((k) => k.newEntry.model === card.triggerModel);
  return kf ? { startFrame: kf.startFrame, card } : null;
}).filter(Boolean)
  .sort((a, b) => a!.startFrame - b!.startFrame) as { startFrame: number; card: typeof STORY_CARDS[0] }[];

function getTopN(entries: ModelEntry[]): ModelEntry[] {
  return [...entries].sort((a, b) => b.mmlu - a.mmlu).slice(0, TOP_N);
}

function getMaxScore(entries: ModelEntry[]): number {
  return Math.max(...entries.map((e) => e.mmlu), 100);
}

export const BarChartRace: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Find current keyframe
  let kfIndex = KEYFRAMES.length - 1;
  for (let i = 0; i < KEYFRAMES.length; i++) {
    if (frame <= KEYFRAMES[i].endFrame) {
      kfIndex = i;
      break;
    }
  }
  const kf = KEYFRAMES[kfIndex];
  const prevKf = kfIndex > 0 ? KEYFRAMES[kfIndex - 1] : null;

  const progress = interpolate(
    frame,
    [kf.startFrame, kf.startFrame + TRANSITION_FRAMES],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }
  );

  const currentTop = getTopN(kf.allVisible);
  const prevTop = prevKf ? getTopN(prevKf.allVisible) : [];
  const maxScore = getMaxScore(kf.allVisible);
  const prevMaxScore = prevKf ? getMaxScore(prevKf.allVisible) : maxScore;
  const animatedMaxScore = interpolate(progress, [0, 1], [prevMaxScore, maxScore]);
  const barMaxWidth = width - BAR_AREA_LEFT - BAR_AREA_RIGHT;

  // Build union of current and previous top for rendering (handles entering + exiting bars)
  const allModels = [...currentTop];
  for (const p of prevTop) {
    if (!allModels.find((m) => m.model === p.model)) {
      allModels.push(p);
    }
  }

  // Get current date label
  const currentDate = new Date(kf.newEntry.date);
  const dateLabel = currentDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  // Find active story card — each card runs until the next card's trigger, no gaps
  let activeCard: typeof STORY_CARDS[0] | null = null;
  let cardOpacity = 0;
  const currentEntry = [...CARD_SCHEDULE].reverse().find((c) => frame >= c.startFrame);
  if (currentEntry) {
    const nextEntry = CARD_SCHEDULE.find((c) => c.startFrame > currentEntry.startFrame);
    const cardStart = currentEntry.startFrame;
    const cardEnd = nextEntry ? nextEntry.startFrame : TOTAL_FRAMES;
    activeCard = currentEntry.card;
    const fadeOutStart = Math.max(cardStart + 70, cardEnd - 20);
    cardOpacity = interpolate(
      frame,
      [cardStart, cardStart + 15, fadeOutStart, cardEnd],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
  }

  return (
    <div
      style={{
        width,
        height,
        background: '#0f0f13',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Title */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          left: BAR_AREA_LEFT,
          color: '#ffffff',
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '-0.5px',
        }}
      >
        AI Model Performance Race — MMLU Benchmark
      </div>

      {/* Date label — upper right */}
      <div
        style={{
          position: 'absolute',
          top: 24,
          right: 24,
          color: '#ffffff',
          fontSize: 28,
          fontWeight: 700,
          textAlign: 'right',
          opacity: 0.9,
        }}
      >
        {dateLabel}
      </div>

      {/* Story card — lower right */}
      {activeCard && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 24,
            width: 300,
            opacity: cardOpacity,
            background: 'rgba(255,255,255,0.05)',
            border: `2px solid ${LAB_COLORS[kf.newEntry.lab] ?? '#888'}`,
            borderRadius: 10,
            padding: '12px 16px',
          }}
        >
          <div
            style={{
              color: LAB_COLORS[kf.newEntry.lab] ?? '#888',
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {activeCard.headline}
          </div>
          <div style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6 }}>
            {activeCard.body}
          </div>
        </div>
      )}

      {/* Bars */}
      {allModels.map((entry) => {
        const currentRank = currentTop.findIndex((m) => m.model === entry.model);
        const prevRank = prevTop.findIndex((m) => m.model === entry.model);

        const isEntering = prevRank === -1 && currentRank !== -1;
        const isExiting = currentRank === -1 && prevRank !== -1;

        const fromRank = prevRank === -1 ? TOP_N : prevRank;
        const toRank = currentRank === -1 ? TOP_N : currentRank;
        const animatedRank = interpolate(progress, [0, 1], [fromRank, toRank]);

        const fromScore = prevRank !== -1 ? prevTop[prevRank].mmlu : 0;
        const toScore = currentRank !== -1 ? currentTop[currentRank].mmlu : (prevRank !== -1 ? prevTop[prevRank].mmlu : 0);
        const animatedScore = interpolate(progress, [0, 1], [fromScore, toScore]);

        const opacity = isEntering
          ? interpolate(progress, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' })
          : isExiting
          ? interpolate(progress, [0.6, 1], [1, 0], { extrapolateLeft: 'clamp' })
          : 1;

        const barWidth = (animatedScore / animatedMaxScore) * barMaxWidth;
        const color = LAB_COLORS[entry.lab] ?? '#888';
        const y = CHART_TOP + animatedRank * (BAR_HEIGHT + BAR_GAP);
        const isNew = kf.newEntry.model === entry.model;

        return (
          <div key={entry.model} style={{ opacity }}>
            {/* Rank number */}
            <div
              style={{
                position: 'absolute',
                top: y + BAR_HEIGHT / 2,
                left: 8,
                transform: 'translateY(-50%)',
                color: '#555',
                fontSize: 12,
                fontWeight: 700,
                width: 20,
                textAlign: 'right',
              }}
            >
              {currentRank !== -1 ? currentRank + 1 : ''}
            </div>

            {/* Model label */}
            <div
              style={{
                position: 'absolute',
                top: y + BAR_HEIGHT / 2,
                left: 32,
                width: BAR_AREA_LEFT - 44,
                textAlign: 'right',
                transform: 'translateY(-50%)',
                color: isNew ? '#fff' : '#ccc',
                fontSize: 13,
                fontWeight: isNew ? 700 : 400,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {entry.model}
            </div>

            {/* Bar */}
            <div
              style={{
                position: 'absolute',
                top: y,
                left: BAR_AREA_LEFT,
                width: barWidth,
                height: BAR_HEIGHT,
                background: color,
                borderRadius: '0 4px 4px 0',
              }}
            />

            {/* Score label */}
            <div
              style={{
                position: 'absolute',
                top: y + BAR_HEIGHT / 2,
                left: BAR_AREA_LEFT + barWidth + 8,
                transform: 'translateY(-50%)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {animatedScore.toFixed(1)}%
            </div>
          </div>
        );
      })}

      {/* Music */}
      <Audio src={music} volume={0.7} />

      {/* Lab legend */}
      <div
        style={{
          position: 'absolute',
          bottom: 24,
          left: BAR_AREA_LEFT,
          display: 'flex',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        {Object.entries(LAB_COLORS).map(([lab, color]) => (
          <div key={lab} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: color }} />
            <span style={{ color: '#aaa', fontSize: 12 }}>{lab}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
