import type { TrackCard } from '@/types';
import { TagBadge } from '@/components/shared/TagBadge';

interface TrackOverviewProps {
  track: TrackCard;
}

export function TrackOverview({ track }: TrackOverviewProps) {
  return (
    <div className="px-4 space-y-4">
      <section>
        <h2 className="text-lg font-bold font-display mb-2">📖 这是什么路</h2>
        <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
          {track.overview}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold font-display mb-2">✅ 适合你，如果</h2>
        <div className="flex flex-wrap gap-2">
          {track.suitableFor.map((s) => (
            <TagBadge key={s} label={s} colorClass="bg-enrollment/10 text-enrollment" />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold font-display mb-2">❌ 不适合你，如果</h2>
        <div className="flex flex-wrap gap-2">
          {track.notSuitableFor.map((s) => (
            <TagBadge key={s} label={s} colorClass="bg-sport/10 text-sport" />
          ))}
        </div>
      </section>
    </div>
  );
}
