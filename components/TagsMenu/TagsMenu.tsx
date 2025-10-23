'use client';

import { useState } from 'react';
import Link from 'next/link';
import css from './TagsMenu.module.css';

const TAGS = ['All', 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping'] as const;

export default function TagsMenu() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(v => !v);
  const close = () => setOpen(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggle}>Notes ▾</button>

      {open && (
        <ul className={css.menuList}>
          {TAGS.map(t => {
            const href = t === 'All' ? '/notes/filter/all' : `/notes/filter/${t}`;
            return (
              <li key={t} className={css.menuItem}>
                <Link href={href} className={css.menuLink} onClick={close}>
                  {t === 'All' ? 'All notes' : t}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}