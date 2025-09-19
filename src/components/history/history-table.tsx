import type { IHistoryRequest } from '@/interfaces';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useTranslations } from 'next-intl';

interface IProps {
  requests: IHistoryRequest[];
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
          {requests.map((request: IHistoryRequest) => (
            <TableRow key={request.id}>
              <TableCell>{new Date(request.timestamp).toLocaleString()}</TableCell>
              <TableCell>{request.method}</TableCell>
              <TableCell>{request.endpoint}</TableCell>
              <TableCell>{request.statusCode}</TableCell>
              <TableCell>{request.duration || '—'}</TableCell>
              <TableCell>{request.requestSize || '—'}</TableCell>
              <TableCell>{request.responseSize || '—'}</TableCell>
              <TableCell>{request.errorDetails || '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
