import { describe, it, expect, vi, beforeEach } from 'vitest';
import { registerUser } from '@/actions/register';
import { prisma } from '@/utils/prisma';

const mockUserData = {
  name: 'Test',
  email: 'test@gmail.com',
  password: 'password123',
};

vi.mock('@/utils/prisma', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('registerUser', () => {
  it('should successfully register new user', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.user.create).mockResolvedValue({
      id: '1',
      ...mockUserData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const result = await registerUser(mockUserData);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockUserData.email },
    });
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: mockUserData.name,
        email: mockUserData.email,
        password: mockUserData.password,
      },
    });
    expect(result).toEqual(expect.objectContaining({ id: '1', ...mockUserData }));
  });

  it('should throw an error if user already exist', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue({
      id: '1',
      ...mockUserData,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await expect(registerUser(mockUserData)).rejects.toThrow('User with same email already exists');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: mockUserData.email },
    });
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});
