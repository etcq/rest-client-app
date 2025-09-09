import { MainMenu } from '@components';
import { Box, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
  const isAuth = false;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <Typography variant="h1" sx={{ mb: 4, textAlign: 'center', fontWeight: 700 }}>
        {isAuth ? t('HomePage.titleAuth') : t('HomePage.titleUnauth')}
      </Typography>
      <MainMenu isAuth={isAuth} />
    </Box>
  );
}
