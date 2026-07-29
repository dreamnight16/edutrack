export type TrackCategory = 'competition' | 'enrollment' | 'art' | 'sport' | 'overseas' | 'vocational';

export interface TimelineNode {
  grade: string;
  month: number;
  event: string;
  action: string;
  deadline?: string;
}

export interface LinkedResource {
  id: string;
  name: string;
  url: string;
  description: string;
}

export interface TrackCard {
  id: string;
  name: string;
  category: TrackCategory;
  oneLiner: string;
  overview: string;
  suitableFor: string[];
  notSuitableFor: string[];
  keyNodes: TimelineNode[];
  resources: LinkedResource[];
}

export type ResourceType = 'book' | 'course' | 'tool' | 'community' | 'official' | 'article' | 'video';
export type ResourceCost = 'free' | 'paid' | 'freemium';

export interface ResourceEntry {
  id: string;
  name: string;
  url: string;
  description: string;
  type: ResourceType;
  cost: ResourceCost;
  tracks: string[];
  gradeRange: [number, number];
  tags: string[];
}

export interface GlobalTimelineNode {
  grade: string;
  month: number;
  event: string;
  action: string;
  tracks: string[];
  deadline?: string;
}
