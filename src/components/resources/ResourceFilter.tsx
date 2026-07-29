import type { ResourceType, ResourceCost } from '@/types';

const TYPES: Array<{ id: ResourceType | 'all'; label: string }> = [
  { id: 'all', label: '全部类型' },
  { id: 'book', label: '书籍' },
  { id: 'course', label: '课程' },
  { id: 'tool', label: '工具' },
  { id: 'community', label: '社区' },
  { id: 'official', label: '官方' },
  { id: 'article', label: '文章' },
  { id: 'video', label: '视频' },
];

const COSTS: Array<{ id: ResourceCost | 'all'; label: string }> = [
  { id: 'all', label: '全部' },
  { id: 'free', label: '免费' },
  { id: 'freemium', label: '部分免费' },
  { id: 'paid', label: '付费' },
];

interface ResourceFilterProps {
  type: ResourceType | 'all';
  cost: ResourceCost | 'all';
  onTypeChange: (t: ResourceType | 'all') => void;
  onCostChange: (c: ResourceCost | 'all') => void;
}

export function ResourceFilter({
  type,
  cost,
  onTypeChange,
  onCostChange,
}: ResourceFilterProps) {
  return (
    <div className="px-4 space-y-2">
      <div className="flex gap-2 overflow-x-auto">
        {TYPES.map((t) => (
          <button
            key={t.id}
            onClick={() => onTypeChange(t.id)}
            className={`shrink-0 px-3 py-1 rounded-chip text-xs font-medium transition-colors ${
              type === t.id
                ? 'bg-primary text-white'
                : 'bg-surface text-muted hover:text-foreground border border-primary/10'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {COSTS.map((c) => (
          <button
            key={c.id}
            onClick={() => onCostChange(c.id)}
            className={`shrink-0 px-3 py-1 rounded-chip text-xs font-medium transition-colors ${
              cost === c.id
                ? 'bg-accent text-white'
                : 'bg-surface text-muted hover:text-foreground border border-primary/10'
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  );
}
