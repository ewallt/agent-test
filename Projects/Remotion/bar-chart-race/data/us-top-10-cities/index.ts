import { BarChartConfig } from '../../src/engine/types';
import { entries } from './entries';
import { categories } from './categories';
import { storyCards } from './story-cards';

export const data: BarChartConfig = {
  id: 'UsTop10Cities',
  title: 'U.S. Top 10 Cities — 1960 to Present',
  fps: 30,
  topN: 10,
  transitionFrames: 12,
  holdFrames: 8,
  trailingFrames: 90,
  musicSrc: 'Signal Through the Dark.mp3',
  musicVolume: 0.7,
  valueSuffix: '',
  valueDecimals: 0,
  mode: 'simultaneous',
  labColors: categories,
  entries,
  storyCards,
};
