import { expect, describe, it } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
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
    expect(screen.getAllByText('Key')[0]).toBeInTheDocument();
    expect(screen.getAllByText('Value')[0]).toBeInTheDocument();
    expect(screen.getByText('Controls')).toBeInTheDocument();
  });
  it('Form should added new rows in table', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <VariablesTable />
      </NextIntlClientProvider>
    );
    const keyField = screen.getByLabelText(/Key/i);
    const valueField = screen.getByLabelText(/value/i);
    const button = screen.getByText(/add/i);

    fireEvent.input(keyField, { target: { value: 'testKey' } });
    fireEvent.input(valueField, { target: { value: 'testValue' } });
    fireEvent.click(button);

    waitFor(() => {
      expect(screen.getByText('testKey')).toBeInTheDocument();
      expect(screen.getByText('testValue')).toBeInTheDocument();
    });
  });
});
