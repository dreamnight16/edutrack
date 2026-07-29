'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { ResourceSearch } from '@/components/resources/ResourceSearch';
import { ResourceFilter } from '@/components/resources/ResourceFilter';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { EmptyState } from '@/components/shared/EmptyState';
import { filterResources } from '@/lib/resources';
import type { ResourceType, ResourceCost } from '@/types';

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ResourceType | 'all'>('all');
  const [cost, setCost] = useState<ResourceCost | 'all'>('all');

  const results = useMemo(
    () =>
      filterResources({
        search: search || undefined,
        type: type === 'all' ? undefined : type,
        cost: cost === 'all' ? undefined : cost,
      }),
    [search, type, cost]
  );

  return (
    <>
      <PageHeader title="资源库" subtitle="同龄人在用这些资源" />
      <div className="space-y-3 pb-4">
        <ResourceSearch value={search} onChange={setSearch} />
        <ResourceFilter
          type={type}
          cost={cost}
          onTypeChange={setType}
          onCostChange={setCost}
        />
        <div className="px-4 space-y-3">
          {results.length === 0 ? (
            <EmptyState icon="📚" title="没有找到" description="试试换个搜索词或筛选条件" />
          ) : (
            results.map((r) => <ResourceCard key={r.id} resource={r} />)
          )}
        </div>
      </div>
      <BottomNav />
    </>
  );
}
