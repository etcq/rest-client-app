import type { IHistoryRequest } from '@/interfaces';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

interface IProps {
  requests: IHistoryRequest[];
}

const HistoryTable = ({ requests }: IProps) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Timestamp</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>Endpoint</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Duration (ms)</TableCell>
            <TableCell>Req. Size (bytes)</TableCell>
            <TableCell>Res. Size (bytes)</TableCell>
            <TableCell>Error Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requests.map((request: IHistoryRequest) => (
            <TableRow key={request.id}>
              <TableCell>{new Date(request.timestamp).toLocaleString()}</TableCell>
              <TableCell>{request.method}</TableCell>
              <TableCell>{request.endpoint}</TableCell>
              <TableCell>{request.statusCode}</TableCell>
              <TableCell>{request.duration || 'N/A'}</TableCell>
              <TableCell>{request.requestSize || 'N/A'}</TableCell>
              <TableCell>{request.responseSize || 'N/A'}</TableCell>
              <TableCell>{request.errorDetails || '—'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HistoryTable;
