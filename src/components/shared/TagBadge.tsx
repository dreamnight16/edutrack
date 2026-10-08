interface TagBadgeProps {
  label: string;
  /** Leading glyph so meaning is never carried by colour alone. */
  mark?: string;
  /** Prefix the glyph for screen readers when it is not self-explanatory. */
  markLabel?: string;
}

/**
 * A square, hairline-bounded label. Inside a colour field it inherits
 * --dn-text-on-color; on canvas/surface it uses the secondary text token.
 */
export function TagBadge({ label, mark, markLabel }: TagBadgeProps) {
  return (
    <span className="wl-chip">
      {mark ? (
        <span className="wl-mark" aria-hidden="true">
          {mark}
        </span>
      ) : null}
      {markLabel ? <span className="sr-only">{markLabel}</span> : null}
      {label}
    </span>
  );
}
