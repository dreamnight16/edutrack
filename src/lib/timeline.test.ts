import { describe, it, expect } from 'vitest';

describe('timeline lib', () => {
  it('getAllTimelineNodes returns 11 nodes', async () => {
    const { getAllTimelineNodes } = await import('./timeline');
    const nodes = getAllTimelineNodes();
    expect(Array.isArray(nodes)).toBe(true);
    expect(nodes).toHaveLength(11);
  });

  it('getTimelineByGrade returns only nodes for the given grade', async () => {
    const { getTimelineByGrade } = await import('./timeline');
    const nodes = getTimelineByGrade('高三下');
    expect(nodes).toHaveLength(3);
    expect(nodes.every((n) => n.grade === '高三下')).toBe(true);
  });

  it('getTimelineByGrade returns empty array for unknown grade', async () => {
    const { getTimelineByGrade } = await import('./timeline');
    expect(getTimelineByGrade('nonexistent')).toEqual([]);
  });

  it('getTimelineByTrack returns only nodes for the given track', async () => {
    const { getTimelineByTrack } = await import('./timeline');
    const nodes = getTimelineByTrack('strong-base-plan');
    expect(nodes).toHaveLength(4);
    expect(nodes.every((n) => n.tracks.includes('strong-base-plan'))).toBe(true);
  });

  it('getTimelineByTrack includes cross-track nodes', async () => {
    const { getTimelineByTrack } = await import('./timeline');
    const nodes = getTimelineByTrack('comprehensive-evaluation');
    expect(nodes).toHaveLength(5);
  });

  it('getTimelineByTrack returns empty array for unknown track', async () => {
    const { getTimelineByTrack } = await import('./timeline');
    expect(getTimelineByTrack('nonexistent')).toEqual([]);
  });

  it('getGrades returns the six grade labels in order', async () => {
    const { getGrades } = await import('./timeline');
    expect(getGrades()).toEqual(['高一上', '高一下', '高二上', '高二下', '高三上', '高三下']);
  });
});
