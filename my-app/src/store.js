// src/store.js
import { create } from 'zustand';

export const useStore = create((set) => ({
  userId: null,
  setUserId: (id) => set({ userId: id }),
  files: [],
  setFiles: (files) => set({ files }),
}));
