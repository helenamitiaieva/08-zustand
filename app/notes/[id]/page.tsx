import type { Metadata } from 'next'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import HydrateClient from '@/components/TanStackProvider/HydrateClient'
import { getSingleNote } from '@/lib/api'
import NoteDetailsClient from './NoteDetails.client'

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  try {
    const note = await getSingleNote(id)
    const title = `${note.title} | NoteHub`
    const description =
      note.content?.slice(0, 120) || 'Перегляд нотатки у NoteHub.'

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://your-vercel-domain.vercel.app/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub note',
          },
        ],
      },
    }
  } catch {
    return {
      title: 'Note details | NoteHub',
      description: 'Перегляд нотатки у NoteHub.',
      openGraph: {
        title: 'Note details | NoteHub',
        description: 'Перегляд нотатки у NoteHub.',
        url: `https://your-vercel-domain.vercel.app/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: 'NoteHub note',
          },
        ],
      },
    }
  }
}

export default async function NoteDetailsPage({ params }: Props) {
  const { id } = await params

  const qc = new QueryClient()
  await qc.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
  })

  const state = dehydrate(qc)

  return (
    <HydrateClient state={state}>
      <NoteDetailsClient />
    </HydrateClient>
  )
}