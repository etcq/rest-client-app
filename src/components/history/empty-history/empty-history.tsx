import { Box, Button, Link, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

const EmptyHistory = () => {
  const t = useTranslations('History');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
      }}
    >
      <Typography variant="h5" component="h2">
        {t('empty')}
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        {t('noRequests')}
      </Typography>
      <Button variant="contained" component={Link} href="/restful-client" size="large">
        {t('tryRest')}
      </Button>
    </Box>
  );
};

export default EmptyHistory;
