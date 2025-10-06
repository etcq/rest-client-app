import { expect, describe, it } from 'vitest';
import { encodeRequestToUrl } from '@/utils/url-route';

describe('encodeRequestToUrl', () => {
  it('should correctly encode a full request with all fields', () => {
    const requestData = {
      method: 'GET',
      url: 'https://example.com/api',
      body: '{"message": "hello"}',
      headers: [{ id: '1', key: 'Content-Type', value: 'application/json' }],
    };

    const encodedUrl = encodeRequestToUrl(requestData);

    expect(encodedUrl).toContain('/GET');
    expect(encodedUrl).toContain(encodeURIComponent(btoa('https://example.com/api')));
    expect(encodedUrl).toContain(encodeURIComponent(btoa('{"message": "hello"}')));
    expect(encodedUrl).toContain('Content-Type=application%2Fjson');
  });

  it('should correctly encode a request without a body', () => {
    const requestData = {
      method: 'POST',
      url: 'https://example.com/posts',
      body: '',
      headers: [],
    };

    const encodedUrl = encodeRequestToUrl(requestData);

    expect(encodedUrl).not.toContain('//');
    expect(encodedUrl).toContain('/POST/');
  });

  it('should correctly encode a request with no headers', () => {
    const requestData = {
      method: 'PUT',
      url: 'https://example.com/data',
      body: 'test-body',
      headers: [],
    };

    const encodedUrl = encodeRequestToUrl(requestData);

    expect(encodedUrl).not.toContain('?');
  });
});
