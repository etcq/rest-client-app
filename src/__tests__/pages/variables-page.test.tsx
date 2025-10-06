import { expect, describe, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import VariablesPage from '@/app/[locale]/variables/page';
import messagesEn from '../../../messages/en.json';

describe('Variables table component', () => {
  it('Page should be rendered', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <VariablesPage />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Variables')).toBeInTheDocument();
    waitFor(() => {
      expect(screen.getByText('Variables Key')).toBeInTheDocument();
      expect(screen.getByText('Variables Value')).toBeInTheDocument();
      expect(screen.getByText('Controls')).toBeInTheDocument();
    });
  });
});
