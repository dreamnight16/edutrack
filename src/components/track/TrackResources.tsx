import type { LinkedResource } from '@/types';
import { ExternalLink } from 'lucide-react';

interface TrackResourcesProps {
  resources: LinkedResource[];
}

export function TrackResources({ resources }: TrackResourcesProps) {
  return (
    <div className="px-4 space-y-3">
      <h2 className="text-lg font-bold font-display">📚 配套资源</h2>
      {resources.map((r) => (
        <a
          key={r.id}
          href={r.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-surface rounded-card border border-primary/10 p-3 hover:shadow-card-hover transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">{r.name}</span>
            <ExternalLink size={14} className="text-muted" />
          </div>
          <p className="text-xs text-muted mt-1">{r.description}</p>
        </a>
      ))}
    </div>
  );
}
