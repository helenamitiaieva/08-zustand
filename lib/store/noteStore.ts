import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { NoteTag } from '@/types/note'

export type DraftNote = { title: string; content: string; tag: NoteTag }

export const initialDraft: DraftNote = {
  title: '',
  content: '',
  tag: 'Todo',
}

type NoteStore = {
  draft: DraftNote
  setDraft: (patch: Partial<DraftNote>) => void
  clearDraft: () => void
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (patch) =>
        set((s) => ({ draft: { ...s.draft, ...patch } })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'notehub-draft',
      storage: createJSONStorage(() => localStorage),
    }
  )
)