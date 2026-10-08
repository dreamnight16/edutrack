import type { TrackCard } from '@/types';
import { fieldClass } from '@/lib/theme';

interface TrackFitProps {
  track: TrackCard;
}

/**
 * "Suitable for" and "not suitable for" are shown as two opposing solid fields.
 * The heading text and the leading glyph carry the meaning; the colour only
 * reinforces it.
 */
export function TrackFit({ track }: TrackFitProps) {
  return (
    <div
      className="grid gap-[2px] md:grid-cols-2"
      style={{ background: 'var(--dn-divider)' }}
    >
      <section className={fieldClass('emerald')} style={{ padding: '1.75rem' }}>
        <h2 className="wl-kicker">
          <span className="wl-mark" aria-hidden="true">
            ✓
          </span>{' '}
          适合你，如果
        </h2>
        <ul style={{ margin: '1.25rem 0 0', padding: 0, listStyle: 'none' }}>
          {track.suitableFor.map((item) => (
            <li
              key={item}
              style={{ display: 'flex', gap: '0.625rem', padding: '0.5rem 0', fontSize: '0.9375rem' }}
            >
              <span className="wl-mark" aria-hidden="true">
                ＋
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className={fieldClass('crimson')} style={{ padding: '1.75rem' }}>
        <h2 className="wl-kicker">
          <span className="wl-mark" aria-hidden="true">
            ✕
          </span>{' '}
          不适合你，如果
        </h2>
        <ul style={{ margin: '1.25rem 0 0', padding: 0, listStyle: 'none' }}>
          {track.notSuitableFor.map((item) => (
            <li
              key={item}
              style={{ display: 'flex', gap: '0.625rem', padding: '0.5rem 0', fontSize: '0.9375rem' }}
            >
              <span className="wl-mark" aria-hidden="true">
                －
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
