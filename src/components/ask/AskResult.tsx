import Link from 'next/link';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { TagBadge } from '@/components/shared/TagBadge';
import { categoryMeta } from '@/lib/theme';
import type { ResourceEntry, TrackCard as TrackCardData } from '@/types';

interface AskResultProps {
  query: string;
  /** How many records the matcher actually searched, so the scope is explicit. */
  scope: { tracks: number; resources: number };
  tracks: TrackCardData[];
  resources: ResourceEntry[];
}

export function AskResult({ query, scope, tracks, resources }: AskResultProps) {
  const hasResults = tracks.length > 0 || resources.length > 0;

  return (
    <div className="wl-pad" role="status" aria-live="polite">
      <p className="wl-secondary" style={{ fontSize: '0.875rem' }}>
        在 <span className="wl-num">{scope.tracks}</span> 条赛道和{' '}
        <span className="wl-num">{scope.resources}</span> 条资源中做本地关键词匹配：
        <strong>「{query}」</strong>
      </p>

      {!hasResults ? (
        <div style={{ marginTop: '1.5rem' }}>
          <EmptyState
            kicker="NO MATCH"
            title="没有匹配到内容"
            description="本地匹配只认识收录过的词。换成更具体的说法，或者直接去赛道页和资源库自己翻。"
            action={
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <Link href="/" className="wl-btn dn-focus">
                  浏览全部赛道 <span aria-hidden="true">→</span>
                </Link>
                <Link href="/resources" className="wl-btn dn-focus">
                  浏览资源库 <span aria-hidden="true">→</span>
                </Link>
              </div>
            }
          />
        </div>
      ) : null}

      {tracks.length > 0 ? (
        <section style={{ marginTop: '2.5rem' }} aria-labelledby="ask-tracks">
          <h2 id="ask-tracks" className="wl-kicker wl-secondary">
            相关赛道 · {tracks.length}
          </h2>
          <ul className="wl-list" style={{ marginTop: '0.75rem' }}>
            {tracks.map((track) => {
              const meta = categoryMeta(track.category);
              return (
                <li key={track.id}>
                  <Link href={`/tracks/${track.id}`} className="wl-entry dn-focus">
                    <span className="wl-entry__index" aria-hidden="true">
                      →
                    </span>
                    <span className="wl-entry__main">
                      <span className="wl-entry__title">{track.name}</span>
                      <span className="wl-entry__desc">{track.oneLiner}</span>
                      <span className="wl-entry__meta">
                        <TagBadge label={meta.label} />
                        <TagBadge label={`${track.keyNodes.length} 个关键节点`} />
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {resources.length > 0 ? (
        <section style={{ marginTop: '2.5rem' }} aria-labelledby="ask-resources">
          <h2 id="ask-resources" className="wl-kicker wl-secondary">
            相关资源 · {resources.length}
          </h2>
          <ul className="wl-list" style={{ marginTop: '0.75rem' }}>
            {resources.map((resource, index) => (
              <ResourceCard key={resource.id} resource={resource} index={index} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  );
}
