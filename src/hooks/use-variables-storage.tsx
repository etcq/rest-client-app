import useVariableStore from '@/store/use-variable-store';
import { convertVars } from '@/utils/convert-vars';
import { useEffect } from 'react';

const useVariablesStorage = () => {
  const { variables, setVariables } = useVariableStore();

  useEffect(() => {
    const data = localStorage.getItem('variables');
    if (data) {
      const parsedData = JSON.parse(data);
      setVariables(parsedData);
    }
  }, [setVariables]);

  const addVariable = (newVariable: Record<string, string>) => {
    const newVariables = Object.assign({}, variables, newVariable);
    setVariables(newVariables);
    localStorage.setItem('variables', JSON.stringify(newVariables));
  };

  const deleteVariable = (key: string) => {
    if (variables) {
      const newVariables = Object.fromEntries(Object.entries(variables).filter(([k]) => k !== key));
      setVariables(newVariables);
      localStorage.setItem('variables', JSON.stringify(newVariables));
    }
  };

  const convert = (string: string) => convertVars(string, variables);

  return { variables, convert, addVariable, deleteVariable };
};

export default useVariablesStorage;
