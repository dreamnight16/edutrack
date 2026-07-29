import type { ResourceEntry, ResourceType, ResourceCost } from '@/types';
import resourcesData from '@/data/resources/index.json';

const resources: ResourceEntry[] = resourcesData as ResourceEntry[];

export function getAllResources(): ResourceEntry[] {
  return resources;
}

export function getResourceById(id: string): ResourceEntry | undefined {
  return resources.find((r) => r.id === id);
}

export function getResourcesByTrack(trackId: string): ResourceEntry[] {
  return resources.filter((r) => r.tracks.includes(trackId));
}

export function filterResources(opts: {
  type?: ResourceType;
  cost?: ResourceCost;
  search?: string;
  trackId?: string;
}): ResourceEntry[] {
  let result = resources;
  const { trackId, type, cost, search } = opts;
  if (trackId) {
    result = result.filter((r) => r.tracks.includes(trackId));
  }
  if (type) {
    result = result.filter((r) => r.type === type);
  }
  if (cost) {
    result = result.filter((r) => r.cost === cost);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
    );
  }
  return result;
}
