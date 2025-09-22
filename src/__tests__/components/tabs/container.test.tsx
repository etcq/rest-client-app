import { expect, describe, it, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TabContainer from '@/components/tabs/container';

vi.mock('@/components/tabs/tab', () => ({
  default: vi.fn(({ tabs, activeTab, onChange }) => (
    <div data-testid="mock-tabs">
      {tabs.map((tab: { id: string; label: string }) => (
        <button
          key={tab.id}
          data-testid={`tab-button-${tab.id}`}
          onClick={() => onChange(tab.id)}
          disabled={tab.id === activeTab}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )),
}));

describe('TabContainer', () => {
  const mockTabs = [
    { id: '1', label: 'Tab 1', content: <div data-testid="content-1">Content 1</div> },
    { id: '2', label: 'Tab 2', content: <div data-testid="content-2">Content 2</div> },
    { id: '3', label: 'Tab 3', content: <div data-testid="content-3">Content 3</div> },
  ];

  it('should render the default active tab content', () => {
    render(<TabContainer tabs={mockTabs} />);
    expect(screen.getByTestId('content-1')).toBeInTheDocument();
    expect(screen.queryByTestId('content-2')).not.toBeInTheDocument();
    expect(screen.queryByTestId('content-3')).not.toBeInTheDocument();
  });

  it('should render the content of the specified default active tab', () => {
    render(<TabContainer tabs={mockTabs} defaultActiveTab="2" />);
    expect(screen.getByTestId('content-2')).toBeInTheDocument();
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument();
  });

  it('should switch content when a different tab is clicked', () => {
    render(<TabContainer tabs={mockTabs} />);

    expect(screen.getByTestId('content-1')).toBeInTheDocument();

    const tab2Button = screen.getByTestId('tab-button-2');
    fireEvent.click(tab2Button);
    expect(screen.getByTestId('content-2')).toBeInTheDocument();
    expect(screen.queryByTestId('content-1')).not.toBeInTheDocument();
  });
});
