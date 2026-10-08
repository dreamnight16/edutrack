'use client';

import { useCallback, useRef, useState } from 'react';
import type { GlobalTimelineNode } from '@/types';
import { getTrackById } from '@/lib/tracks';
import { gradeLabel, gradeRank } from '@/lib/theme';
import { NodeDetailPanel } from './NodeDetailPanel';

interface TimelineListProps {
  nodes: GlobalTimelineNode[];
}

interface GradeGroup {
  grade: string;
  nodes: GlobalTimelineNode[];
}

function groupByGrade(nodes: GlobalTimelineNode[]): GradeGroup[] {
  const groups = new Map<string, GlobalTimelineNode[]>();
  for (const node of nodes) {
    const bucket = groups.get(node.grade);
    if (bucket) bucket.push(node);
    else groups.set(node.grade, [node]);
  }

  return Array.from(groups.entries())
    .sort((a, b) => gradeRank(a[0]) - gradeRank(b[0]))
    .map(([grade, bucket]) => ({
      grade,
      nodes: [...bucket].sort((a, b) => a.month - b.month),
    }));
}

export function TimelineList({ nodes }: TimelineListProps) {
  const [active, setActive] = useState<GlobalTimelineNode | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((node: GlobalTimelineNode, trigger: HTMLElement) => {
    triggerRef.current = trigger;
    setActive(node);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    const trigger = triggerRef.current;
    if (trigger) requestAnimationFrame(() => trigger.focus());
  }, []);

  return (
    <>
      {groupByGrade(nodes).map((group) => (
        <section className="wl-rail wl-pad" key={group.grade} aria-label={gradeLabel(group.grade)}>
          <header className="wl-rail__head">
            <h2 className="wl-h2">{group.grade}</h2>
            <p className="wl-secondary" style={{ fontSize: '0.8125rem', marginTop: '0.375rem' }}>
              {group.nodes.length} 个节点
            </p>
          </header>

          <ol className="wl-rail__list">
            {group.nodes.map((node) => (
              <li key={`${node.grade}-${node.month}-${node.event}`}>
                <button
                  type="button"
                  className="wl-node dn-focus"
                  onClick={(event) => open(node, event.currentTarget)}
                >
                  <span className="wl-node__month">
                    {node.month}
                    <span>月</span>
                  </span>

                  <span className="wl-node__body">
                    <span className="wl-node__event">{node.event}</span>
                    <span className="wl-node__action">{node.action}</span>
                    <span className="wl-node__meta">
                      {node.tracks.map((trackId) => (
                        <span className="wl-chip" key={trackId}>
                          {getTrackById(trackId)?.name ?? trackId}
                        </span>
                      ))}
                      {node.deadline ? (
                        <span className="wl-flag">
                          <span className="wl-mark" aria-hidden="true">
                            ⏱
                          </span>
                          截止 {node.deadline}
                        </span>
                      ) : null}
                    </span>
                  </span>

                  <span className="wl-node__open">
                    展开详情 <span aria-hidden="true">→</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </section>
      ))}

      {active ? <NodeDetailPanel node={active} onClose={close} /> : null}
    </>
  );
}
