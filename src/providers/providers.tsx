import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { NextIntlClientProvider, type Messages } from 'next-intl';

import theme from '@/theme/theme';

interface IProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}

export default function Providers({ children, locale, messages }: IProvidersProps) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
