import type { GlobalTimelineNode } from '@/types';

interface TimelineListProps {
  nodes: GlobalTimelineNode[];
}

const GRADE_ORDER = ['高一上', '高一下', '高二上', '高二下', '高三上', '高三下'];

export function TimelineList({ nodes }: TimelineListProps) {
  const byGrade = new Map<string, GlobalTimelineNode[]>();
  for (const node of nodes) {
    const existing = byGrade.get(node.grade) ?? [];
    existing.push(node);
    byGrade.set(node.grade, existing);
  }

  const sortedGrades = Array.from(byGrade.keys()).sort(
    (a, b) => GRADE_ORDER.indexOf(a) - GRADE_ORDER.indexOf(b)
  );

  return (
    <div className="px-4 space-y-6">
      {sortedGrades.map((grade) => (
        <div key={grade}>
          <h3 className="text-sm font-bold text-primary mb-3 sticky top-0 bg-background py-1">
            {grade}
          </h3>
          <div className="space-y-3">
            {byGrade.get(grade)!.map((node, i) => (
              <div
                key={i}
                className="flex gap-3 pl-3 border-l-2 border-primary/20"
              >
                <div className="flex-1 bg-surface rounded-card p-3 shadow-card">
                  <p className="text-sm font-medium text-foreground">
                    {node.event}
                  </p>
                  <p className="text-xs text-muted mt-1">{node.action}</p>
                  {node.deadline && (
                    <p className="text-xs text-accent mt-1 font-medium">
                      ⏰ 截止：{node.deadline}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
