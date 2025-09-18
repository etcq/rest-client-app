import { expect, describe, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messagesEn from '../../../messages/en.json';
import VariablesTable from '@components/variables-table/variables-table';

describe('Variables table component', () => {
  it('Table should be rendered', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <VariablesTable />
      </NextIntlClientProvider>
    );
    expect(screen.getByText('Variables Key')).toBeInTheDocument();
    expect(screen.getByText('Variables Value')).toBeInTheDocument();
    expect(screen.getByText('Controls')).toBeInTheDocument();
  });
});
