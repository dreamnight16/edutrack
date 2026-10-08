'use client';

import { useEffect, useRef } from 'react';
import type { GlobalTimelineNode } from '@/types';
import { getTrackById } from '@/lib/tracks';
import { gradeLabel } from '@/lib/theme';
import { STATIC_DATA_NOTE } from '@/lib/site';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface NodeDetailPanelProps {
  node: GlobalTimelineNode;
  onClose: () => void;
}

/**
 * Level 3 detail layer (DESIGN.md §6, §9).
 * The list underneath stays mounted — this only overlays it — and the caller
 * returns focus to the row that opened it.
 */
export function NodeDetailPanel({ node, onClose }: NodeDetailPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      const panel = panelRef.current;
      if (!panel) return;
      const items = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (element) => element.offsetWidth > 0 || element.offsetHeight > 0
      );
      if (items.length === 0) return;

      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && (active === first || active === headingRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <>
      <div className="wl-scrim" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="wl-drawer dn-acrylic dn-elevation-3"
        role="dialog"
        aria-modal="true"
        aria-labelledby="node-detail-title"
      >
        <p className="wl-kicker wl-secondary">
          时间节点 · {gradeLabel(node.grade)}
        </p>
        <h2
          id="node-detail-title"
          ref={headingRef}
          tabIndex={-1}
          className="wl-h2"
          style={{ marginTop: '0.75rem' }}
        >
          {node.event}
        </h2>

        <dl className="wl-defs" style={{ marginTop: '1.5rem' }}>
          <div>
            <dt>时间</dt>
            <dd className="wl-num">
              {gradeLabel(node.grade)} · {node.month} 月
            </dd>
          </div>
          {node.deadline ? (
            <div>
              <dt>标注截止</dt>
              <dd>
                <span className="wl-flag">
                  <span className="wl-mark" aria-hidden="true">
                    ⏱
                  </span>
                  截止 {node.deadline}
                </span>
              </dd>
            </div>
          ) : null}
          <div>
            <dt>要做什么</dt>
            <dd>{node.action}</dd>
          </div>
          <div>
            <dt>关联赛道</dt>
            <dd style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem' }}>
              {node.tracks.map((trackId) => (
                <span key={trackId} className="wl-chip">
                  {getTrackById(trackId)?.name ?? trackId}
                </span>
              ))}
            </dd>
          </div>
        </dl>

        <p className="wl-secondary" style={{ marginTop: '1.5rem', fontSize: '0.8125rem' }}>
          {STATIC_DATA_NOTE}
          {node.deadline ? ' 截止日期为题库中的静态标注，请以官方公告为准。' : ''}
        </p>

        <div style={{ marginTop: '1.5rem' }}>
          <button type="button" className="wl-btn dn-interactive dn-focus" onClick={onClose}>
            关闭
            <span className="sr-only">时间节点详情</span>
          </button>
        </div>
      </div>
    </>
  );
}
