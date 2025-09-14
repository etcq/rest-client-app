import { useEffect, useState } from 'react';

const useLocalStorage = () => {
  const [variables, setVariables] = useState<Record<string, string> | undefined>();

  useEffect(() => {
    const data = localStorage.getItem('variables');
    if (data) {
      const parsedData = JSON.parse(data);
      setVariables(parsedData);
    }
  }, []);

  const getVariables = () => {
    return variables;
  };

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

  return { getVariables, addVariable, deleteVariable };
};
export default useLocalStorage;
