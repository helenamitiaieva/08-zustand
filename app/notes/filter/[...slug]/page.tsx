import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient } from '@/lib/getQueryClient';
import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';

type Props = {
  searchParams: Record<string, string | string[] | undefined>;
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ searchParams, params }: Props)  {

  const { slug } = await params;

  const tag = slug?.[0] === 'all' ? undefined : slug?.[0];

  const page = Number(searchParams.page ?? 1);
  const search = (searchParams.search as string) ?? '';
  const perPage = 12;

  const qc = getQueryClient();
  await qc.prefetchQuery({
    queryKey: ['notes', search, page, tag ?? ''],
    queryFn: () => getNotes({ page, perPage, search, tag }),
  });

  const state = dehydrate(qc);

  return (
    <HydrationBoundary state={state}>
      <NotesClient 
      initialPage={page} 
      perPage={perPage} 
      initialSearch={search} 
      tag={tag}
      />
    </HydrationBoundary>
  );
}