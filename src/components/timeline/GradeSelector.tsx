import { getGrades } from '@/lib/timeline';

interface GradeSelectorProps {
  selected: string;
  onSelect: (grade: string) => void;
}

export function GradeSelector({ selected, onSelect }: GradeSelectorProps) {
  const grades = getGrades();

  return (
    <div className="flex gap-2 overflow-x-auto px-4 py-3">
      <button
        onClick={() => onSelect('all')}
        className={`shrink-0 px-3 py-1.5 rounded-chip text-sm font-medium transition-colors ${
          selected === 'all'
            ? 'bg-primary text-white'
            : 'bg-surface text-muted hover:text-foreground border border-primary/10'
        }`}
      >
        全部
      </button>
      {grades.map((g) => (
        <button
          key={g}
          onClick={() => onSelect(g)}
          className={`shrink-0 px-3 py-1.5 rounded-chip text-sm font-medium transition-colors ${
            selected === g
              ? 'bg-primary text-white'
              : 'bg-surface text-muted hover:text-foreground border border-primary/10'
          }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}
