import { BarChartConfig } from '../../src/engine/types';
import { entries } from './entries';
import { categories } from './categories';
import { storyCards } from './story-cards';

export const data: BarChartConfig = {
  id: 'UsCities',
  title: 'Largest U.S. Cities — 1900 to 2020',
  fps: 30,
  topN: 10,
  transitionFrames: 15,
  holdFrames: 10,
  trailingFrames: 90,
  musicSrc: 'Signal Through the Dark.mp3',
  musicVolume: 0.7,
  valueSuffix: 'K',
  mode: 'simultaneous',
  labColors: categories,
  entries,
  storyCards,
};
