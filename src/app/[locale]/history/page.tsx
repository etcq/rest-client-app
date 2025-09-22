import { prisma } from '@/utils/prisma';
import { auth } from '@/auth/auth';
import EmptyHistory from '@/components/history/empty-history/empty-history';
import HistoryTable from '@/components/history/history-table/history-table';

const History = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return <EmptyHistory />;
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  const requestData = await prisma.request.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });

  const formattedRequests = requestData.map((request) => ({
    ...request,
    timestamp: Number(request.timestamp),
  }));

  return (
    <>
      {requestData.length === 0 && <EmptyHistory />}

      {requestData.length > 0 && <HistoryTable requests={formattedRequests} />}
    </>
  );
};

export default History;
