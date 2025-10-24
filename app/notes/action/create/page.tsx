import NoteForm from '@/components/NoteForm/NoteForm';
import css from './CreateNote.module.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note in NoteHub and save your ideas.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note in NoteHub and save your ideas.',
    url: 'https://notehub.app/notes/action/create',
    images: ['https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'],
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create a new note</h1>
        <NoteForm />
      </div>
    </main>
  );
}