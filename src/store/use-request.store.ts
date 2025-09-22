import { create } from 'zustand';
import type { IHeader } from '@interfaces';

interface IRequestState {
  headers: IHeader[];
  addHeader: () => void;
  updateHeader: (id: string, newKey: string, newValue: string) => void;
  removeHeader: (id: string) => void;
  setHeaders: (newHeaders: IHeader[]) => void;
}

const useRequestStore = create<IRequestState>((set) => ({
  headers: [{ id: crypto.randomUUID(), key: '', value: '' }],

  addHeader: (): void => {
    set((state) => ({
      headers: [...state.headers, { id: crypto.randomUUID(), key: '', value: '' }],
    }));
  },

  updateHeader: (id, newKey, newValue): void => {
    set((state) => ({
      headers: state.headers.map(
        (header: IHeader): IHeader => (header.id === id ? { ...header, key: newKey, value: newValue } : header)
      ),
    }));
  },

  removeHeader: (id): void =>
    set((state) => {
      const headers: IHeader[] = state.headers.filter((header: IHeader): boolean => header.id !== id);
      return {
        headers: headers.length ? headers : [{ id: crypto.randomUUID(), key: '', value: '' }],
      };
    }),

  setHeaders: (newHeaders: IHeader[]): void => {
    set({ headers: newHeaders });
  },
}));

export default useRequestStore;
