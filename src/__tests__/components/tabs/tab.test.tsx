import { expect, describe, it, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from '@/components/tabs/tab';

describe('Tabs', () => {
  const mockTabs = [
    { id: '1', label: 'Tab One' },
    { id: '2', label: 'Tab Two' },
    { id: '3', label: 'Tab Three' },
  ];
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('should render all the provided tabs', () => {
    render(<Tabs tabs={mockTabs} activeTab="1" onChange={mockOnChange} />);

    expect(screen.getByText('Tab One')).toBeInTheDocument();
    expect(screen.getByText('Tab Two')).toBeInTheDocument();
    expect(screen.getByText('Tab Three')).toBeInTheDocument();
  });

  it('should have a "contained" variant for the active tab and "outlined" for inactive tabs', () => {
    render(<Tabs tabs={mockTabs} activeTab="2" onChange={mockOnChange} />);

    const activeTabButton = screen.getByText('Tab Two');
    expect(activeTabButton).toHaveAttribute('class', expect.stringContaining('MuiButton-contained'));

    const inactiveTabButton1 = screen.getByText('Tab One');
    expect(inactiveTabButton1).toHaveAttribute('class', expect.stringContaining('MuiButton-outlined'));
    const inactiveTabButton2 = screen.getByText('Tab Three');
    expect(inactiveTabButton2).toHaveAttribute('class', expect.stringContaining('MuiButton-outlined'));
  });

  it('should call onChange with the correct id when an inactive tab is clicked', () => {
    render(<Tabs tabs={mockTabs} activeTab="1" onChange={mockOnChange} />);

    const inactiveTabButton = screen.getByText('Tab Two');
    fireEvent.click(inactiveTabButton);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith('2');
  });

  it('should not call onChange when the active tab is clicked', () => {
    render(<Tabs tabs={mockTabs} activeTab="1" onChange={mockOnChange} />);

    const activeTabButton = screen.getByText('Tab One');
    fireEvent.click(activeTabButton);

    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
