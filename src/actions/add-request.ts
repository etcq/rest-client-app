'use server';

import type { IRequestHistoryItem } from '@/interfaces';
import { prisma } from '@/utils/prisma';

export const addRequestToUser = async (userEmail: string, requestData: IRequestHistoryItem) => {
  try {
    const newRequest = await prisma.request.create({
      data: {
        method: requestData.method,
        statusCode: requestData.statusCode,
        duration: requestData.duration,
        timestamp: requestData.timestamp,
        requestSize: requestData.requestSize,
        responseSize: requestData.responseSize,
        errorDetails: requestData.errorDetails,
        endpoint: requestData.endpoint,
        path: requestData.path,

        user: {
          connect: {
            email: userEmail,
          },
        },
      },
    });

    return newRequest;
  } catch (error) {
    throw new Error(`Failed to add request: ${error}`);
  }
};
