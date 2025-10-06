import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { auth } from '@/auth/auth';
import { prisma } from '@/utils/prisma';
import History from '@/app/[locale]/history/page';

vi.mock('@/components/history/empty-history/empty-history', () => ({
  default: vi.fn(() => <div>EmptyHistory Mock</div>),
}));

vi.mock('@/components/history/history-table/history-table', () => ({
  default: vi.fn(() => <div>HistoryTable Mock</div>),
}));

vi.mock('@/auth/auth', () => ({
  auth: vi.fn(),
}));

vi.mock('@/utils/prisma', () => {
  const mockPrisma = {
    user: {
      findUnique: vi.fn(),
    },
    request: {
      findMany: vi.fn(),
    },
  };
  return { prisma: mockPrisma };
});

describe('History', () => {
  it('should render EmptyHistory component if there is no user session', async () => {
    (auth as Mock).mockResolvedValue({ user: null });

    render(await History());

    expect(auth).toHaveBeenCalled();
    expect(screen.getByText('EmptyHistory Mock')).toBeInTheDocument();
    expect(screen.queryByText('HistoryTable Mock')).not.toBeInTheDocument();
  });

  it('should render EmptyHistory component if user has no history', async () => {
    (auth as Mock).mockResolvedValue({ user: { email: 'test@gmail.com' } });
    (prisma.user.findUnique as Mock).mockResolvedValue({ id: '123' });
    (prisma.request.findMany as Mock).mockResolvedValue([]);

    render(await History());

    expect(auth).toHaveBeenCalled();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@gmail.com' } });
    expect(prisma.request.findMany).toHaveBeenCalledWith({
      where: { userId: '123' },
      orderBy: { timestamp: 'desc' },
    });
    expect(screen.getByText('EmptyHistory Mock')).toBeInTheDocument();
    expect(screen.queryByText('HistoryTable Mock')).not.toBeInTheDocument();
  });

  it('should render HistoryTable component if user has history', async () => {
    const mockUser = { id: '123', email: 'test@gmail.com' };
    const mockRequests = [
      {
        id: '1',
        method: 'GET',
        statusCode: 200,
        duration: 150,
        timestamp: Date.now(),
        requestSize: 50,
        responseSize: 200,
        errorDetails: '',
        endpoint: 'http://test.com/api/',
        path: 'test',
      },
    ];
    (auth as Mock).mockResolvedValue({ user: { email: 'test@gmail.com' } });
    (prisma.user.findUnique as Mock).mockResolvedValue(mockUser);
    (prisma.request.findMany as Mock).mockResolvedValue(mockRequests);

    render(await History());

    expect(auth).toHaveBeenCalled();
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email: 'test@gmail.com' } });
    expect(prisma.request.findMany).toHaveBeenCalledWith({
      where: { userId: '123' },
      orderBy: { timestamp: 'desc' },
    });
    expect(screen.getByText('HistoryTable Mock')).toBeInTheDocument();
    expect(screen.queryByText('EmptyHistory Mock')).not.toBeInTheDocument();
  });
});
