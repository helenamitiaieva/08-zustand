import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import { getSingleNote } from '@/lib/api';
import NotePreviewClient from './NotePreview.client';

type Props = { params: Promise<{ id: string }> };

export default async function NotePreviewPage({ params }: Props) {
  const { id } = await params;

  const qc = getQueryClient();
  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  });

  const state = dehydrate(qc);

  return (
    <HydrationBoundary state={state}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}