// Generated from component files (entries, categories, metadata, story-cards).
// Run: npm run build -- tallest-buildings  to regenerate.

import { BarChartConfig } from '../../src/engine/types';
import { entries } from './entries';
import { categories } from './categories';
import { storyCards } from './story-cards';
import { metadata } from './metadata';
import { standardTiming } from '../../library/timing';

export const data: BarChartConfig = {
  ...metadata,
  ...standardTiming,
  labColors: categories,
  entries,
  storyCards,
};
