import type { Metadata } from 'next'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/lib/getQueryClient'
import { getNotes } from '@/lib/api'
import NotesClient from './Notes.client'

type Props = {
  searchParams: Record<string, string | string[] | undefined>
  params: Promise<{ slug: string[] }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const rawTag = slug?.[0] ?? 'all'
  const tag = rawTag === 'all' ? 'All notes' : rawTag
  const title = `Notes — ${tag} | NoteHub`
  const description =
    rawTag === 'all'
      ? 'Список усіх нотаток у NoteHub. Пошук, пагінація та створення.'
      : `Список нотаток з тегом ${tag} у NoteHub. Пошук, пагінація та створення.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://your-vercel-domain.vercel.app/notes/filter/${rawTag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: 'NoteHub notes',
        },
      ],
    },
  }
}

export default async function NotesPage({ searchParams, params }: Props) {
  const { slug } = await params
  const tagParam = slug?.[0] === 'all' ? undefined : slug?.[0]

  const page = Number(searchParams.page ?? 1)
  const search = (searchParams.search as string) ?? ''
  const perPage = 12

  const qc = getQueryClient()
  await qc.prefetchQuery({
    queryKey: ['notes', search, page, tagParam ?? ''],
    queryFn: () => getNotes({ page, perPage, search, tag: tagParam }),
  })

  const state = dehydrate(qc)

  return (
    <HydrationBoundary state={state}>
      <NotesClient
        initialPage={page}
        perPage={perPage}
        initialSearch={search}
        tag={tagParam}
      />
    </HydrationBoundary>
  )
}