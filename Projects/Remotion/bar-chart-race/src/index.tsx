import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { BarChartRace } from './engine/BarChartRace';
import { computeTotalFrames } from './engine/compute';
import { data as aiMmlu } from '../data/ai-mmlu/barchart';
import { data as streamingWars } from '../data/streaming-wars/barchart';

const configs = [aiMmlu, streamingWars];

const RemotionRoot: React.FC = () => {
  return (
    <>
      {configs.map((data) => (
        <Composition
          key={data.id}
          id={data.id}
          component={BarChartRace}
          durationInFrames={computeTotalFrames(data)}
          fps={data.fps ?? 30}
          width={1280}
          height={720}
          defaultProps={{ config: data }}
        />
      ))}
    </>
  );
};

registerRoot(RemotionRoot);
