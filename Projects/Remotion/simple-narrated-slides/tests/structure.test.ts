/**
 * Structural tests for simple-narrated-slides.
 * Verify the project looks like it should — key files present, audio files intact.
 * Not functional tests — just snafu protection.
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..');

function exists(rel: string) {
  return fs.existsSync(path.join(root, rel));
}

describe('compositions', () => {
  it('Root.tsx exists',              () => expect(exists('src/Root.tsx')).toBe(true));
  it('Britain1940.tsx exists',       () => expect(exists('src/Britain1940.tsx')).toBe(true));
  it('BattleOfAtlantic.tsx exists',  () => expect(exists('src/BattleOfAtlantic.tsx')).toBe(true));
  it('HelloWorld.tsx exists',        () => expect(exists('src/HelloWorld.tsx')).toBe(true));
  it('ModelCollapse.tsx exists',     () => expect(exists('src/ModelCollapse.tsx')).toBe(true));
  it('index.ts exists',              () => expect(exists('src/index.ts')).toBe(true));
});

describe('durations', () => {
  it('slide-durations.ts exists',    () => expect(exists('src/slide-durations.ts')).toBe(true));
  it('atlantic-durations.ts exists', () => expect(exists('src/atlantic-durations.ts')).toBe(true));
});

describe('britain1940 audio', () => {
  const files = ['title', 'slide-1', 'slide-2', 'slide-3', 'slide-4', 'slide-5'];
  for (const f of files) {
    it(`public/audio/${f}.mp3 exists`, () =>
      expect(exists(`public/audio/${f}.mp3`)).toBe(true));
  }
});

describe('battleofatlantic audio', () => {
  const slides = [1, 2, 3, 4, 5];
  const bullets = [1, 2, 3];
  it('public/audio/atlantic/title.mp3 exists', () =>
    expect(exists('public/audio/atlantic/title.mp3')).toBe(true));
  for (const s of slides) {
    for (const b of bullets) {
      it(`public/audio/atlantic/s${s}b${b}.mp3 exists`, () =>
        expect(exists(`public/audio/atlantic/s${s}b${b}.mp3`)).toBe(true));
    }
  }
});

describe('scripts', () => {
  it('generate-audio.mjs exists',         () => expect(exists('scripts/generate-audio.mjs')).toBe(true));
  it('generate-atlantic-audio.mjs exists', () => expect(exists('scripts/generate-atlantic-audio.mjs')).toBe(true));
});

describe('config', () => {
  it('remotion.config.ts exists', () => expect(exists('remotion.config.ts')).toBe(true));
  it('package.json exists',       () => expect(exists('package.json')).toBe(true));
  it('tsconfig.json exists',      () => expect(exists('tsconfig.json')).toBe(true));
});
