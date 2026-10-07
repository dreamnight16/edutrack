'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { AskInput } from '@/components/ask/AskInput';
import { AskResult } from '@/components/ask/AskResult';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAllTracks } from '@/lib/tracks';
import { getAllResources } from '@/lib/resources';
import { matchResources, matchTracks } from '@/lib/ask';

export default function AskPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const allTracks = getAllTracks();
  const allResources = getAllResources();

  const handleSubmit = (q: string) => {
    setQuery(q);
    setSubmitted(true);
  };

  const matchedTracks = useMemo(() => {
    if (!query) return [];
    return matchTracks(query, allTracks);
  }, [query, allTracks]);

  const matchedResources = useMemo(() => {
    if (!query) return [];
    return matchResources(query, allResources);
  }, [query, allResources]);

  return (
    <>
      <PageHeader
        title="快速查找"
        subtitle="输入关键词，匹配本地赛道和资源；不需要网络或模型"
      />
      <div className="space-y-4 pb-4">
        <AskInput onSubmit={handleSubmit} loading={false} />
        {!submitted && (
          <EmptyState
            icon="💬"
            title="不知道怎么问？"
            description="试试：'我想走竞赛' 或 '河南理科生有什么升学途径'"
          />
        )}
        {submitted && (
          <AskResult query={query} tracks={matchedTracks} resources={matchedResources} />
        )}
      </div>
      <BottomNav />
    </>
  );
}
