import { Link } from '@/i18n/navigation';
import { Box, Button } from '@mui/material';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations();
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
      <h1>{t('HomePage.title')}</h1>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="/login">
          <Button variant="contained" sx={{ width: 170 }}>
            {t('Auth.login')}
          </Button>
        </Link>
        <Link href="/registration">
          <Button variant="contained" sx={{ width: 170 }}>
            {t('Auth.registration')}
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
