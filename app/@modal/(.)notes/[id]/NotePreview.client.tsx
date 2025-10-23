'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getSingleNote } from '@/lib/api';
import Modal from '@/components/Modal/Modal';
import css from './NotePreview.module.css';

type Props = { id: string };

export default function NotePreviewClient({ id }: Props) {
  const router = useRouter();
  const onClose = () => router.back();

  const { data: note, isLoading, isError } = useQuery({
    queryKey: ['note', id],
    queryFn: () => getSingleNote(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return (
      <Modal onClose={onClose}>
        <p>Loading, please wait...</p>
      </Modal>
    );
  }

  if (isError || !note) {
    return (
      <Modal onClose={onClose}>
        <p>Something went wrong.</p>
      </Modal>
    );
  }

  const date = new Date(note.updatedAt ?? note.createdAt).toLocaleString();

  return (
    <Modal onClose={onClose}>
      <div className={css.container}>
        <button className={css.backBtn} onClick={onClose}>Close</button>

        <div className={css.item}>
          <div className={css.header}>
            <h2>{note.title}</h2>
            {note.tag && <span className={css.tag}>{note.tag}</span>}
          </div>

          <p className={css.content}>{note.content}</p>
          <p className={css.date}>{date}</p>
        </div>
      </div>
    </Modal>
  );
}