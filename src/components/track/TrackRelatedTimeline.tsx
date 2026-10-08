import Link from 'next/link';
import type { GlobalTimelineNode } from '@/types';
import { byGradeThenMonth, gradeLabel } from '@/lib/theme';

interface TrackRelatedTimelineProps {
  nodes: GlobalTimelineNode[];
}

/**
 * The shared timeline is not a separate silo: this track's slice of it is shown
 * here with a link back to the full timeline.
 */
export function TrackRelatedTimeline({ nodes }: TrackRelatedTimelineProps) {
  if (nodes.length === 0) return null;
  const sorted = [...nodes].sort(byGradeThenMonth);

  return (
    <section aria-labelledby="track-related">
      <h2 id="track-related" className="wl-kicker wl-secondary">
        共享时间线上属于这条路 · {sorted.length}
      </h2>

      <ul className="wl-list" style={{ marginTop: '1rem' }}>
        {sorted.map((node) => (
          <li key={`${node.grade}-${node.month}-${node.event}`}>
            <div style={{ padding: '0.875rem 0' }}>
              <p className="wl-secondary wl-num" style={{ fontSize: '0.75rem' }}>
                {gradeLabel(node.grade)} · {node.month} 月
              </p>
              <p style={{ marginTop: '0.375rem', fontWeight: 600 }}>{node.event}</p>
              <p className="wl-secondary" style={{ marginTop: '0.25rem', fontSize: '0.875rem' }}>
                {node.action}
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p style={{ marginTop: '1rem' }}>
        <Link href="/timeline" className="wl-link dn-focus" style={{ fontSize: '0.875rem' }}>
          在完整时间线上看这三年的排布 <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}
