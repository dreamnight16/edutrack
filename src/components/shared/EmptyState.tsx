interface EmptyStateProps {
  kicker: string;
  title: string;
  description: string;
  /** Optional next step, e.g. a link back to a broader list. */
  action?: React.ReactNode;
}

export function EmptyState({ kicker, title, description, action }: EmptyStateProps) {
  return (
    <div className="wl-pad">
      <div
        className="wl-band"
        style={{ borderTop: 'var(--wl-rule)', borderBottom: 'var(--wl-rule)' }}
      >
        <p className="wl-kicker wl-secondary">{kicker}</p>
        <p className="wl-h2" style={{ marginTop: '0.75rem' }}>
          {title}
        </p>
        <p className="wl-secondary wl-measure" style={{ marginTop: '0.75rem' }}>
          {description}
        </p>
        {action ? <div style={{ marginTop: '1.5rem' }}>{action}</div> : null}
      </div>
    </div>
  );
}
