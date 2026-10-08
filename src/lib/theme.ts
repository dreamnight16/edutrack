import type { ResourceCost, ResourceType, TrackCategory } from '@/types';

/** The eight DNDL brand colours. Values live in tokens.css — never re-declare them. */
export type BrandColor =
  | 'teal'
  | 'cyan'
  | 'emerald'
  | 'violet'
  | 'amber'
  | 'orange'
  | 'steel'
  | 'crimson';

export interface CategoryMeta {
  id: TrackCategory;
  label: string;
  latin: string;
  color: BrandColor;
}

/**
 * One colour per category, drawn from the fixed DNDL palette:
 * violet = exploration, cyan = information, orange = activity,
 * emerald = positive/functional, steel = neutral, amber = supporting emphasis.
 * Teal stays the product accent; crimson is reserved for risk states.
 */
export const CATEGORY_META: Record<TrackCategory, CategoryMeta> = {
  competition: { id: 'competition', label: '竞赛', latin: 'COMPETITION', color: 'violet' },
  enrollment: { id: 'enrollment', label: '升学', latin: 'ADMISSION', color: 'cyan' },
  art: { id: 'art', label: '艺考', latin: 'ART', color: 'orange' },
  sport: { id: 'sport', label: '体育', latin: 'SPORT', color: 'emerald' },
  overseas: { id: 'overseas', label: '出国', latin: 'OVERSEAS', color: 'steel' },
  vocational: { id: 'vocational', label: '职教', latin: 'VOCATIONAL', color: 'amber' },
};

export const CATEGORY_ORDER: TrackCategory[] = [
  'competition',
  'enrollment',
  'art',
  'sport',
  'overseas',
  'vocational',
];

const FALLBACK: CategoryMeta = {
  id: 'enrollment',
  label: '未分类',
  latin: 'UNCATEGORISED',
  color: 'steel',
};

export function categoryMeta(category: TrackCategory): CategoryMeta {
  return CATEGORY_META[category] ?? FALLBACK;
}

/**
 * Class name for a solid brand colour field.
 * Written out as a literal per colour (rather than composed at runtime) so the
 * Tailwind content scanner can see every class it has to emit.
 */
const FIELD_CLASS: Record<BrandColor, string> = {
  teal: 'wl-field wl-field--teal',
  cyan: 'wl-field wl-field--cyan',
  emerald: 'wl-field wl-field--emerald',
  violet: 'wl-field wl-field--violet',
  amber: 'wl-field wl-field--amber',
  orange: 'wl-field wl-field--orange',
  steel: 'wl-field wl-field--steel',
  crimson: 'wl-field wl-field--crimson',
};

export function fieldClass(color: BrandColor): string {
  return FIELD_CLASS[color] ?? FIELD_CLASS.steel;
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  book: '书籍',
  course: '课程',
  tool: '工具',
  community: '社区',
  official: '官方',
  article: '文章',
  video: '视频',
};

export const RESOURCE_TYPE_ORDER: ResourceType[] = [
  'book',
  'course',
  'tool',
  'community',
  'official',
  'article',
  'video',
];

/** Cost is stated as text plus a shape, so it never depends on colour alone. */
export const COST_META: Record<ResourceCost, { label: string; mark: string }> = {
  free: { label: '免费', mark: '■' },
  freemium: { label: '部分免费', mark: '◧' },
  paid: { label: '付费', mark: '□' },
};

export const COST_ORDER: ResourceCost[] = ['free', 'freemium', 'paid'];

/**
 * Grade labels are not uniform in the shipped data: the global timeline uses
 * 高一上/高一下/… while one track's key nodes use 高一/高二/高三. Ranking both
 * keeps display order predictable without rewriting the data files.
 */
const GRADE_RANK: Record<string, number> = {
  高一: 10,
  高一上: 11,
  高一下: 12,
  高二: 20,
  高二上: 21,
  高二下: 22,
  高三: 30,
  高三上: 31,
  高三下: 32,
};

export function gradeRank(grade: string): number {
  return GRADE_RANK[grade] ?? 99;
}

export function byGradeThenMonth<T extends { grade: string; month: number }>(
  a: T,
  b: T
): number {
  return gradeRank(a.grade) - gradeRank(b.grade) || a.month - b.month;
}

/** Makes the coarser整学年 labels visible instead of silently mixing scales. */
export function gradeLabel(grade: string): string {
  return /^高[一二三]$/.test(grade) ? grade + '（整学年跨度）' : grade;
}
