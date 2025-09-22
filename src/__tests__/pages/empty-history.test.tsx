import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useTranslations } from 'next-intl';
import EmptyHistory from '@/components/history/empty-history/empty-history';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

describe('EmptyHistory', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render correct text and button', () => {
    render(<EmptyHistory />);

    expect(useTranslations).toHaveBeenCalledWith('History');
    expect(screen.getByText('empty')).toBeInTheDocument();
    expect(screen.getByText('noRequests')).toBeInTheDocument();
    expect(screen.getByText('tryRest')).toBeInTheDocument();

    const tryRestButton = screen.getByText('tryRest');
    expect(tryRestButton).toHaveAttribute('href', '/restful-client');
  });
});
