import convertFormData from '@/utils/convert-formdata';
import { describe, expect, it } from 'vitest';

describe('convert variables utility function', () => {
  it('Should convert form data to array', () => {
    const testArr = ['test_key', 'test_value'];
    const data = new FormData();
    data.append('key', testArr[0]);
    data.append('value', testArr[1]);
    const result = convertFormData(data);
    expect(result).toStrictEqual(testArr);
  });
  it('If vars formdata is empty, function should throw Error', () => {
    const data = new FormData();
    expect(() => convertFormData(data)).toThrowError('Invalid FormData');
  });
});
