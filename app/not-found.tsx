import type { Metadata } from 'next'
import Link from 'next/link'
import css from './page.module.css'

export const metadata: Metadata = {
  title: '404 — Сторінку не знайдено | NoteHub',
  description:
    'Вибачте, такої сторінки не існує. Перейдіть на головну сторінку NoteHub.',
  openGraph: {
    title: '404 — Сторінку не знайдено | NoteHub',
    description:
      'Вибачте, такої сторінки не існує. Перейдіть на головну сторінку NoteHub.',
    url: 'https://your-vercel-domain.vercel.app/404',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub 404',
      },
    ],
  },
}

export default function NotFound() {
  return (
    <div className={css.container}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">Go back home</Link>
    </div>
  )
}