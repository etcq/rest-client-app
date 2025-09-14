import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '@/store/auth-store';

const mockSession = {
  expires: '1',
  user: { name: 'Test' },
};

beforeEach(() => {
  useAuthStore.setState({
    isAuth: false,
    status: 'loading',
    session: null,
  });
});

describe('Auth Store', () => {
  it('should update state correctly for authenticated user', () => {
    const { setAuthState } = useAuthStore.getState();

    setAuthState('authenticated', mockSession);

    const { isAuth, status, session } = useAuthStore.getState();

    expect(isAuth).toBe(true);
    expect(status).toBe('authenticated');
    expect(session).toEqual(mockSession);
  });
});
