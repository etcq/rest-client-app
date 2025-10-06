import { describe, it, expect, vi } from 'vitest';
import { GET, POST } from '@/app/api/auth/[...nextauth]/route';

vi.mock('@/auth/auth', () => ({
  handlers: {
    GET: vi.fn(),
    POST: vi.fn(),
  },
}));

describe('Auth Route', () => {
  it('should correctly export handlers from the auth module', () => {
    expect(typeof GET).toBe('function');
    expect(typeof POST).toBe('function');
  });
});
