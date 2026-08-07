import { describe, it, expect } from 'vitest';
import { withBase } from './publicUrl';

// vite.config.js sets base: '/portfolio/', but Vitest doesn't apply that
// setting to import.meta.env.BASE_URL the way a real dev/build server does -
// it resolves to '/' under test. So these tests check withBase()'s actual
// path-joining logic against whatever BASE_URL is in this environment,
// rather than hardcoding the production value.
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

describe('withBase', () => {
  it('joins a path without a leading slash onto the configured base', () => {
    expect(withBase('projects_list.json')).toBe(`${base}/projects_list.json`);
  });

  it('strips a leading slash from the given path to avoid a double slash', () => {
    expect(withBase('/favicon.ico')).toBe(`${base}/favicon.ico`);
  });

  it('joins nested paths correctly', () => {
    expect(withBase('projects/the-drawing.json')).toBe(`${base}/projects/the-drawing.json`);
  });

  it('defaults to an empty path, returning just the base', () => {
    expect(withBase()).toBe(`${base}/`);
  });
});
