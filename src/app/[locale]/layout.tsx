import { hasLocale } from 'next-intl';
import { Roboto } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@i18n/routing';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Providers from '@/providers/providers';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
});

interface ILocaleProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function LocaleLayout({ children, params }: ILocaleProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} className={roboto.variable}>
      <body>
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </body>
    </html>
  );
}
