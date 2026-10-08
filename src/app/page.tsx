'use client';

import { useMemo, useState } from 'react';
import { CategoryFilter, type CategorySelection } from '@/components/home/CategoryFilter';
import { TrackCard } from '@/components/home/TrackCard';
import { DataNote } from '@/components/layout/DataNote';
import { EmptyState } from '@/components/shared/EmptyState';
import { getAllResources } from '@/lib/resources';
import { getAllTimelineNodes } from '@/lib/timeline';
import { CATEGORY_META, CATEGORY_ORDER, fieldClass } from '@/lib/theme';
import { getAllTracks, getTracksByCategory } from '@/lib/tracks';
import { SITE } from '@/lib/site';

export default function HomePage() {
  const [category, setCategory] = useState<CategorySelection>('all');

  const allTracks = getAllTracks();
  const tracks = getTracksByCategory(category);
  const nodes = getAllTimelineNodes();
  const resources = getAllResources();

  const counts = useMemo(() => {
    const result = { all: allTracks.length } as Record<CategorySelection, number>;
    for (const id of CATEGORY_ORDER) {
      result[id] = getTracksByCategory(id).length;
    }
    return result;
  }, [allTracks]);

  const covered = CATEGORY_ORDER.filter((id) => counts[id] > 0);
  const pending = CATEGORY_ORDER.filter((id) => counts[id] === 0);

  return (
    <>
      <header className={fieldClass('teal')}>
        <div className="wl-hero">
          <p className="wl-kicker">
            {SITE.latinName} · 升学赛道图鉴
          </p>
          <h1 className="wl-display" style={{ marginTop: '1rem' }}>
            看见同龄人的路
          </h1>
          <p className="wl-lead" style={{ marginTop: '1.5rem' }}>
            高考不是唯一的出路。竞赛、强基、综合评价各有自己的时间节点、资源需求和风险回报。
            这里把每条路摊开给你看——不替你判断，只帮你看到全貌。
          </p>

          <dl className="wl-facts" style={{ marginTop: '2.5rem' }}>
            <div>
              <dt>赛道</dt>
              <dd>{allTracks.length}</dd>
            </div>
            <div>
              <dt>时间节点</dt>
              <dd>{nodes.length}</dd>
            </div>
            <div>
              <dt>资源</dt>
              <dd>{resources.length}</dd>
            </div>
            <div>
              <dt>分类覆盖</dt>
              <dd>
                {covered.length}
                <span style={{ fontSize: '1rem' }}> / {CATEGORY_ORDER.length}</span>
              </dd>
            </div>
          </dl>

          <p style={{ marginTop: '1.75rem', fontSize: '0.875rem', maxWidth: '52ch' }}>
            已收录：{covered.map((id) => CATEGORY_META[id].label).join('、')}。
            {pending.length > 0
              ? `${pending.map((id) => CATEGORY_META[id].label).join('、')}分类下还没有内容，正在补充。`
              : ''}
          </p>
        </div>
      </header>

      <section className="wl-band" aria-labelledby="tracks-heading">
        <div className="wl-pad">
          <h2 id="tracks-heading" className="wl-kicker wl-secondary">
            收录的赛道
          </h2>
        </div>

        <div style={{ marginTop: '1rem' }}>
          <CategoryFilter selected={category} onSelect={setCategory} counts={counts} />
        </div>

        <div className="wl-pad" style={{ marginTop: '1rem' }}>
          {tracks.length === 0 ? (
            <EmptyState
              kicker="EMPTY"
              title="这个分类下还没有赛道"
              description="我们按赛道类型逐条整理，目前只覆盖了其中的一部分。切回「全部」可以看到已经收录的内容。"
              action={
                <button
                  type="button"
                  className="wl-btn dn-focus"
                  onClick={() => setCategory('all')}
                >
                  查看全部赛道 <span aria-hidden="true">→</span>
                </button>
              }
            />
          ) : (
            <div className="wl-trackgrid">
              {tracks.map((track, index) => (
                <TrackCard
                  key={track.id}
                  track={track}
                  index={index}
                  total={tracks.length}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <DataNote
        detail={`本页数字分别统计自 src/data/tracks（${allTracks.length} 条赛道）与 src/data/timeline。`}
      />
    </>
  );
}
