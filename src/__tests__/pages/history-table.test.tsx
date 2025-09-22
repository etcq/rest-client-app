import HistoryTable from '@/components/history/history-table/history-table';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

vi.mock('next-intl', async () => {
  const actual = await vi.importActual('next-intl');
  return {
    ...actual,
    useTranslations: () => (key: string) => key,
  };
});

vi.mock('../history-table-cell/history-table-cell', () => ({
  default: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
}));

describe('HistoryTable', () => {
  it('should render fallback values when fields are missing', () => {
    const requestData = {
      id: '1',
      path: 'test',
      timestamp: Date.now(),
      method: 'GET',
      endpoint: 'http://test.com/api/',
      statusCode: 0,
      duration: 0,
      requestSize: 0,
      responseSize: 0,
      errorDetails: '',
    };

    render(
      <NextIntlClientProvider locale={'en'}>
        <HistoryTable requests={[requestData]} />
      </NextIntlClientProvider>
    );
    expect(screen.getAllByText('—')).toHaveLength(5);
  });
});
