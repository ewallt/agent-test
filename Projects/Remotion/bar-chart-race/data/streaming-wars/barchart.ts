// Generated from component files (entries, categories, metadata, story-cards).
// Run: npm run build -- streaming-wars  to regenerate.

import { BarChartConfig } from '../../src/engine/types';
import { entries } from './entries';
import { categories } from './categories';
import { storyCards } from './story-cards';
import { metadata } from './metadata';
import { standardTiming } from '../../library/timing';
import { signalThroughTheDark } from '../../library/music';

export const data: BarChartConfig = {
  ...metadata,
  ...standardTiming,
  musicSrc: signalThroughTheDark.src,
  musicVolume: signalThroughTheDark.volume,
  labColors: categories,
  entries,
  storyCards,
};
