import { expect, describe, it, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeadersRow from '@/components/headers-row';
import useRequestStore from '@/store/use-request.store';
import type { IHeader } from '@interfaces';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('@store/use-request.store', () => {
  return {
    default: vi.fn(() => ({
      updateHeader: vi.fn(),
      removeHeader: vi.fn(),
    })),
  };
});

describe('HeadersRow', () => {
  const mockUpdateHeader = vi.fn();
  const mockRemoveHeader = vi.fn();
  const mockHeader: IHeader = { id: 'test-1', key: 'Content-Type', value: 'application/json' };

  beforeEach(() => {
    (useRequestStore as unknown as Mock).mockImplementation(() => ({
      updateHeader: mockUpdateHeader,
      removeHeader: mockRemoveHeader,
    }));
    vi.clearAllMocks();
  });

  it('should render the text fields with the correct values', () => {
    render(<HeadersRow header={mockHeader} />);

    const keyInput = screen.getByPlaceholderText('placeholders.headers.key') as HTMLInputElement;
    const valueInput = screen.getByPlaceholderText('placeholders.headers.value') as HTMLInputElement;

    expect(keyInput).toBeInTheDocument();
    expect(keyInput.value).toBe(mockHeader.key);
    expect(valueInput).toBeInTheDocument();
    expect(valueInput.value).toBe(mockHeader.value);
  });

  it('should call updateHeader when the key input is changed', () => {
    render(<HeadersRow header={mockHeader} />);
    const keyInput = screen.getByPlaceholderText('placeholders.headers.key');
    const newKey = 'Accept';

    fireEvent.change(keyInput, { target: { value: newKey } });

    expect(mockUpdateHeader).toHaveBeenCalledWith(mockHeader.id, newKey, mockHeader.value);
  });

  it('should call updateHeader when the value input is changed', () => {
    render(<HeadersRow header={mockHeader} />);
    const valueInput = screen.getByPlaceholderText('placeholders.headers.value');
    const newValue = 'application/xml';

    fireEvent.change(valueInput, { target: { value: newValue } });

    expect(mockUpdateHeader).toHaveBeenCalledWith(mockHeader.id, mockHeader.key, newValue);
  });

  it('should call removeHeader when the delete icon is clicked', () => {
    render(<HeadersRow header={mockHeader} />);

    const deleteButton = screen.getByTestId('DeleteForeverOutlinedIcon');
    fireEvent.click(deleteButton);

    expect(mockRemoveHeader).toHaveBeenCalledWith(mockHeader.id);
  });
});
