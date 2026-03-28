/**
 * Structural tests for simple-narrated-slides.
 * Verify the project looks like it should — key files present, audio files intact.
 * Not functional tests — just snafu protection.
 *
 * BYG compositions: add a new entry to BYG_COMPOSITIONS when a new illustration is completed.
 */

import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

const root = path.resolve(__dirname, '..');

function exists(rel: string) {
  return fs.existsSync(path.join(root, rel));
}

// ─── BYG Compositions ─────────────────────────────────────────────────────────
// Each entry: { name: PascalCase TSX name, slug: audio folder name, slides: number }
const BYG_COMPOSITIONS = [
  { name: 'NuclearPlant',    slug: 'nuclear',          slides: 4 },
  { name: 'GodNotCriminal',  slug: 'god-not-criminal', slides: 4 },
];

// ─── Core files ───────────────────────────────────────────────────────────────

describe('compositions', () => {
  it('Root.tsx exists',             () => expect(exists('src/Root.tsx')).toBe(true));
  it('Britain1940.tsx exists',      () => expect(exists('src/Britain1940.tsx')).toBe(true));
  it('BattleOfAtlantic.tsx exists', () => expect(exists('src/BattleOfAtlantic.tsx')).toBe(true));
  it('HelloWorld.tsx exists',       () => expect(exists('src/HelloWorld.tsx')).toBe(true));
  it('ModelCollapse.tsx exists',    () => expect(exists('src/ModelCollapse.tsx')).toBe(true));
  it('index.ts exists',             () => expect(exists('src/index.ts')).toBe(true));

  for (const { name } of BYG_COMPOSITIONS) {
    it(`${name}.tsx exists`, () => expect(exists(`src/${name}.tsx`)).toBe(true));
  }
});

describe('durations', () => {
  it('slide-durations.ts exists',    () => expect(exists('src/slide-durations.ts')).toBe(true));
  it('atlantic-durations.ts exists', () => expect(exists('src/atlantic-durations.ts')).toBe(true));

  for (const { slug } of BYG_COMPOSITIONS) {
    it(`${slug}-durations.ts exists`, () =>
      expect(exists(`src/${slug}-durations.ts`)).toBe(true));
  }
});

// ─── Legacy audio (Britain1940 / BattleOfAtlantic) ────────────────────────────

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

// ─── BYG audio ────────────────────────────────────────────────────────────────

for (const { name, slug, slides } of BYG_COMPOSITIONS) {
  describe(`${name} audio`, () => {
    it(`public/audio/${slug}/title.mp3 exists`, () =>
      expect(exists(`public/audio/${slug}/title.mp3`)).toBe(true));
    for (let i = 1; i <= slides; i++) {
      it(`public/audio/${slug}/slide-${i}.mp3 exists`, () =>
        expect(exists(`public/audio/${slug}/slide-${i}.mp3`)).toBe(true));
    }
  });
}

// ─── Scripts ──────────────────────────────────────────────────────────────────

describe('scripts', () => {
  it('generate-audio.mjs exists',         () => expect(exists('scripts/generate-audio.mjs')).toBe(true));
  it('generate-atlantic-audio.mjs exists', () => expect(exists('scripts/generate-atlantic-audio.mjs')).toBe(true));
});

// ─── Config ───────────────────────────────────────────────────────────────────

describe('config', () => {
  it('remotion.config.ts exists', () => expect(exists('remotion.config.ts')).toBe(true));
  it('package.json exists',       () => expect(exists('package.json')).toBe(true));
  it('tsconfig.json exists',      () => expect(exists('tsconfig.json')).toBe(true));
});
