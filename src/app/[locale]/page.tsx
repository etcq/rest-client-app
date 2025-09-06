import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <Box>
      <h1>{t('title')}</h1>
      <Button variant="contained">Click</Button>
    </Box>
  );
}
