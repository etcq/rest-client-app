import { describe, it, expect, vi, type Mock } from 'vitest';
import { addRequestToUser } from '@/actions/add-request';
import type { IRequestHistoryItem } from '@/interfaces';

vi.mock('@/utils/prisma', () => {
  const prisma = {
    request: {
      create: vi.fn(),
    },
  };
  return { prisma };
});

const mockRequestData: IRequestHistoryItem = {
  id: '1',
  method: 'GET',
  statusCode: 200,
  duration: 150,
  timestamp: Date.now(),
  requestSize: 50,
  responseSize: 200,
  errorDetails: '',
  endpoint: 'http://test.com/api/',
  path: 'test',
};

const mockUserEmail = 'test@gmail.com';

describe('addRequestToUser', () => {
  it('should successfully add request and return new request object', async () => {
    const { prisma } = await import('@/utils/prisma');
    (prisma.request.create as Mock).mockResolvedValue(mockRequestData);
    const result = await addRequestToUser(mockUserEmail, mockRequestData);

    expect(prisma.request.create).toHaveBeenCalledTimes(1);
    expect(prisma.request.create).toHaveBeenCalledWith({
      data: {
        method: mockRequestData.method,
        statusCode: mockRequestData.statusCode,
        duration: mockRequestData.duration,
        timestamp: mockRequestData.timestamp,
        requestSize: mockRequestData.requestSize,
        responseSize: mockRequestData.responseSize,
        errorDetails: mockRequestData.errorDetails,
        endpoint: mockRequestData.endpoint,
        path: mockRequestData.path,
        user: {
          connect: {
            email: mockUserEmail,
          },
        },
      },
    });
    expect(result).toEqual(mockRequestData);
  });

  it('should throw an error if adding request fails', async () => {
    const { prisma } = await import('@/utils/prisma');
    const mockError = new Error('Database connection failed.');
    (prisma.request.create as Mock).mockRejectedValue(mockError);

    await expect(addRequestToUser(mockUserEmail, mockRequestData)).rejects.toThrowError(
      'Failed to add request: Error: Database connection failed.'
    );
  });
});
