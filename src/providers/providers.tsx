import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextIntlClientProvider, type Messages } from 'next-intl';
import { SessionProvider } from 'next-auth/react';
import theme from '@/theme/theme';
import { auth } from '@/auth/auth';

interface IProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}

export default async function Providers({ children, locale, messages }: IProvidersProps) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </SessionProvider>
  );
}
