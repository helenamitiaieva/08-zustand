import type { ReactNode } from 'react';
import css from './layout.module.css'

type Props = {
  children: ReactNode;
  sidebar: ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: Props) {
  return (
    <section className={css.wrap}>
      <aside className={css.sidebar}>{sidebar}</aside>
      <div className={css.content}>{children}</div>
    </section>
  );
}