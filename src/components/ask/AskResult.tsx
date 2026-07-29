import { TrackCard } from '@/components/home/TrackCard';
import { ResourceCard } from '@/components/resources/ResourceCard';
import type { TrackCard as TrackCardType, ResourceEntry } from '@/types';
import { EmptyState } from '@/components/shared/EmptyState';

interface AskResultProps {
  query: string;
  tracks: TrackCardType[];
  resources: ResourceEntry[];
}

export function AskResult({ query, tracks, resources }: AskResultProps) {
  const hasResults = tracks.length > 0 || resources.length > 0;

  return (
    <div className="px-4 space-y-4">
      <p className="text-sm text-muted">
        关于「{query}」的结果：
      </p>
      {!hasResults && (
        <EmptyState
          icon="💬"
          title="没有精确匹配"
          description="换个方式描述你的情况试试，或者直接浏览赛道页面"
        />
      )}
      {tracks.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground mb-2">相关赛道</h3>
          <div className="space-y-2">
            {tracks.map((t) => (
              <TrackCard key={t.id} track={t} />
            ))}
          </div>
        </div>
      )}
      {resources.length > 0 && (
        <div>
          <h3 className="text-sm font-bold text-foreground mb-2">相关资源</h3>
          <div className="space-y-2">
            {resources.map((r) => (
              <ResourceCard key={r.id} resource={r} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
