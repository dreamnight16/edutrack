import { ExternalLink } from 'lucide-react';
import { TagBadge } from '@/components/shared/TagBadge';
import { COST_META, RESOURCE_TYPE_LABELS } from '@/lib/theme';
import type { TrackResource } from '@/lib/trackView';

interface TrackResourcesProps {
  resources: TrackResource[];
}

export function TrackResources({ resources }: TrackResourcesProps) {
  return (
    <section aria-labelledby="track-resources">
      <h2 id="track-resources" className="wl-kicker wl-secondary">
        配套资源 · {resources.length}
      </h2>

      <ul className="wl-list" style={{ marginTop: '1rem' }}>
        {resources.map((resource) => (
          <li key={resource.id}>
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="wl-entry dn-focus"
            >
              <span className="wl-entry__index" aria-hidden="true">
                ↗
              </span>
              <span className="wl-entry__main">
                <span className="wl-entry__title">
                  {resource.name}
                  <ExternalLink size={15} aria-hidden="true" />
                  <span className="sr-only">（在新窗口打开外部网站）</span>
                </span>
                <span className="wl-entry__desc">{resource.description}</span>
                {resource.type || resource.cost ? (
                  <span className="wl-entry__meta">
                    {resource.type ? (
                      <TagBadge label={RESOURCE_TYPE_LABELS[resource.type]} />
                    ) : null}
                    {resource.cost ? (
                      <TagBadge
                        label={COST_META[resource.cost].label}
                        mark={COST_META[resource.cost].mark}
                        markLabel="费用类型："
                      />
                    ) : null}
                    {resource.inLibrary ? <TagBadge label="已在资源库" /> : null}
                  </span>
                ) : null}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
