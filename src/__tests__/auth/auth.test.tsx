import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { ZodError } from 'zod';
import { getUserFromDb } from '@/utils/get-user';
import { signInSchema } from '@/schema/auth-schema';

interface MockUser {
  id: string;
  email: string;
  password: string;
}

interface MockToken {
  id?: string;
}

vi.mock('next-auth');
vi.mock('next-auth/providers/credentials');
vi.mock('@/utils/prisma', () => ({ prisma: vi.fn() }));
vi.mock('@/utils/get-user', () => ({ getUserFromDb: vi.fn() }));
vi.mock('@/schema/auth-schema', () => ({
  signInSchema: { parseAsync: vi.fn() },
}));

let authorizeFn: (credentials: Record<string, unknown> | undefined) => Promise<MockUser | null>;
let callbacks: { jwt: ({ token, user }: { token: MockToken; user: MockUser }) => Promise<MockToken> };

beforeEach(async () => {
  vi.clearAllMocks();

  (Credentials as Mock).mockImplementation((config) => {
    authorizeFn = config.authorize;
    return config;
  });

  (NextAuth as Mock).mockImplementation((config) => {
    callbacks = config.callbacks;
    return config;
  });

  vi.resetModules();
  await import('@/auth/auth');
});

describe('Auth', () => {
  it('should fail if no credentials are provided', async () => {
    const result = await authorizeFn(undefined);
    expect(result).toBeNull();
  });

  it('should return null if Zod validation fails', async () => {
    (signInSchema.parseAsync as Mock).mockRejectedValue(new ZodError([]));
    const result = await authorizeFn({ email: 'test', password: 'test' });
    expect(result).toBeNull();
  });

  it('should return null if user not found', async () => {
    (signInSchema.parseAsync as Mock).mockResolvedValue({ email: 'test@gmail.com', password: 'password123' });
    (getUserFromDb as Mock).mockResolvedValue(null);
    const result = await authorizeFn({ email: 'test@gmail.com', password: 'password123' });
    expect(result).toBeNull();
  });

  it('should return null if password does not match', async () => {
    (signInSchema.parseAsync as Mock).mockResolvedValue({ email: 'test@gmail.com', password: 'wrong' });
    (getUserFromDb as Mock).mockResolvedValue({ id: '1', email: 'test@gmail.com', password: 'correct' });

    const result = await authorizeFn({ email: 'test@gmail.com', password: 'wrong' });
    expect(result).toBeNull();
  });

  it('should return user if credentials are valid', async () => {
    (signInSchema.parseAsync as Mock).mockResolvedValue({ email: 'test@gmail.com', password: 'password123' });
    (getUserFromDb as Mock).mockResolvedValue({ id: '1', email: 'test@gmail.com', password: 'password123' });

    const result = await authorizeFn({ email: 'test@gmail.com', password: 'password123' });
    expect(result).toEqual({ id: '1', email: 'test@gmail.com' });
  });

  it('jwt callback should attach user id', async () => {
    const token = await callbacks.jwt({ token: {}, user: { id: '1' } as MockUser });
    expect(token.id).toBe('1');
  });
});
