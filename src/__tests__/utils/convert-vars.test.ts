import { convertVars } from '@/utils/convert-vars';
import { describe, expect, it } from 'vitest';

describe('convert variables utility function', () => {
  it('calling the convertVars function should replace variables by a key from the vars object', () => {
    const str = 'this is {{test}} string';
    const vars = { test: 'result' };
    const result = convertVars(str, vars);
    expect(result).toBe('this is result string');
  });
  it('If vars object is empty, function show return original string', () => {
    const str = 'this is {{test}} string';
    const vars = {};
    const result = convertVars(str, vars);
    expect(result).toBe(str);
  });
});
