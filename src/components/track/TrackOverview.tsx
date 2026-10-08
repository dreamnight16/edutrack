import type { TrackCard } from '@/types';

interface TrackOverviewProps {
  track: TrackCard;
}

/**
 * The overview text ships with inline **emphasis** markers. They are rendered as
 * emphasis rather than leaked as literal asterisks, and the paragraph breaks in
 * the source string are preserved.
 */
function withEmphasis(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return <span key={index}>{part}</span>;
  });
}

export function TrackOverview({ track }: TrackOverviewProps) {
  return (
    <section aria-labelledby="track-overview">
      <h2 id="track-overview" className="wl-kicker wl-secondary">
        这是什么路
      </h2>
      <div className="wl-prose wl-measure" style={{ marginTop: '1rem' }}>
        {withEmphasis(track.overview)}
      </div>
    </section>
  );
}
