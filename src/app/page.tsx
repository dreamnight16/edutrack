'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { TrackCard } from '@/components/home/TrackCard';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAllTracks, getTracksByCategory } from '@/lib/tracks';
import type { TrackCategory } from '@/types';

export default function HomePage() {
  const [category, setCategory] = useState<TrackCategory | 'all'>('all');
  const tracks = getTracksByCategory(category);
  const allTracks = getAllTracks();

  return (
    <>
      <PageHeader
        title="望塔"
        subtitle={`看看全国同龄人在走什么路 · ${allTracks.length} 条赛道`}
      />
      <CategoryFilter selected={category} onSelect={setCategory} />
      <div className="px-4 space-y-3">
        {tracks.length === 0 ? (
          <EmptyState
            icon="🔍"
            title="暂无赛道"
            description="这个分类下还没有内容，我们会尽快补充"
          />
        ) : (
          tracks.map((track) => <TrackCard key={track.id} track={track} />)
        )}
      </div>
      <BottomNav />
    </>
  );
}
