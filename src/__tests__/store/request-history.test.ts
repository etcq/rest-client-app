import { describe, it, expect, beforeEach } from 'vitest';
import { act } from 'react';
import useRequestHistoryStore from '@/store/request-history';
import type { IRequestHistoryItem } from '@interfaces';

const mockItem: IRequestHistoryItem = {
  id: '1',
  method: 'GET',
  endpoint: 'https://api.example.com/data',
  timestamp: 1678886400000,
  statusCode: 200,
  duration: 150,
  requestSize: 50,
  responseSize: 150,
  errorDetails: '',
  path: '/test-path-1',
};

describe('useRequestHistoryStore', () => {
  beforeEach(() => {
    act(() => {
      useRequestHistoryStore.getState().clearHistory();
    });
  });

  it('should add a request to the history', () => {
    const { addRequest } = useRequestHistoryStore.getState();

    act(() => {
      addRequest(mockItem);
    });

    const newHistory = useRequestHistoryStore.getState().history;
    expect(newHistory).toHaveLength(1);
    expect(newHistory[0]).toEqual(mockItem);
  });

  it('should add new requests to the beginning of the history array', () => {
    const { addRequest } = useRequestHistoryStore.getState();
    const secondMockItem: IRequestHistoryItem = {
      ...mockItem,
      id: '2',
      timestamp: 1678886401000,
      requestSize: 60,
      responseSize: 180,
      path: '/test-path-2',
    };

    act(() => {
      addRequest(mockItem);
    });
    act(() => {
      addRequest(secondMockItem);
    });

    const { history } = useRequestHistoryStore.getState();
    expect(history).toHaveLength(2);
    expect(history[0]).toEqual(secondMockItem);
    expect(history[1]).toEqual(mockItem);
  });

  it('should clear the history', () => {
    const { addRequest, clearHistory } = useRequestHistoryStore.getState();
    const secondMockItem: IRequestHistoryItem = {
      ...mockItem,
      id: '2',
      timestamp: 1678886401000,
      requestSize: 60,
      responseSize: 180,
      path: '/test-path-2',
    };

    act(() => {
      addRequest(mockItem);
      addRequest(secondMockItem);
    });

    expect(useRequestHistoryStore.getState().history).toHaveLength(2);

    act(() => {
      clearHistory();
    });

    const { history } = useRequestHistoryStore.getState();
    expect(history).toEqual([]);
  });
});
