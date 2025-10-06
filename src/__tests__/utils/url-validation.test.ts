import { expect, describe, it } from 'vitest';
import { isValidUrl } from '@/utils/url-validation';

describe('isValidUrl', () => {
  it('should return true for valid URLs', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
    expect(isValidUrl('http://example.com/path?query=123')).toBe(true);
    expect(isValidUrl('https://www.example.com/')).toBe(true);
    expect(isValidUrl('http://127.0.0.1:8080/')).toBe(true);
    expect(isValidUrl('http://localhost:3000')).toBe(true);
    expect(isValidUrl('ftp://example.com')).toBe(true);
  });

  it('should return false for invalid URLs', () => {
    expect(isValidUrl('example.com')).toBe(false);
    expect(isValidUrl('https://')).toBe(false);
    expect(isValidUrl('invalid-url')).toBe(false);
  });

  it('should return false for empty or null values', () => {
    expect(isValidUrl('')).toBe(false);
    expect(isValidUrl(' ')).toBe(false);
  });
});
