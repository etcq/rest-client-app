import { expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '@components';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

test('Header should be rendered', () => {
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
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <Header />
    </NextIntlClientProvider>
  );
  const headers = screen.getAllByText('REST client');
  headers.forEach((header) => expect(header).toBeInTheDocument());
});
