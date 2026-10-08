import type { ResourceCost, ResourceType } from '@/types';
import {
  COST_META,
  COST_ORDER,
  RESOURCE_TYPE_LABELS,
  RESOURCE_TYPE_ORDER,
} from '@/lib/theme';

interface ResourceFilterProps {
  type: ResourceType | 'all';
  cost: ResourceCost | 'all';
  onTypeChange: (type: ResourceType | 'all') => void;
  onCostChange: (cost: ResourceCost | 'all') => void;
  /** How many entries each option would return, counted from the full library. */
  typeCounts: Record<string, number>;
  costCounts: Record<string, number>;
}

export function ResourceFilter({
  type,
  cost,
  onTypeChange,
  onCostChange,
  typeCounts,
  costCounts,
}: ResourceFilterProps) {
  const types: Array<{ id: ResourceType | 'all'; label: string }> = [
    { id: 'all', label: '全部类型' },
    ...RESOURCE_TYPE_ORDER.map((id) => ({ id, label: RESOURCE_TYPE_LABELS[id] })),
  ];

  const costs: Array<{ id: ResourceCost | 'all'; label: string; mark?: string }> = [
    { id: 'all', label: '全部' },
    ...COST_ORDER.map((id) => ({
      id,
      label: COST_META[id].label,
      mark: COST_META[id].mark,
    })),
  ];

  return (
    <div className="space-y-5">
      <div>
        <span className="wl-kicker wl-secondary" id="filter-type-label">
          资源类型
        </span>
        <div
          className="wl-segbar wl-segbar--stack"
          role="group"
          aria-labelledby="filter-type-label"
          style={{ marginTop: '0.5rem' }}
        >
          {types.map((option) => (
            <button
              key={option.id}
              type="button"
              className="wl-seg dn-focus"
              aria-pressed={type === option.id}
              onClick={() => onTypeChange(option.id)}
            >
              <span>{option.label}</span>
              <span className="wl-seg__count">{typeCounts[option.id] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="wl-kicker wl-secondary" id="filter-cost-label">
          费用
        </span>
        <div
          className="wl-segbar wl-segbar--stack"
          role="group"
          aria-labelledby="filter-cost-label"
          style={{ marginTop: '0.5rem' }}
        >
          {costs.map((option) => (
            <button
              key={option.id}
              type="button"
              className="wl-seg dn-focus"
              aria-pressed={cost === option.id}
              onClick={() => onCostChange(option.id)}
            >
              <span>
                {option.mark ? (
                  <span className="wl-mark" aria-hidden="true">
                    {option.mark}{' '}
                  </span>
                ) : null}
                {option.label}
              </span>
              <span className="wl-seg__count">{costCounts[option.id] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
