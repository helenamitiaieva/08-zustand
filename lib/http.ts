import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const PUBLIC_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export const http = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

http.interceptors.request.use((config) => {
  if (PUBLIC_TOKEN) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${PUBLIC_TOKEN}`;
  }
  return config;
});