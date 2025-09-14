import { describe, it, expect, vi, beforeEach } from 'vitest';
import { signOut } from '@/auth/auth';
import { logout } from '@/actions/sign-out';

vi.mock('@/auth/auth', () => ({
  signOut: vi.fn(),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe('logout', () => {
  it('should successfully call signOut and return the result', async () => {
    const mockResult = { success: true };
    vi.mocked(signOut).mockResolvedValue(mockResult);

    const result = await logout();

    expect(signOut).toHaveBeenCalledWith({
      redirect: false,
    });
    expect(result).toEqual(mockResult);
  });

  it('should throw an error if authentication fails', async () => {
    const mockError = new Error('Sign out failed');
    vi.mocked(signOut).mockRejectedValue(mockError);

    await expect(logout()).rejects.toThrow('Authentication error: Error: Sign out failed');
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
