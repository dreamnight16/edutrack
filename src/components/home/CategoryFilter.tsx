import type { TrackCategory } from '@/types';

const FILTERS: Array<{ id: TrackCategory | 'all'; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'competition', label: '竞赛' },
  { id: 'enrollment', label: '升学' },
  { id: 'art', label: '艺考' },
  { id: 'sport', label: '体育' },
  { id: 'overseas', label: '出国' },
  { id: 'vocational', label: '职教' },
];

interface CategoryFilterProps {
  selected: TrackCategory | 'all';
  onSelect: (id: TrackCategory | 'all') => void;
}

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3">
      {FILTERS.map((f) => (
        <button
          key={f.id}
          onClick={() => onSelect(f.id)}
          className={`shrink-0 px-4 py-1.5 rounded-chip text-sm font-medium transition-colors ${
            selected === f.id
              ? 'bg-primary text-white'
              : 'bg-surface text-muted hover:text-foreground border border-primary/10'
          }`}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}
