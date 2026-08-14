import { describe, it, expect } from 'vitest';

describe('resources lib', () => {
  it('getAllResources returns 8 resources', async () => {
    const { getAllResources } = await import('./resources');
    const resources = getAllResources();
    expect(Array.isArray(resources)).toBe(true);
    expect(resources).toHaveLength(8);
  });

  it('getResourceById returns the correct resource', async () => {
    const { getResourceById } = await import('./resources');
    const resource = getResourceById('luogu');
    expect(resource).toBeDefined();
    expect(resource!.name).toBe('洛谷');
    expect(resource!.type).toBe('tool');
    expect(resource!.cost).toBe('freemium');
  });

  it('getResourceById returns undefined for missing id', async () => {
    const { getResourceById } = await import('./resources');
    expect(getResourceById('nonexistent')).toBeUndefined();
  });

  it('getResourcesByTrack returns only resources for the given track', async () => {
    const { getResourcesByTrack } = await import('./resources');
    const resources = getResourcesByTrack('strong-base-plan');
    expect(resources.map((r) => r.id)).toEqual(['moe-strong-base', 'tsinghua-qiangji']);
    expect(resources.every((r) => r.tracks.includes('strong-base-plan'))).toBe(true);
  });

  it('getResourcesByTrack returns empty array for unknown track', async () => {
    const { getResourcesByTrack } = await import('./resources');
    expect(getResourcesByTrack('nonexistent')).toEqual([]);
  });

  it('filterResources with no opts returns all resources', async () => {
    const { filterResources } = await import('./resources');
    expect(filterResources({})).toHaveLength(8);
  });

  it('filterResources with empty search returns all resources', async () => {
    const { filterResources } = await import('./resources');
    expect(filterResources({ search: '' })).toHaveLength(8);
  });

  it('filterResources filters by type', async () => {
    const { filterResources } = await import('./resources');
    const official = filterResources({ type: 'official' });
    expect(official.map((r) => r.id)).toEqual([
      'moe-strong-base',
      'sustech-admission',
      'nyush-admission',
    ]);
    expect(official.every((r) => r.type === 'official')).toBe(true);
  });

  it('filterResources filters by cost', async () => {
    const { filterResources } = await import('./resources');
    const free = filterResources({ cost: 'free' });
    expect(free).toHaveLength(6);
    expect(free.every((r) => r.cost === 'free')).toBe(true);
  });

  it('filterResources filters by freemium cost', async () => {
    const { filterResources } = await import('./resources');
    const freemium = filterResources({ cost: 'freemium' });
    expect(freemium.map((r) => r.id)).toEqual(['luogu', 'acwing']);
  });

  it('filterResources filters by search across name/description/tags', async () => {
    const { filterResources } = await import('./resources');
    const results = filterResources({ search: '算法' });
    expect(results.map((r) => r.id)).toEqual(['luogu', 'oi-wiki', 'codeforces', 'acwing']);
  });

  it('filterResources search is case-insensitive', async () => {
    const { filterResources } = await import('./resources');
    expect(filterResources({ search: 'CODE' }).map((r) => r.id)).toEqual(['codeforces']);
  });

  it('filterResources filters by trackId', async () => {
    const { filterResources } = await import('./resources');
    const results = filterResources({ trackId: 'comprehensive-evaluation' });
    expect(results.map((r) => r.id)).toEqual(['sustech-admission', 'nyush-admission']);
  });

  it('filterResources combines type and cost filters', async () => {
    const { filterResources } = await import('./resources');
    const results = filterResources({ type: 'tool', cost: 'free' });
    expect(results.map((r) => r.id)).toEqual(['codeforces']);
  });
});
