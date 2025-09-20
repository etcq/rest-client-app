import { Box, Typography } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import HeadersRow from '@/components/headers-row';
import useRequestStore from '@store/use-request.store';

export default function HeadersTab() {
  const { headers, addHeader } = useRequestStore((state) => state);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Box sx={{ display: 'flex', gap: '20px' }}>
        <Typography>Headers</Typography>
        <AddBoxOutlinedIcon onClick={addHeader} sx={{ cursor: 'pointer' }} />
      </Box>
      {headers.map((header) => (
        <HeadersRow key={header.id} header={header} />
      ))}
    </Box>
  );
}
