import Link from 'next/link';
import type { CSSProperties } from 'react';
import type { TrackCard as TrackCardData } from '@/types';
import { byGradeThenMonth, categoryMeta, fieldClass } from '@/lib/theme';

interface TrackCardProps {
  track: TrackCardData;
  /** Position in the current filter result, used for the staggered entrance. */
  index: number;
  total: number;
}

/**
 * The cell rhythm adapts to the result count so the composition stays balanced
 * and the divider-coloured grid background is never exposed as an empty block.
 */
function cellClass(index: number, total: number): string {
  if (total <= 1) return '';
  if (total === 2 || total >= 4) return 'wl-trackfield--half';
  return index === 0 ? 'wl-trackfield--featured' : 'wl-trackfield--half';
}

export function TrackCard({ track, index, total }: TrackCardProps) {
  const meta = categoryMeta(track.category);
  const first = [...track.keyNodes].sort(byGradeThenMonth)[0];

  return (
    <Link
      href={`/tracks/${track.id}`}
      className={`wl-trackfield dn-interactive dn-focus dn-rise ${fieldClass(
        meta.color
      )} ${cellClass(index, total)}`}
      style={{ '--dn-enter-index': index } as CSSProperties}
    >
      <p className="wl-kicker">
        {meta.latin} · {meta.label}
      </p>

      <div className="wl-trackfield__name">
        <h3 className="wl-h2">{track.name}</h3>
        <p style={{ marginTop: '0.5rem', maxWidth: '34ch' }}>{track.oneLiner}</p>
      </div>

      <dl className="wl-facts" style={{ marginTop: '1.25rem' }}>
        <div>
          <dt>关键节点</dt>
          <dd>{track.keyNodes.length}</dd>
        </div>
        <div>
          <dt>配套资源</dt>
          <dd>{track.resources.length}</dd>
        </div>
      </dl>

      {first ? (
        <p
          className="wl-chip"
          style={{ alignSelf: 'flex-start', marginTop: '1rem', borderColor: 'currentColor' }}
        >
          起点 {first.grade} · {first.month} 月
        </p>
      ) : null}

      <p className="wl-trackfield__more">
        查看赛道 <span aria-hidden="true">→</span>
      </p>
    </Link>
  );
}
