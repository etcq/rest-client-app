import { describe, it, expect, vi, beforeEach } from 'vitest';
import { prisma } from '@/utils/prisma';
import { getUserFromDb } from '@/utils/get-user';

vi.mock('@/utils/prisma', () => ({
  prisma: {
    user: {
      findFirst: vi.fn(),
    },
  },
}));

const mockUser = {
  id: '1',
  name: 'Test',
  email: 'test@gmail.com',
  password: 'password',
  createdAt: new Date(),
  updatedAt: new Date(),
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe('getUserFromDb', () => {
  it('should return user if found in database', async () => {
    vi.mocked(prisma.user.findFirst).mockResolvedValue(mockUser);

    const result = await getUserFromDb(mockUser.email);

    expect(prisma.user.findFirst).toHaveBeenCalledWith({
      where: { email: mockUser.email },
    });
    expect(result).toEqual(mockUser);
  });
});
