import type { TrackCategory } from '@/types';
import { CATEGORY_META, CATEGORY_ORDER } from '@/lib/theme';

export type CategorySelection = TrackCategory | 'all';

interface CategoryFilterProps {
  selected: CategorySelection;
  onSelect: (id: CategorySelection) => void;
  /** Result count per category, computed from the bundled tracks. */
  counts: Record<CategorySelection, number>;
}

export function CategoryFilter({ selected, onSelect, counts }: CategoryFilterProps) {
  const options: Array<{ id: CategorySelection; label: string }> = [
    { id: 'all', label: '全部' },
    ...CATEGORY_ORDER.map((id) => ({ id, label: CATEGORY_META[id].label })),
  ];

  return (
    <div className="wl-pad">
      <div className="wl-segbar" role="group" aria-label="按分类筛选赛道">
        {options.map((option) => (
          <button
            key={option.id}
            type="button"
            className="wl-seg dn-focus"
            aria-pressed={selected === option.id}
            onClick={() => onSelect(option.id)}
          >
            <span>{option.label}</span>
            <span className="wl-seg__count">{counts[option.id] ?? 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
