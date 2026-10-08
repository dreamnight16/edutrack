'use client';

import { useMemo, useState } from 'react';
import { DataNote } from '@/components/layout/DataNote';
import { PageHeader } from '@/components/layout/PageHeader';
import { EmptyState } from '@/components/shared/EmptyState';
import { GradeSelector } from '@/components/timeline/GradeSelector';
import { TimelineList } from '@/components/timeline/TimelineList';
import { getAllTimelineNodes, getGrades } from '@/lib/timeline';

export default function TimelinePage() {
  const [grade, setGrade] = useState('all');
  const allNodes = getAllTimelineNodes();

  const counts = useMemo(() => {
    const result: Record<string, number> = { all: allNodes.length };
    for (const label of getGrades()) {
      result[label] = allNodes.filter((node) => node.grade === label).length;
    }
    return result;
  }, [allNodes]);

  const filtered = useMemo(
    () => (grade === 'all' ? allNodes : allNodes.filter((node) => node.grade === grade)),
    [grade, allNodes]
  );

  const coveredGrades = Object.entries(counts).filter(
    ([key, value]) => key !== 'all' && value > 0
  ).length;
  const trackCount = new Set(allNodes.flatMap((node) => node.tracks)).size;

  return (
    <>
      <PageHeader
        kicker="TIMELINE · 横向对齐的三年"
        title="时间线"
        lead="同一段时间里，不同赛道各自要做什么。按年级切开，看清哪些节点会撞在一起。"
        color="cyan"
        facts={[
          { label: '节点', value: String(allNodes.length) },
          { label: '覆盖年级', value: `${coveredGrades} / ${getGrades().length}` },
          { label: '关联赛道', value: String(trackCount) },
        ]}
      />

      <section className="wl-band" aria-labelledby="timeline-heading">
        <div className="wl-pad">
          <h2 id="timeline-heading" className="wl-kicker wl-secondary">
            按年级筛选
          </h2>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <GradeSelector selected={grade} onSelect={setGrade} counts={counts} />
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          {filtered.length === 0 ? (
            <EmptyState
              kicker="EMPTY"
              title="这个阶段还没有节点"
              description="时间线按年级逐段整理，目前只覆盖了其中的一部分。切回「全部」可以看到已经收录的节点。"
              action={
                <button type="button" className="wl-btn dn-focus" onClick={() => setGrade('all')}>
                  查看全部节点 <span aria-hidden="true">→</span>
                </button>
              }
            />
          ) : (
            <TimelineList nodes={filtered} />
          )}
        </div>
      </section>

      <DataNote
        detail={`本页共 ${allNodes.length} 个节点，来自 src/data/timeline/index.json；节点上的赛道标签来自各节点的 tracks 字段。`}
      />
    </>
  );
}
