import { useAuthStore } from '@/store/auth-store';
import useVariableStore from '@/store/use-variable-store';
import { convertVars } from '@/utils/convert-vars';
import { useEffect } from 'react';

const useVariablesStorage = () => {
  const { variables, setVariables } = useVariableStore((state) => state);
  const userEmail = useAuthStore((state) => state.session?.user?.email);

  useEffect(() => {
    if (userEmail) {
      const data = localStorage.getItem(userEmail);
      if (data) {
        const parsedData = JSON.parse(data);
        setVariables(parsedData);
      }
    }
  }, [setVariables, userEmail]);

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

  return { variables, convert, addVariable, deleteVariable };
};

export default useVariablesStorage;
