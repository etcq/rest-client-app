import type { IRequestHistoryItem } from '@/interfaces';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslations } from 'next-intl';
import HistoryTableCell from '../history-table-cell/history-table-cell';

interface IProps {
  requests: IRequestHistoryItem[];
}

const HistoryTable = ({ requests }: IProps) => {
  const t = useTranslations('History');

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('timestamp')}</TableCell>
            <TableCell>{t('method')}</TableCell>
            <TableCell>{t('endpoint')}</TableCell>
            <TableCell>{t('status')}</TableCell>
            <TableCell>{t('duration')}</TableCell>
            <TableCell>{t('reqSize')}</TableCell>
            <TableCell>{t('resSize')}</TableCell>
            <TableCell>{t('error')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} hover sx={{ cursor: 'pointer' }}>
              <HistoryTableCell path={request.path}>{new Date(request.timestamp).toLocaleString()}</HistoryTableCell>
              <HistoryTableCell path={request.path}>{request.method}</HistoryTableCell>
              <HistoryTableCell path={request.path}>{request.endpoint}</HistoryTableCell>
              <HistoryTableCell path={request.path}>{request.statusCode || '—'}</HistoryTableCell>
              <HistoryTableCell path={request.path}>{request.duration || '—'}</HistoryTableCell>
              <HistoryTableCell path={request.path}>{request.requestSize || '—'}</HistoryTableCell>
              <HistoryTableCell path={request.path}>{request.responseSize || '—'}</HistoryTableCell>
              <HistoryTableCell path={request.path}>{request.errorDetails || '—'}</HistoryTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
