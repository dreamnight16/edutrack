import type { TimelineNode } from '@/types';

interface TrackTimelineProps {
  nodes: TimelineNode[];
}

export function TrackTimeline({ nodes }: TrackTimelineProps) {
  const byGrade = new Map<string, TimelineNode[]>();
  for (const node of nodes) {
    const existing = byGrade.get(node.grade) ?? [];
    existing.push(node);
    byGrade.set(node.grade, existing);
  }

  return (
    <div className="px-4 space-y-4">
      <h2 className="text-lg font-bold font-display">📅 关键时间节点</h2>
      {Array.from(byGrade.entries()).map(([grade, gradeNodes]) => (
        <div key={grade}>
          <h3 className="text-sm font-semibold text-primary mb-2">{grade}</h3>
          <div className="space-y-2">
            {gradeNodes.map((node, i) => (
              <div
                key={i}
                className="flex gap-3 pl-3 border-l-2 border-primary/20"
              >
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{node.event}</p>
                  <p className="text-xs text-muted mt-0.5">{node.action}</p>
                  {node.deadline && (
                    <p className="text-xs text-accent mt-0.5 font-medium">⏰ {node.deadline}</p>
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
