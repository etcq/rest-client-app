import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loginWithCredentials } from '@/actions/sign-in';
import { signIn } from '@/auth/auth';

vi.mock('@/auth/auth', () => ({
  signIn: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('loginWithCredentials', () => {
  it('should successfully call signIn and return the result', async () => {
    const mockEmail = 'test@gmail.com';
    const mockPassword = 'password123';
    const mockResult = { success: true };

    vi.mocked(signIn).mockResolvedValue(mockResult);

    const result = await loginWithCredentials(mockEmail, mockPassword);

    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: mockEmail,
      password: mockPassword,
      redirect: false,
    });
    expect(result).toEqual(mockResult);
  });

  it('should throw an error if authentication fails', async () => {
    const mockError = new Error('Invalid credentials');
    vi.mocked(signIn).mockRejectedValue(mockError);

    await expect(loginWithCredentials('test@gmail.com', 'wrong-password')).rejects.toThrow(
      'Authentication error: Error: Invalid credentials'
    );
    expect(signIn).toHaveBeenCalledTimes(1);
  });
});
