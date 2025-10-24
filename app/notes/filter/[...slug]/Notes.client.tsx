'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Link from 'next/link';
import css from './page.module.css';

import { getNotes } from '@/lib/api';
import type { Note } from '@/types/note';

import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import NoteList from '@/components/NoteList/NoteList';

interface NotesClientProps {
  initialPage: number;
  perPage: number;
  initialSearch: string;
  tag?: string; 
}

export default function NotesClient({
  initialPage,
  perPage,
  initialSearch,
  tag,
}: NotesClientProps) {
  const [page, setPage] = useState(initialPage);
  const [search, setSearch] = useState(initialSearch);
  const [debouncedSearch] = useDebounce(search, 400);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['notes', debouncedSearch, page, tag ?? ''],
    queryFn: () => getNotes({ page, perPage, search: debouncedSearch, tag }),
    placeholderData: (prev) => prev,
  });

  const notes: Note[] = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearch(value);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={search} onChange={handleSearchChange} />

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}

        <Link href="/notes/action/create" className={css.button}>
          Create note +
        </Link>
      </header>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Помилка при завантаженні</p>}

      {notes.length > 0 && <NoteList notes={notes} />}
    </div>
  );
}