import useVariablesStorage from '@/hooks/use-variables-storage';
import { useAuthStore } from '@/store/auth-store';
import useVariableStore from '@/store/use-variable-store';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

beforeEach(() => {
  localStorage.clear();
  useAuthStore.setState({ session: { user: { email: 'test@mail.com' }, expires: new Date().toString() } });
  useVariableStore.setState({ variables: {}, setVariables: (vars) => useVariableStore.setState({ variables: vars }) });
});

describe('Custom hook for variables storage', () => {
  it('Add var', () => {
    const { result } = renderHook(() => useVariablesStorage());
    act(() => {
      result.current.addVariable({ foo: 'bar' });
    });
    expect(result.current.variables).toEqual({ foo: 'bar' });
    const dataLS = localStorage.getItem('test@example.com');
    if (dataLS) {
      expect(JSON.parse(dataLS)).toEqual({ foo: 'bar' });
    }
  });
  it('Delete var', () => {
    const { result } = renderHook(() => useVariablesStorage());
    act(() => {
      result.current.addVariable({ foo: 'bar' });
    });
    act(() => {
      result.current.deleteVariable('foo');
    });
    expect(Object.keys(result.current.variables)).toHaveLength(0);
  });
});
