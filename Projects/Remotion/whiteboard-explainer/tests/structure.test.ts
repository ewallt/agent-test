/**
 * Structural tests for whiteboard-explainer.
 * Verify the project looks like it should — key files present, scenes intact.
 * Not functional tests — just snafu protection.
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..');

function exists(rel: string) {
  return fs.existsSync(path.join(root, rel));
}

describe('entry points', () => {
  it('src/index.ts exists',        () => expect(exists('src/index.ts')).toBe(true));
  it('src/Root.tsx exists',        () => expect(exists('src/Root.tsx')).toBe(true));
  it('src/WhiteboardVideo.tsx exists', () => expect(exists('src/WhiteboardVideo.tsx')).toBe(true));
});

describe('theme system', () => {
  it('src/themes.ts exists',       () => expect(exists('src/themes.ts')).toBe(true));
  it('src/ThemeContext.tsx exists', () => expect(exists('src/ThemeContext.tsx')).toBe(true));
  it('src/types.ts exists',        () => expect(exists('src/types.ts')).toBe(true));
});

describe('components', () => {
  it('DoodleReveal.tsx exists',  () => expect(exists('src/components/DoodleReveal.tsx')).toBe(true));
  it('CalloutText.tsx exists',   () => expect(exists('src/components/CalloutText.tsx')).toBe(true));
});

describe('scenes', () => {
  const scenes = [
    'TitleScene', 'StepRevealScene', 'DiagramBuildScene', 'CompareScene', 'OutroScene',
    'SceneDispatcher', 'QuoteScene', 'StatScene', 'FlowChartScene',
  ];
  for (const scene of scenes) {
    it(`${scene}.tsx exists`, () =>
      expect(exists(`src/scenes/${scene}.tsx`)).toBe(true));
  }
});

describe('example compositions', () => {
  it('scenes.example_1.json exists', () => expect(exists('scenes.example_1.json')).toBe(true));
  it('scenes.example_2.json exists', () => expect(exists('scenes.example_2.json')).toBe(true));
  it('scenes.example_3.json exists', () => expect(exists('scenes.example_3.json')).toBe(true));
});

describe('config', () => {
  it('remotion.config.ts exists', () => expect(exists('remotion.config.ts')).toBe(true));
  it('package.json exists',       () => expect(exists('package.json')).toBe(true));
  it('tsconfig.json exists',      () => expect(exists('tsconfig.json')).toBe(true));
});

describe('documents', () => {
  it('documents/design.md exists',   () => expect(exists('documents/design.md')).toBe(true));
  it('documents/planning.md exists', () => expect(exists('documents/planning.md')).toBe(true));
});
