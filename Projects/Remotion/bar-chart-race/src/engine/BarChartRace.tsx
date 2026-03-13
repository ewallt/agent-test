import React, { useMemo } from 'react';
import { useCurrentFrame, interpolate, Easing, Audio, staticFile } from 'remotion';
import { BarChartConfig } from './types';
import { buildKeyframes, buildCardSchedule, getConstants, Keyframe } from './compute';

const WIDTH = 1280;
const HEIGHT = 720;
const BAR_AREA_LEFT = 300;
const BAR_AREA_RIGHT = 60;
const BAR_HEIGHT = 32;
const BAR_GAP = 10;
const CHART_TOP = 100;

interface Props {
  config: BarChartConfig;
}

export const BarChartRace: React.FC<Props> = ({ config }) => {
  const frame = useCurrentFrame();
  const { topN, transitionFrames, framesPerEntry } = useMemo(() => getConstants(config), [config]);
  const keyframes = useMemo(() => buildKeyframes(config), [config]);
  const cardSchedule = useMemo(() => buildCardSchedule(config, keyframes), [config, keyframes]);

  // Match legacy keyframe lookup: frame <= endFrame
  let kfIndex = keyframes.length - 1;
  for (let i = 0; i < keyframes.length; i++) {
    if (frame <= keyframes[i].startFrame + framesPerEntry) {
      kfIndex = i;
      break;
    }
  }
  const kf = keyframes[kfIndex];
  const prevKf: Keyframe | null = kfIndex > 0 ? keyframes[kfIndex - 1] : null;

  const progress = interpolate(
    frame,
    [kf.startFrame, kf.startFrame + transitionFrames],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) },
  );

  const currentTop = kf.topModels;
  const prevTop = prevKf?.topModels ?? [];

  const maxScore = Math.max(...Object.values(kf.allScores), 100);
  const prevMaxScore = prevKf ? Math.max(...Object.values(prevKf.allScores), 100) : maxScore;
  const animatedMaxScore = interpolate(progress, [0, 1], [prevMaxScore, maxScore]);
  const barMaxWidth = WIDTH - BAR_AREA_LEFT - BAR_AREA_RIGHT;

  // Union of current and previous top
  const allModels = [...currentTop];
  for (const p of prevTop) {
    if (!allModels.find((m) => m.model === p.model)) {
      allModels.push(p);
    }
  }

  // Date label
  const dateLabel = new Date(kf.date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  // Active story card — find the most recently started card
  const currentEntry = [...cardSchedule].reverse().find((c) => frame >= c.startFrame) ?? null;
  let cardOpacity = 0;
  if (currentEntry) {
    const fadeOutStart = Math.max(currentEntry.startFrame + 70, currentEntry.endFrame - 20);
    cardOpacity = interpolate(
      frame,
      [currentEntry.startFrame, currentEntry.startFrame + 15, fadeOutStart, currentEntry.endFrame],
      [0, 1, 1, 0],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
    );
  }

  const currentLabColor = config.labColors[kf.newLab] ?? '#888';

  return (
    <div
      style={{
        width: WIDTH,
        height: HEIGHT,
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
        {config.title}
      </div>

      {/* Date */}
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

      {/* Story card */}
      {currentEntry && (
        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 24,
            width: 300,
            opacity: cardOpacity,
            background: 'rgba(255,255,255,0.05)',
            border: `2px solid ${currentLabColor}`,
            borderRadius: 10,
            padding: '12px 16px',
          }}
        >
          <div
            style={{
              color: currentLabColor,
              fontSize: 15,
              fontWeight: 700,
              marginBottom: 6,
            }}
          >
            {currentEntry.title}
          </div>
          <div style={{ color: '#ccc', fontSize: 13, lineHeight: 1.6 }}>
            {currentEntry.body}
          </div>
        </div>
      )}

      {/* Bars */}
      {allModels.map((entry) => {
        const currentRankEntry = currentTop.find((m) => m.model === entry.model);
        const prevRankEntry = prevTop.find((m) => m.model === entry.model);
        const currentRank = currentRankEntry?.rank ?? -1;
        const prevRank = prevRankEntry?.rank ?? -1;

        const isEntering = prevRank === -1 && currentRank !== -1;
        const isExiting = currentRank === -1 && prevRank !== -1;

        const fromRank = prevRank === -1 ? topN : prevRank;
        const toRank = currentRank === -1 ? topN : currentRank;
        const animatedRank = interpolate(progress, [0, 1], [fromRank, toRank]);

        const fromScore = prevRank !== -1 ? (prevRankEntry?.mmlu ?? 0) : 0;
        const toScore =
          currentRank !== -1
            ? (currentRankEntry?.mmlu ?? 0)
            : prevRank !== -1
              ? (prevRankEntry?.mmlu ?? 0)
              : 0;
        const animatedScore = interpolate(progress, [0, 1], [fromScore, toScore]);

        const opacity = isEntering
          ? interpolate(progress, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' })
          : isExiting
            ? interpolate(progress, [0.6, 1], [1, 0], { extrapolateLeft: 'clamp' })
            : 1;

        const barWidth = (animatedScore / animatedMaxScore) * barMaxWidth;
        const color = config.labColors[entry.lab] ?? '#888';
        const y = CHART_TOP + animatedRank * (BAR_HEIGHT + BAR_GAP);
        const isNew = kf.newModel === entry.model;

        return (
          <div key={entry.model} style={{ opacity }}>
            {/* Rank */}
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

            {/* Label */}
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
                width: Math.max(barWidth, 0),
                height: BAR_HEIGHT,
                background: color,
                borderRadius: '0 4px 4px 0',
              }}
            />

            {/* Score */}
            <div
              style={{
                position: 'absolute',
                top: y + BAR_HEIGHT / 2,
                left: BAR_AREA_LEFT + Math.max(barWidth, 0) + 8,
                transform: 'translateY(-50%)',
                color: '#fff',
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {animatedScore.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: config.valueDecimals ?? 1 })}{config.valueSuffix ?? '%'}
            </div>
          </div>
        );
      })}

      {/* Music */}
      {config.musicSrc && (
        <Audio src={staticFile(config.musicSrc)} volume={config.musicVolume ?? 0.7} loop />
      )}

      {/* Legend */}
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
        {Object.entries(config.labColors).map(([lab, color]) => (
          <div key={lab} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width: 12, height: 12, borderRadius: 2, background: color }} />
            <span style={{ color: '#aaa', fontSize: 12 }}>{lab}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
