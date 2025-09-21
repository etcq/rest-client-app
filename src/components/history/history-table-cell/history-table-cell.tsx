import { Link, TableCell } from '@mui/material';

interface IProps {
  path: string;
  children: React.ReactNode;
}

const cellLinkStyle = {
  display: 'block',
  width: '100%',
  height: '100%',
  padding: '12px 16px',
  color: 'inherit',
  textDecoration: 'none',
};

const HistoryTableCell = ({ path, children }: IProps) => (
  <TableCell sx={{ p: 0 }}>
    <Link href={`/restful-client/${path}`} sx={cellLinkStyle}>
      {children}
    </Link>
  </TableCell>
);

export default HistoryTableCell;
