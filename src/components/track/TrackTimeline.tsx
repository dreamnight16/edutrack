import type { TimelineNode } from '@/types';
import { byGradeThenMonth, gradeLabel, gradeRank } from '@/lib/theme';

interface TrackTimelineProps {
  nodes: TimelineNode[];
}

export function TrackTimeline({ nodes }: TrackTimelineProps) {
  const groups = new Map<string, TimelineNode[]>();
  for (const node of [...nodes].sort(byGradeThenMonth)) {
    const bucket = groups.get(node.grade);
    if (bucket) bucket.push(node);
    else groups.set(node.grade, [node]);
  }

  const ordered = Array.from(groups.entries()).sort(
    (a, b) => gradeRank(a[0]) - gradeRank(b[0])
  );

  return (
    <section aria-labelledby="track-nodes">
      <h2 id="track-nodes" className="wl-kicker wl-secondary">
        关键时间节点 · {nodes.length}
      </h2>

      {ordered.map(([grade, gradeNodes]) => (
        <div key={grade} style={{ marginTop: '1.5rem' }}>
          <h3 className="wl-h3">{gradeLabel(grade)}</h3>
          <ol className="wl-rail__list" style={{ marginTop: '0.75rem' }}>
            {gradeNodes.map((node) => (
              <li key={`${node.month}-${node.event}`}>
                <div className="wl-node wl-node--static">
                  <span className="wl-node__month">
                    {node.month}
                    <span>月</span>
                  </span>
                  <span className="wl-node__body">
                    <span className="wl-node__event">{node.event}</span>
                    <span className="wl-node__action">{node.action}</span>
                    {node.deadline ? (
                      <span className="wl-node__meta">
                        <span className="wl-flag">
                          <span className="wl-mark" aria-hidden="true">
                            ⏱
                          </span>
                          截止 {node.deadline}
                        </span>
                      </span>
                    ) : null}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </section>
  );
}
