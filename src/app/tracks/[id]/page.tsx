import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BackLink } from '@/components/layout/BackLink';
import { DataNote } from '@/components/layout/DataNote';
import { TrackFit } from '@/components/track/TrackFit';
import { TrackOverview } from '@/components/track/TrackOverview';
import { TrackRelatedTimeline } from '@/components/track/TrackRelatedTimeline';
import { TrackResources } from '@/components/track/TrackResources';
import { TrackTimeline } from '@/components/track/TrackTimeline';
import { categoryMeta, fieldClass } from '@/lib/theme';
import { buildTrackResources, getTrackTimelineNodes } from '@/lib/trackView';
import { getTrackById } from '@/lib/tracks';

interface TrackPageProps {
  params: { id: string };
}

export function generateMetadata({ params }: TrackPageProps): Metadata {
  const track = getTrackById(params.id);
  if (!track) return { title: '赛道不存在' };
  return { title: track.name, description: track.oneLiner };
}

export default function TrackPage({ params }: TrackPageProps) {
  const track = getTrackById(params.id);
  if (!track) notFound();

  const meta = categoryMeta(track.category);
  const resources = buildTrackResources(track);
  const relatedNodes = getTrackTimelineNodes(track.id);

  return (
    <>
      <header className={fieldClass(meta.color)}>
        <div className="wl-masthead">
          <BackLink href="/" label="全部赛道" />

          <p className="wl-kicker" style={{ marginTop: '1.75rem' }}>
            {meta.latin} · {meta.label}
          </p>

          <h1 className="wl-h1" style={{ marginTop: '0.75rem' }}>
            {track.name}
          </h1>

          <p className="wl-lead" style={{ marginTop: '1rem' }}>
            {track.oneLiner}
          </p>

          <dl className="wl-facts" style={{ marginTop: '2rem' }}>
            <div>
              <dt>关键节点</dt>
              <dd>{track.keyNodes.length}</dd>
            </div>
            <div>
              <dt>配套资源</dt>
              <dd>{resources.length}</dd>
            </div>
            <div>
              <dt>共享时间线节点</dt>
              <dd>{relatedNodes.length}</dd>
            </div>
          </dl>
        </div>
      </header>

      <section className="wl-band wl-pad">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <TrackOverview track={track} />
          </div>
          <div className="md:col-span-5">
            <TrackTimeline nodes={track.keyNodes} />
          </div>
        </div>
      </section>

      <div className="wl-pad">
        <TrackFit track={track} />
      </div>

      <section className="wl-band wl-pad">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <TrackResources resources={resources} />
          </div>
          <div className="md:col-span-5">
            <TrackRelatedTimeline nodes={relatedNodes} />
          </div>
        </div>
      </section>

      <DataNote
        detail={`赛道内容来自 src/data/tracks/${track.id}.json；带「已在资源库」标记的条目同时收录于 src/data/resources/index.json。`}
      />
    </>
  );
}
