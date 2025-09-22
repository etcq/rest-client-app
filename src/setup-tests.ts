import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeEach } from 'vitest';

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  const { useRouter } = vi.hoisted(() => {
    const mockedRouterPush = vi.fn();
    return {
      useRouter: () => ({ push: mockedRouterPush }),
      mockedRouterPush,
    };
  });

  vi.mock('next/navigation', async () => {
    const actual = await vi.importActual('next/navigation');
    return {
      ...actual,
      useRouter,
    };
  });
});
