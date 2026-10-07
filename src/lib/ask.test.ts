import { describe, expect, it } from 'vitest';
import { getAllResources } from './resources';
import { getAllTracks } from './tracks';
import { matchResources, matchTracks } from './ask';

describe('local ask search', () => {
  it('matches a natural-language enrollment question without a model', () => {
    const results = matchTracks('河南理科生有什么升学途径', getAllTracks());

    const ids = results.map((track) => track.id);
    expect(ids).toContain('strong-base-plan');
    expect(ids).toContain('comprehensive-evaluation');
  });

  it('matches resources by local keywords', () => {
    expect(matchResources('算法', getAllResources()).map((resource) => resource.id)).toContain('luogu');
  });
});
