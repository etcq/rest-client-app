import { expect, describe, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { VariablesTableRow } from '@components';
import messagesEn from '../../../messages/en.json';

describe('Variable component', () => {
  it('Row should rendered with right data', () => {
    const mockedProps = {
      variableKey: 'test_key',
      value: 'test_value',
      onDelete: vi.fn(),
    };
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <VariablesTableRow {...mockedProps} />
      </NextIntlClientProvider>
    );
    expect(screen.getByText(`{{${mockedProps.variableKey}}}`)).toBeInTheDocument();
    expect(screen.getByText(mockedProps.value)).toBeInTheDocument();
  });
  it('Clicking the "delete" button should trigger the delete function', () => {
    const mockedProps = {
      variableKey: 'test_key',
      value: 'test_value',
      onDelete: vi.fn(),
    };
    render(
      <NextIntlClientProvider locale="en" messages={messagesEn}>
        <VariablesTableRow {...mockedProps} />
      </NextIntlClientProvider>
    );
    const button = screen.getByRole('button', { name: 'Delete' });
    const mockDelete = vi.mocked(mockedProps.onDelete);
    fireEvent.click(button);
    expect(mockDelete).toBeCalled();
  });
});
