import { create } from 'zustand';

interface IVariableState {
  variables: Record<string, string>;
  setVariables: (variables: Record<string, string>) => void;
}

const useVariableStore = create<IVariableState>()((set) => ({
  variables: {},
  setVariables: (variables) => set({ variables }),
}));

export default useVariableStore;
