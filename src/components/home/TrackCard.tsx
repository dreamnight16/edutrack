import Link from 'next/link';
import { TagBadge } from '@/components/shared/TagBadge';
import type { TrackCard as TrackCardType } from '@/types';

const CATEGORY_COLORS: Record<string, string> = {
  competition: 'bg-competition/10 text-competition',
  enrollment: 'bg-enrollment/10 text-enrollment',
  art: 'bg-art/10 text-art',
  sport: 'bg-sport/10 text-sport',
  overseas: 'bg-overseas/10 text-overseas',
  vocational: 'bg-vocational/10 text-vocational',
};

const CATEGORY_LABELS: Record<string, string> = {
  competition: '竞赛',
  enrollment: '升学',
  art: '艺考',
  sport: '体育',
  overseas: '出国',
  vocational: '职教',
};

interface TrackCardProps {
  track: TrackCardType;
}

export function TrackCard({ track }: TrackCardProps) {
  const catColor = CATEGORY_COLORS[track.category] ?? 'bg-primary/10 text-primary';

  return (
    <Link href={`/tracks/${track.id}`}>
      <article className="bg-surface rounded-card shadow-card hover:shadow-card-hover transition-shadow p-4 border border-primary/5">
        <div className="flex items-center gap-2 mb-2">
          <TagBadge
            label={CATEGORY_LABELS[track.category] ?? track.category}
            colorClass={catColor}
          />
        </div>
        <h3 className="text-lg font-bold font-display text-foreground mb-1">
          {track.name}
        </h3>
        <p className="text-sm text-muted mb-3">{track.oneLiner}</p>
        <div className="flex flex-wrap gap-1.5">
          {track.suitableFor.slice(0, 3).map((s) => (
            <TagBadge key={s} label={s} colorClass="bg-accent/10 text-accent" />
          ))}
        </div>
      </article>
    </Link>
  );
}
