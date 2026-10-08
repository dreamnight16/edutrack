import type { GlobalTimelineNode, ResourceCost, ResourceType, TrackCard } from '@/types';
import { getResourcesByTrack } from './resources';
import { getTimelineByTrack } from './timeline';

/**
 * A track page needs to answer "what do I read next". The shipped data holds
 * resources twice: as track.resources (name/url/description) and in the resource
 * library (which also carries type/cost). This merges both by URL so a single
 * link is never listed twice, and library-only entries still get their metadata.
 */
export interface TrackResource {
  id: string;
  name: string;
  url: string;
  description: string;
  type?: ResourceType;
  cost?: ResourceCost;
  /** Present when the entry also exists in the resource library. */
  inLibrary: boolean;
}

export function buildTrackResources(track: TrackCard): TrackResource[] {
  const library = getResourcesByTrack(track.id);
  const byUrl = new Map(library.map((entry) => [entry.url, entry]));
  const seen = new Set<string>();
  const merged: TrackResource[] = [];

  for (const resource of track.resources) {
    const entry = byUrl.get(resource.url);
    merged.push({
      id: resource.id,
      name: resource.name,
      url: resource.url,
      description: resource.description,
      type: entry?.type,
      cost: entry?.cost,
      inLibrary: Boolean(entry),
    });
    seen.add(resource.url);
  }

  for (const entry of library) {
    if (seen.has(entry.url)) continue;
    merged.push({
      id: entry.id,
      name: entry.name,
      url: entry.url,
      description: entry.description,
      type: entry.type,
      cost: entry.cost,
      inLibrary: true,
    });
    seen.add(entry.url);
  }

  return merged;
}

/** Cross-references the track page with the shared timeline instead of siloing them. */
export function getTrackTimelineNodes(trackId: string): GlobalTimelineNode[] {
  return getTimelineByTrack(trackId);
}
