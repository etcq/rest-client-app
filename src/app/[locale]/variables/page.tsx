'use client';
import { Typography, Box } from '@mui/material';
import dynamic from 'next/dynamic';
import { Loading } from '@components';
import { useTranslations } from 'next-intl';

const VariablesTable = dynamic(() => import('@components/variables-table/variables-table'), {
  loading: () => <Loading />,
  ssr: false,
});

const VariablesPage = () => {
  const t = useTranslations('Variables');
  return (
    <Box>
      <Typography variant="h4" textAlign="center" sx={{ my: 2 }}>
        {t('variables')}
      </Typography>
      <VariablesTable />
    </Box>
  );
};

export default VariablesPage;
