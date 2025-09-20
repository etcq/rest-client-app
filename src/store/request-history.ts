import { create } from 'zustand';
import type { IRequestHistoryItem } from '@interfaces';

interface IRequestHistoryStore {
  history: IRequestHistoryItem[];
  addRequest: (item: IRequestHistoryItem) => void;
  clearHistory: () => void;
}

const useRequestHistoryStore = create<IRequestHistoryStore>((set) => ({
  history: [],
  addRequest: (item) => set((state) => ({ history: [item, ...state.history] })),
  clearHistory: () => set({ history: [] }),
}));

export default useRequestHistoryStore;
