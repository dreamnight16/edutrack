import { ExternalLink } from 'lucide-react';
import { TagBadge } from '@/components/shared/TagBadge';
import type { ResourceEntry } from '@/types';
import { COST_META, RESOURCE_TYPE_LABELS } from '@/lib/theme';
import { getTrackById } from '@/lib/tracks';

interface ResourceCardProps {
  resource: ResourceEntry;
  index: number;
}

export function ResourceCard({ resource, index }: ResourceCardProps) {
  const cost = COST_META[resource.cost];

  return (
    <li>
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="wl-entry dn-focus"
      >
        <span className="wl-entry__index" aria-hidden="true">
          {String(index + 1).padStart(2, '0')}
        </span>

        <span className="wl-entry__main">
          <span className="wl-entry__title">
            {resource.name}
            <ExternalLink size={15} aria-hidden="true" />
            <span className="sr-only">（在新窗口打开外部网站）</span>
          </span>

          <span className="wl-entry__desc">{resource.description}</span>

          <span className="wl-entry__meta">
            <TagBadge label={RESOURCE_TYPE_LABELS[resource.type]} />
            <TagBadge
              label={cost.label}
              mark={cost.mark}
              markLabel="费用类型："
            />
            {resource.tracks.map((trackId) => (
              <TagBadge key={trackId} label={getTrackById(trackId)?.name ?? trackId} />
            ))}
          </span>
        </span>
      </a>
    </li>
  );
}
