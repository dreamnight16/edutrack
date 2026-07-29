import { ExternalLink } from 'lucide-react';
import { TagBadge } from '@/components/shared/TagBadge';
import type { ResourceEntry } from '@/types';

const COST_LABELS: Record<string, string> = {
  free: '免费',
  paid: '付费',
  freemium: '部分免费',
};

const COST_COLORS: Record<string, string> = {
  free: 'bg-enrollment/10 text-enrollment',
  paid: 'bg-sport/10 text-sport',
  freemium: 'bg-accent/10 text-accent',
};

interface ResourceCardProps {
  resource: ResourceEntry;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block bg-surface rounded-card border border-primary/10 p-4 shadow-card hover:shadow-card-hover transition-shadow"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-sm font-semibold text-foreground flex-1 mr-2">
          {resource.name}
        </h3>
        <ExternalLink size={14} className="text-muted shrink-0 mt-0.5" />
      </div>
      <p className="text-xs text-muted mb-3">{resource.description}</p>
      <div className="flex flex-wrap gap-1.5">
        <TagBadge
          label={COST_LABELS[resource.cost] ?? resource.cost}
          colorClass={COST_COLORS[resource.cost] ?? 'bg-primary/10 text-primary'}
        />
        {resource.tags.slice(0, 3).map((t) => (
          <TagBadge key={t} label={t} colorClass="bg-primary/10 text-primary" />
        ))}
      </div>
    </a>
  );
}
