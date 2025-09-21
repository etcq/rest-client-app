'use client';
import { Container, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Roboto } from 'next/font/google';
import Link from 'next/link';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html className={roboto.variable}>
      <body>
        <Container
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', p: 10 }}
        >
          <Typography variant="h3" sx={{ mb: 7 }}>
            Something went wrong 😢
          </Typography>
          <Typography variant="h6" sx={{ width: '500px', textAlign: 'center' }}>
            {error.message}
          </Typography>
          <div style={{ marginTop: '1.5rem' }}>
            <Button variant="outlined" color="primary" onClick={() => reset()}>
              Try again
            </Button>
          </div>
          <div style={{ marginTop: '1rem' }}>
            <Link href="/">Go back main</Link>
          </div>
        </Container>
      </body>
    </html>
  );
}
