import { STATIC_DATA_NOTE } from '@/lib/site';

interface DataNoteProps {
  /** What this page's numbers were counted from. */
  detail?: string;
}

/**
 * Every figure in this product comes from JSON committed to the repository.
 * This bar states that plainly instead of implying live data.
 */
export function DataNote({ detail }: DataNoteProps) {
  return (
    <aside className="wl-pad" aria-label="数据说明">
      <div className="wl-rule" />
      <p className="wl-secondary" style={{ fontSize: '0.8125rem', padding: '0.875rem 0' }}>
        <span className="wl-mark" aria-hidden="true">
          §
        </span>{' '}
        {STATIC_DATA_NOTE}
        {detail ? ` ${detail}` : ''}
      </p>
    </aside>
  );
}
