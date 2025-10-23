'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export type ModalProps = {
  children: React.ReactNode;
  onClose: () => void; 
};

export default function Modal({ children, onClose }: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    const host = document.createElement('div');
    host.setAttribute('data-modal-root', '');
    hostRef.current = host;
    document.body.appendChild(host);

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      if (hostRef.current) {
        document.body.removeChild(hostRef.current);
        hostRef.current = null;
      }
      setMounted(false);
    };
  }, [onClose]);

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) onClose();
  };

  if (!mounted || !hostRef.current) return null;

  return createPortal(
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={onBackdrop}>
      <div className={css.modal}>{children}</div>
    </div>,
    hostRef.current
  );
}