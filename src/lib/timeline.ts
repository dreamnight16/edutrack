import type { GlobalTimelineNode } from '@/types';
import timelineData from '@/data/timeline/index.json';

const timeline: GlobalTimelineNode[] = timelineData as GlobalTimelineNode[];

export function getAllTimelineNodes(): GlobalTimelineNode[] {
  return timeline;
}

export function getTimelineByGrade(grade: string): GlobalTimelineNode[] {
  return timeline.filter((n) => n.grade === grade);
}

export function getTimelineByTrack(trackId: string): GlobalTimelineNode[] {
  return timeline.filter((n) => n.tracks.includes(trackId));
}

export function getGrades(): string[] {
  return ['高一上', '高一下', '高二上', '高二下', '高三上', '高三下'];
}
