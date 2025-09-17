import useVariableStore from '@/store/use-variable-store';
import { convertVars } from '@/utils/convert-vars';
import { useCallback } from 'react';

const useVariablesStorage = (userEmail?: string | null) => {
  const { variables, setVariables } = useVariableStore((state) => state);

  const initStorage = useCallback(
    (userEmail?: string | null) => {
      if (!userEmail) return;
      const data = localStorage.getItem(userEmail);
      if (data) {
        const parsedData = JSON.parse(data);
        setVariables(parsedData);
      }
    },
    [setVariables]
  );

  const addVariable = (newVariable: Record<string, string>) => {
    if (userEmail) {
      const newVariables = Object.assign({}, variables, newVariable);
      setVariables(newVariables);
      localStorage.setItem(userEmail, JSON.stringify(newVariables));
    }
  };

  const deleteVariable = (key: string) => {
    if (variables && userEmail) {
      const newVariables = Object.fromEntries(Object.entries(variables).filter(([k]) => k !== key));
      setVariables(newVariables);
      localStorage.setItem(userEmail, JSON.stringify(newVariables));
    }
  };

  const convert = (string: string) => convertVars(string, variables);

  return { variables, convert, addVariable, deleteVariable, initStorage };
};

export default useVariablesStorage;
