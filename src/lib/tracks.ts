import type { TrackCard, TrackCategory } from '@/types';
import informaticsOlympiad from '@/data/tracks/informatics-olympiad.json';
import strongBasePlan from '@/data/tracks/strong-base-plan.json';
import comprehensiveEvaluation from '@/data/tracks/comprehensive-evaluation.json';

const tracks: TrackCard[] = [
  informaticsOlympiad as TrackCard,
  strongBasePlan as TrackCard,
  comprehensiveEvaluation as TrackCard,
];

export function getAllTracks(): TrackCard[] {
  return tracks;
}

export function getTrackById(id: string): TrackCard | undefined {
  return tracks.find((t) => t.id === id);
}

export function getTracksByCategory(category: TrackCategory | 'all'): TrackCard[] {
  if (category === 'all') return tracks;
  return tracks.filter((t) => t.category === category);
}
