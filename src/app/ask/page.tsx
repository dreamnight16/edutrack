'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { AskInput } from '@/components/ask/AskInput';
import { AskResult } from '@/components/ask/AskResult';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAllTracks } from '@/lib/tracks';
import { filterResources } from '@/lib/resources';

export default function AskPage() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const allTracks = getAllTracks();

  const handleSubmit = async (q: string) => {
    setQuery(q);
    setSubmitted(true);
    setLoading(true);
    // Simulate AI search delay
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
  };

  const matchTracks = useMemo(() => {
    if (!query) return [];
    const q = query.toLowerCase();
    return allTracks.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.oneLiner.toLowerCase().includes(q) ||
        t.suitableFor.some((s) => s.toLowerCase().includes(q)) ||
        t.overview.toLowerCase().includes(q)
    );
  }, [query, allTracks]);

  const matchResources = useMemo(() => {
    if (!query) return [];
    return filterResources({ search: query });
  }, [query]);

  return (
    <>
      <PageHeader
        title="AI 问问"
        subtitle="说说你的情况，帮你找到适合的赛道和资源"
      />
      <div className="space-y-4 pb-4">
        <AskInput onSubmit={handleSubmit} loading={loading} />
        {!submitted && (
          <EmptyState
            icon="💬"
            title="不知道怎么问？"
            description="试试：'我想走竞赛' 或 '河南理科生有什么升学途径'"
          />
        )}
        {submitted && !loading && (
          <AskResult query={query} tracks={matchTracks} resources={matchResources} />
        )}
      </div>
      <BottomNav />
    </>
  );
}
