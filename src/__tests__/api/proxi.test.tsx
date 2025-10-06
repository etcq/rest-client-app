import { expect, describe, it, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/proxy/route';
import { NextResponse } from 'next/server';

vi.mock('next/server', () => {
  return {
    NextResponse: {
      json: vi.fn((data, options) => ({ json: data, options })),
    },
  };
});

const mockFetch = vi.fn();
vi.stubGlobal('fetch', mockFetch);

describe('POST /api', () => {
  beforeEach(() => {
    mockFetch.mockClear();
  });

  it('should return a successful JSON response with a 200 status', async () => {
    const requestData = {
      method: 'GET',
      url: 'https://example.com/api/data',
      headers: [{ key: 'Content-Type', value: 'application/json' }],
      body: '',
    };
    const mockResponse = {
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: vi.fn().mockResolvedValue({ message: 'success' }),
      text: vi.fn(),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await POST({ json: () => Promise.resolve(requestData) } as Request);

    expect(mockFetch).toHaveBeenCalledWith(requestData.url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
    });
    expect(mockResponse.json).toHaveBeenCalled();
    expect(mockResponse.text).not.toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith({ status: 200, body: { message: 'success' } });
  });

  it('should return a successful text response with a 200 status', async () => {
    const requestData = {
      method: 'POST',
      url: 'https://example.com/api/text',
      headers: [],
      body: 'simple text',
    };
    const mockResponse = {
      status: 200,
      headers: new Headers({ 'content-type': 'text/plain' }),
      json: vi.fn(),
      text: vi.fn().mockResolvedValue('OK'),
    };
    mockFetch.mockResolvedValue(mockResponse);

    await POST({ json: () => Promise.resolve(requestData) } as Request);

    expect(mockFetch).toHaveBeenCalledWith(requestData.url, {
      method: 'POST',
      headers: {},
      body: 'simple text',
    });
    expect(mockResponse.json).not.toHaveBeenCalled();
    expect(mockResponse.text).toHaveBeenCalled();
    expect(NextResponse.json).toHaveBeenCalledWith({ status: 200, body: 'OK' });
  });

  it('should return a 500 error on fetch failure', async () => {
    const requestData = {
      method: 'GET',
      url: 'https://example.com/invalid',
      headers: [],
      body: '',
    };
    const mockError = new Error('Network error');
    mockFetch.mockRejectedValue(mockError);

    vi.spyOn(console, 'error').mockImplementation(() => {});

    await POST({ json: () => Promise.resolve(requestData) } as Request);

    expect(mockFetch).toHaveBeenCalledWith(requestData.url, {
      method: 'GET',
      headers: {},
      body: undefined,
    });
    expect(console.error).toHaveBeenCalledWith('Proxy error:', mockError);
    expect(NextResponse.json).toHaveBeenCalledWith({ error: 'Error: Network error' }, { status: 500 });
  });
});
