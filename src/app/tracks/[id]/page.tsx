import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { TrackOverview } from '@/components/track/TrackOverview';
import { TrackTimeline } from '@/components/track/TrackTimeline';
import { TrackResources } from '@/components/track/TrackResources';
import { getTrackById } from '@/lib/tracks';
import { BottomNav } from '@/components/layout/BottomNav';

interface TrackPageProps {
  params: { id: string };
}

export default function TrackPage({ params }: TrackPageProps) {
  const track = getTrackById(params.id);
  if (!track) notFound();

  return (
    <>
      <PageHeader title={track.name} subtitle={track.oneLiner} />
      <div className="space-y-6 pb-4">
        <TrackOverview track={track} />
        {track.keyNodes.length > 0 && <TrackTimeline nodes={track.keyNodes} />}
        {track.resources.length > 0 && <TrackResources resources={track.resources} />}
      </div>
      <BottomNav />
    </>
  );
}
