import { expect, describe, it, vi, beforeEach, type Mock } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import HeadersTab from '@/components/tabs/headers';
import useRequestStore from '@/store/use-request.store';
import type { IHeader } from '@/interfaces';

interface IRequestState {
  headers: IHeader[];
  addHeader: () => void;
  updateHeader: (id: string, newKey: string, newValue: string) => void;
  removeHeader: (id: string) => void;
  setHeaders: (newHeaders: IHeader[]) => void;
}

vi.mock('@/components/headers-row', () => ({
  default: ({ header }: { header: { id: string } }) => (
    <div data-testid={`headers-row-${header.id}`}>Mock HeadersRow</div>
  ),
}));

vi.mock('@/store/use-request.store', () => ({
  default: vi.fn(),
}));

describe('HeadersTab', () => {
  const mockHeaders: IHeader[] = [{ id: '1', key: 'Content-Type', value: 'application/json' }];

  const mockAddHeader = vi.fn();

  beforeEach(() => {
    const mockState: IRequestState = {
      headers: mockHeaders,
      addHeader: mockAddHeader,
      updateHeader: vi.fn(),
      removeHeader: vi.fn(),
      setHeaders: vi.fn(),
    };

    const mockedUseRequestStore = useRequestStore as unknown as Mock;
    mockedUseRequestStore.mockImplementation((selector: (state: IRequestState) => unknown) => selector(mockState));
  });

  it('should render the "Headers" label', () => {
    render(<HeadersTab />);
    expect(screen.getByText('Headers')).toBeInTheDocument();
  });

  it('should render the correct number of HeadersRow components', () => {
    render(<HeadersTab />);
    expect(screen.getByTestId('headers-row-1')).toBeInTheDocument();
  });

  it('should call addHeader when the add button is clicked', () => {
    render(<HeadersTab />);
    const addButton = screen.getByTestId('AddBoxOutlinedIcon');
    fireEvent.click(addButton);
    expect(mockAddHeader).toHaveBeenCalledTimes(1);
  });
});
