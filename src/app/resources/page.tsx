'use client';

import { useMemo, useState } from 'react';
import { DataNote } from '@/components/layout/DataNote';
import { PageHeader } from '@/components/layout/PageHeader';
import { ResourceCard } from '@/components/resources/ResourceCard';
import { ResourceFilter } from '@/components/resources/ResourceFilter';
import { ResourceSearch } from '@/components/resources/ResourceSearch';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAllResources, filterResources } from '@/lib/resources';
import { COST_ORDER, RESOURCE_TYPE_ORDER } from '@/lib/theme';
import type { ResourceCost, ResourceType } from '@/types';

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<ResourceType | 'all'>('all');
  const [cost, setCost] = useState<ResourceCost | 'all'>('all');

  const allResources = getAllResources();

  const results = useMemo(
    () =>
      filterResources({
        search: search || undefined,
        type: type === 'all' ? undefined : type,
        cost: cost === 'all' ? undefined : cost,
      }),
    [search, type, cost]
  );

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allResources.length };
    for (const id of RESOURCE_TYPE_ORDER) {
      counts[id] = allResources.filter((entry) => entry.type === id).length;
    }
    return counts;
  }, [allResources]);

  const costCounts = useMemo(() => {
    const counts: Record<string, number> = { all: allResources.length };
    for (const id of COST_ORDER) {
      counts[id] = allResources.filter((entry) => entry.cost === id).length;
    }
    return counts;
  }, [allResources]);

  const typesInUse = RESOURCE_TYPE_ORDER.filter((id) => typeCounts[id] > 0).length;
  const tracksCovered = new Set(allResources.flatMap((entry) => entry.tracks)).size;

  const resetFilters = () => {
    setSearch('');
    setType('all');
    setCost('all');
  };

  return (
    <>
      <PageHeader
        kicker="RESOURCES · 同龄人在用的东西"
        title="资源库"
        lead="题解社区、官方入口、系统课程。每一条都标出类型、费用和它服务哪条赛道。"
        color="emerald"
        facts={[
          { label: '收录', value: String(allResources.length) },
          { label: '完全免费', value: String(costCounts.free ?? 0) },
          { label: '资源类型', value: `${typesInUse} / ${RESOURCE_TYPE_ORDER.length}` },
          { label: '覆盖赛道', value: String(tracksCovered) },
        ]}
      />

      <section className="wl-band wl-pad" aria-labelledby="library-heading">
        <h2 id="library-heading" className="wl-kicker wl-secondary">
          筛选与搜索
        </h2>

        <div className="grid gap-8 md:grid-cols-12" style={{ marginTop: '1.5rem' }}>
          <div className="md:col-span-4">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <ResourceSearch value={search} onChange={setSearch} />
              <ResourceFilter
                type={type}
                cost={cost}
                onTypeChange={setType}
                onCostChange={setCost}
                typeCounts={typeCounts}
                costCounts={costCounts}
              />
            </div>
          </div>

          <div className="md:col-span-8">
            <p className="wl-secondary" style={{ fontSize: '0.875rem' }}>
              匹配到 <strong className="wl-num">{results.length}</strong> 条，共{' '}
              <span className="wl-num">{allResources.length}</span> 条。
            </p>

            <div style={{ marginTop: '1rem' }}>
              {results.length === 0 ? (
                <EmptyState
                  kicker="EMPTY"
                  title="没有匹配的资源"
                  description="换个关键词，或者放宽类型与费用条件。资源库目前只收录了三条赛道相关的条目。"
                  action={
                    <button type="button" className="wl-btn dn-focus" onClick={resetFilters}>
                      清空筛选条件 <span aria-hidden="true">→</span>
                    </button>
                  }
                />
              ) : (
                <ul className="wl-list">
                  {results.map((resource, index) => (
                    <ResourceCard key={resource.id} resource={resource} index={index} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      <DataNote
        detail={`本页共 ${allResources.length} 条，来自 src/data/resources/index.json。`}
      />
    </>
  );
}
