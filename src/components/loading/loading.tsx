'use client';

import Spinner from '@/components/ui/spinner/spinner';
import { Container } from '@mui/material';
import { useTranslations } from 'next-intl';

export function Loading() {
  const f = useTranslations('Loading');
  return (
    <Container
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        height: '100%',
        minHeight: '60vh',
      }}
    >
      <Spinner />
      <p>{`${f('loading')}...`}</p>
    </Container>
  );
}
