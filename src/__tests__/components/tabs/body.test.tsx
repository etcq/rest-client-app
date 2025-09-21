import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BodyTab from '@/components/tabs/body';

describe('BodyTab', () => {
  const defaultProps = {
    body: 'Initial body content',
    setBody: vi.fn(),
    placeholder: 'Enter your body content',
  };

  it('renders the "Body" label', () => {
    render(<BodyTab {...defaultProps} />);
    expect(screen.getByText('Body')).toBeInTheDocument();
  });

  it('renders the TextField with correct initial props', () => {
    render(<BodyTab {...defaultProps} />);

    const textField = screen.getByRole('textbox');
    expect(textField).toBeInTheDocument();
    expect(textField).toHaveValue(defaultProps.body);
    expect(textField).toHaveAttribute('placeholder', defaultProps.placeholder);
  });

  it('calls setBody when the TextField value changes', () => {
    const setBodyMock = vi.fn();
    render(<BodyTab {...defaultProps} setBody={setBodyMock} />);
    const textField = screen.getByRole('textbox');
    const newValue = 'Updated body content';

    fireEvent.change(textField, { target: { value: newValue } });
    expect(setBodyMock).toHaveBeenCalledWith(newValue);
    expect(setBodyMock).toHaveBeenCalledTimes(1);
  });

  it('handles the absence of a placeholder prop', () => {
    const propsWithoutPlaceholder = {
      body: 'Test body',
      setBody: vi.fn(),
    };
    render(<BodyTab {...propsWithoutPlaceholder} />);
    const textField = screen.getByRole('textbox');
    expect(textField).not.toHaveAttribute('placeholder');
  });
});
