'use client';
import { Typography, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { Loading } from '@components';

const VariablesTable = dynamic(() => import('@components/variables-table/variables-table'), {
  loading: () => <Loading />,
  ssr: false,
});

const VariablesPage = () => {
  return (
    <Box>
      <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
        Variables
      </Typography>
      <VariablesTable />
    </Box>
  );
};

export default VariablesPage;
