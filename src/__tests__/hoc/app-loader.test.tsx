import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { useAuthStore } from '@/store/auth-store';
import AppLoader from '@/hoc/app-loader';

vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

vi.mock('@/store/auth-store', () => ({
  useAuthStore: vi.fn(),
}));

const mockSetAuthState = vi.fn();
const mockUpdateFn = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useAuthStore).mockReturnValue({ setAuthState: mockSetAuthState });
});

describe('AppLoader', () => {
  it('should call setAuthState with status "loading"', () => {
    const mockStatus = 'loading';
    vi.mocked(useSession).mockReturnValue({ data: null, status: mockStatus, update: mockUpdateFn });

    render(
      <AppLoader>
        <div>Test</div>
      </AppLoader>
    );

    expect(mockSetAuthState).toHaveBeenCalledWith(mockStatus, null);
  });
});
