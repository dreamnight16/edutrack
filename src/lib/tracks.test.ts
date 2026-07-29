import { describe, it, expect } from 'vitest';

describe('tracks lib', () => {
  it('getAllTracks returns array with 3 tracks', async () => {
    const { getAllTracks } = await import('./tracks');
    const tracks = getAllTracks();
    expect(Array.isArray(tracks)).toBe(true);
    expect(tracks.length).toBeGreaterThanOrEqual(3);
  });

  it('getTrackById returns the correct track', async () => {
    const { getTrackById } = await import('./tracks');
    const track = getTrackById('informatics-olympiad');
    expect(track).toBeDefined();
    expect(track!.name).toBe('信息学竞赛');
  });

  it('getTrackById returns undefined for missing id', async () => {
    const { getTrackById } = await import('./tracks');
    expect(getTrackById('nonexistent')).toBeUndefined();
  });

  it('getTracksByCategory filters by competition', async () => {
    const { getTracksByCategory } = await import('./tracks');
    const comp = getTracksByCategory('competition');
    expect(comp.length).toBeGreaterThanOrEqual(1);
    expect(comp.every((t) => t.category === 'competition')).toBe(true);
  });

  it('getTracksByCategory with "all" returns all tracks', async () => {
    const { getTracksByCategory } = await import('./tracks');
    const all = getTracksByCategory('all');
    expect(all.length).toBeGreaterThanOrEqual(3);
  });
});
