'use client';
import { useAuthStore } from '@/store/auth-store';
import useVariableStore from '@/store/use-variable-store';
import { convertVars } from '@/utils/convert-vars';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const useVariablesStorage = () => {
  const { variables, setVariables } = useVariableStore((state) => state);
  const userEmail = useAuthStore((state) => state.session?.user?.email);

  useEffect(() => {
    if (userEmail) {
      const data = localStorage.getItem(userEmail);
      try {
        if (data) {
          const parsedData = JSON.parse(data);
          setVariables(parsedData);
        }
      } catch {
        toast.error("Can't get a variables");
      }
    }
  }, [setVariables, userEmail]);

  const addVariable = (newVariable: Record<string, string>) => {
    try {
      if (userEmail) {
        const newVariables = Object.assign({}, variables, newVariable);
        localStorage.setItem(userEmail, JSON.stringify(newVariables));
        setVariables(newVariables);
      }
    } catch {
      toast.error('Error adding a variable');
    }
  };

  const deleteVariable = (key: string) => {
    try {
      if (variables && userEmail) {
        const newVariables = Object.fromEntries(Object.entries(variables).filter(([k]) => k !== key));
        localStorage.setItem(userEmail, JSON.stringify(newVariables));
        setVariables(newVariables);
      }
    } catch {
      toast.error('Error deleting a variable');
    }
  };

  const convert = (string: string) => convertVars(string, variables);

  return { variables, convert, addVariable, deleteVariable };
};

export default useVariablesStorage;
