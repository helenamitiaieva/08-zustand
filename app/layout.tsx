import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'NoteHub — простий додаток для нотаток',
  description:
    'NoteHub допомагає швидко створювати, шукати та переглядати нотатки. Проста форма, пошук по ключовому слову, фільтри за тегами.',
  openGraph: {
    title: 'NoteHub — простий додаток для нотаток',
    description:
      'Створюй і керуй нотатками: пошук, теги, перегляд деталей. Все просто та швидко.',
    url: 'https://your-vercel-domain.vercel.app/',
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
        height: 630,
        alt: 'NoteHub preview',
      },
    ],
  },
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{ children: React.ReactNode; modal: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={roboto.variable}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  )
}