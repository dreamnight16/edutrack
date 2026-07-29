'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/layout/PageHeader';
import { BottomNav } from '@/components/layout/BottomNav';
import { GradeSelector } from '@/components/timeline/GradeSelector';
import { TimelineList } from '@/components/timeline/TimelineList';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAllTimelineNodes } from '@/lib/timeline';

export default function TimelinePage() {
  const [grade, setGrade] = useState('all');
  const allNodes = getAllTimelineNodes();

  const filtered = useMemo(
    () => (grade === 'all' ? allNodes : allNodes.filter((n) => n.grade === grade)),
    [grade, allNodes]
  );

  return (
    <>
      <PageHeader
        title="时间线"
        subtitle="每个阶段该做什么，一目了然"
      />
      <GradeSelector selected={grade} onSelect={setGrade} />
      {filtered.length === 0 ? (
        <EmptyState icon="📅" title="暂无节点" description="这个阶段还没有内容" />
      ) : (
        <TimelineList nodes={filtered} />
      )}
      <BottomNav />
    </>
  );
}
