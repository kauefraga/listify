import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { List } from '../schemas/list';

interface ListState {
  lists: List[];
  createList: (list: List) => void;
}

export const useListStore = create<ListState>()(
  persist(
    (set) => ({
      lists: [],
      createList: (list) => set((state) => ({ lists: [...state.lists, list] })),
    }),
    {
      name: 'list-storage',
    },
  ),
);
