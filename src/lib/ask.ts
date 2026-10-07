import type { ResourceEntry, TrackCard } from '@/types';

const CATEGORY_LABELS: Record<TrackCard['category'], string> = {
  competition: '竞赛',
  enrollment: '升学',
  art: '艺考',
  sport: '体育',
  overseas: '出国',
  vocational: '职教',
};

// Keep the local search useful for natural-language questions without pretending
// that a model or remote search ran.
const SEARCH_HINTS = [
  '升学', '竞赛', '信息学', '算法', '编程', '强基', '综合评价', '综评',
  '高考', '基础学科', '面试', '志愿', '资源', '时间线', '出国', '艺考',
  '体育', '职教', '理科', '文科', '数学', '物理', '化学', '生物', '英语',
  '免费', '官方',
];

function getSearchTerms(query: string): string[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const hints = SEARCH_HINTS.filter((hint) => normalized.includes(hint));
  const latinTerms = normalized.match(/[a-z0-9]+/g) ?? [];
  return [...new Set([normalized, ...hints, ...latinTerms])];
}

function scoreText(text: string, terms: string[]): number {
  return terms.reduce((score, term, index) => {
    if (!text.includes(term)) return score;
    return score + (index === 0 ? 5 : 1);
  }, 0);
}

export function matchTracks(query: string, tracks: TrackCard[]): TrackCard[] {
  const terms = getSearchTerms(query);
  if (terms.length === 0) return [];

  return tracks
    .map((track) => ({
      track,
      score: scoreText(
        [
          track.name,
          CATEGORY_LABELS[track.category],
          track.oneLiner,
          track.overview,
          ...track.suitableFor,
          ...track.notSuitableFor,
        ].join(' ').toLowerCase(),
        terms,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ track }) => track);
}

export function matchResources(query: string, resources: ResourceEntry[]): ResourceEntry[] {
  const terms = getSearchTerms(query);
  if (terms.length === 0) return [];

  return resources
    .map((resource) => ({
      resource,
      score: scoreText(
        [resource.name, resource.description, ...resource.tags, ...resource.tracks]
          .join(' ')
          .toLowerCase(),
        terms,
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ resource }) => resource);
}
