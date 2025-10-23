import axios from 'axios'
import type { Note } from '@/types/note'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_BASE

axios.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN
  if (token) {
    config.headers = config.headers ?? {}
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

interface NotesResponse {
  notes: Note[]
  totalPages: number
}

export const getNotes = async (params?: { page?: number; perPage?: number; search?: string; tag?: string }) => {
  const { data } = await axios.get<NotesResponse>('/notes', { params })
  return data
}

export const getSingleNote = async (id: string) => {
  const { data } = await axios.get<Note>(`/notes/${id}`)
  return data
}

export const createNote = async (payload: { title: string; content: string; tag: Note['tag'] }) => {
  const { data } = await axios.post<Note>('/notes', payload)
  return data
}

export const updateNote = async (id: string, payload: { title?: string; content?: string; tag?: Note['tag'] }) => {
  const { data } = await axios.patch<Note>(`/notes/${id}`, payload)
  return data
}

export const deleteNote = async (id: string) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`)
  return data
}