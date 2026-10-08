'use client';

import { useMemo, useState } from 'react';
import { AskInput } from '@/components/ask/AskInput';
import { AskResult } from '@/components/ask/AskResult';
import { DataNote } from '@/components/layout/DataNote';
import { PageHeader } from '@/components/layout/PageHeader';
import { getAllResources } from '@/lib/resources';
import { getAllTracks } from '@/lib/tracks';
import { matchResources, matchTracks } from '@/lib/ask';

const EXAMPLES = ['我想走竞赛', '河南理科生有什么升学途径', '有没有免费的资料'];

export default function AskPage() {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const allTracks = getAllTracks();
  const allResources = getAllResources();

  const handleSubmit = (nextQuery: string) => {
    setQuery(nextQuery);
    setSubmitted(true);
  };

  const matchedTracks = useMemo(
    () => (query ? matchTracks(query, allTracks) : []),
    [query, allTracks]
  );

  const matchedResources = useMemo(
    () => (query ? matchResources(query, allResources) : []),
    [query, allResources]
  );

  const scope = { tracks: allTracks.length, resources: allResources.length };

  return (
    <>
      <PageHeader
        kicker="LOOKUP · 本地关键词匹配"
        title="快速查找"
        lead="用一句话描述你的情况，看看已经收录的赛道和资源里有没有对得上的。没有模型，没有网络请求。"
        color="violet"
        facts={[
          { label: '可比对的赛道', value: String(scope.tracks) },
          { label: '可比对的资源', value: String(scope.resources) },
        ]}
      >
        <div style={{ marginTop: '2.5rem' }}>
          <AskInput onSubmit={handleSubmit} loading={false} />
        </div>
      </PageHeader>

      <section className="wl-band" aria-labelledby="ask-heading">
        <h2 id="ask-heading" className="sr-only">
          查找结果
        </h2>

        <div className="wl-pad">
          <p className="wl-kicker wl-secondary">试试这样问</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.75rem' }}>
            {EXAMPLES.map((example) => (
              <button
                key={example}
                type="button"
                className="wl-btn dn-focus"
                style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                onClick={() => handleSubmit(example)}
              >
                {example}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          {submitted ? (
            <AskResult
              query={query}
              scope={scope}
              tracks={matchedTracks}
              resources={matchedResources}
            />
          ) : (
            <div className="wl-pad">
              <div className="wl-rule" />
              <p className="wl-secondary" style={{ padding: '1.25rem 0', fontSize: '0.875rem' }}>
                还没有提交问题。匹配范围是 src/data 里已经收录的 {scope.tracks} 条赛道和{' '}
                {scope.resources} 条资源——匹配不到，只说明这里还没有对应内容，不代表这条路不存在。
              </p>
            </div>
          )}
        </div>
      </section>

      <DataNote
        detail={`匹配逻辑见 src/lib/ask.ts：先做关键词命中，再按命中位置排序，全程在浏览器本地完成。`}
      />
    </>
  );
}
