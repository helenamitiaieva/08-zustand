'use client';
import { useRouter } from 'next/navigation';
import Modal from './Modal';

export default function ModalBack({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return <Modal onClose={() => router.back()}>{children}</Modal>;
}