import { getGrades } from '@/lib/timeline';

interface GradeSelectorProps {
  selected: string;
  onSelect: (grade: string) => void;
  /** Node count per grade, computed from the bundled timeline. */
  counts: Record<string, number>;
}

export function GradeSelector({ selected, onSelect, counts }: GradeSelectorProps) {
  const options = [{ id: 'all', label: '全部' }].concat(
    getGrades().map((grade) => ({ id: grade, label: grade }))
  );

  return (
    <div className="wl-pad">
      <div className="wl-segbar" role="group" aria-label="按年级筛选时间节点">
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
