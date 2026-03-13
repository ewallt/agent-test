/**
 * Structural tests for bar-chart-race.
 * Verify the project looks like it should — key files present, data folders intact.
 * Not functional tests — just snafu protection.
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..');

function exists(rel: string) {
  return fs.existsSync(path.join(root, rel));
}

describe('engine', () => {
  it('BarChartRace.tsx exists',            () => expect(exists('src/engine/BarChartRace.tsx')).toBe(true));
  it('BarChartRaceSimultaneous.tsx exists', () => expect(exists('src/engine/BarChartRaceSimultaneous.tsx')).toBe(true));
  it('compute.ts exists',                  () => expect(exists('src/engine/compute.ts')).toBe(true));
  it('types.ts exists',                    () => expect(exists('src/engine/types.ts')).toBe(true));
  it('index.tsx exists',                   () => expect(exists('src/index.tsx')).toBe(true));
});

describe('library', () => {
  it('music.ts exists',   () => expect(exists('library/music.ts')).toBe(true));
  it('timing.ts exists',  () => expect(exists('library/timing.ts')).toBe(true));
  it('colors.ts exists',  () => expect(exists('library/colors.ts')).toBe(true));
});

describe('config', () => {
  it('remotion.config.ts exists',  () => expect(exists('remotion.config.ts')).toBe(true));
  it('package.json exists',        () => expect(exists('package.json')).toBe(true));
  it('tsconfig.json exists',       () => expect(exists('tsconfig.json')).toBe(true));
});

describe('music', () => {
  it('Signal Through the Dark.mp3 exists', () =>
    expect(exists('public/Signal Through the Dark.mp3')).toBe(true));
});

const DATA_PROJECTS = ['ai-mmlu', 'streaming-wars', 'us-cities', 'us-top-10-cities'];
const REQUIRED_DATA_FILES = ['entries.ts', 'categories.ts', 'metadata.ts', 'story-cards.ts', 'barchart.ts'];

describe('data projects', () => {
  for (const project of DATA_PROJECTS) {
    for (const file of REQUIRED_DATA_FILES) {
      it(`data/${project}/${file} exists`, () =>
        expect(exists(`data/${project}/${file}`)).toBe(true));
    }
  }
});

describe('data barrel', () => {
  it('data/index.ts exists', () => expect(exists('data/index.ts')).toBe(true));
});

describe('scripts', () => {
  it('build.ts exists', () => expect(exists('scripts/build.ts')).toBe(true));
});

describe('documents', () => {
  it('design.md exists',           () => expect(exists('documents/design.md')).toBe(true));
  it('new-project-prompt.md exists', () => expect(exists('documents/new-project-prompt.md')).toBe(true));
  it('agent-task-prompt.md exists',  () => expect(exists('documents/agent-task-prompt.md')).toBe(true));
});
