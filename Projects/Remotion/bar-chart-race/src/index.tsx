import React from 'react';
import { Composition, registerRoot } from 'remotion';
import { BarChartRace } from './engine/BarChartRace';
import { BarChartRaceSimultaneous } from './engine/BarChartRaceSimultaneous';
import { computeTotalFrames, computeSimTotalFrames } from './engine/compute';
import { configs } from '../data';

const RemotionRoot: React.FC = () => {
  return (
    <>
      {configs.map((data) => {
        const component = data.mode === 'simultaneous' ? BarChartRaceSimultaneous : BarChartRace;
        const duration = data.mode === 'simultaneous' ? computeSimTotalFrames(data) : computeTotalFrames(data);
        return (
          <Composition
            key={data.id}
            id={data.id}
            component={component}
            durationInFrames={duration}
            fps={data.fps ?? 30}
            width={1280}
            height={720}
            defaultProps={{ config: data }}
          />
        );
      })}
    </>
  );
};

registerRoot(RemotionRoot);
