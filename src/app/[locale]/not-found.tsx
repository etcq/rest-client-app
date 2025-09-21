'use client';

import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LocaleNotFound() {
  const locale = useLocale();
  const router = useRouter();

  useEffect(() => {
    toast.error(locale === 'en' ? 'Page not found' : 'Страница не найдена');
    router.replace(`/${locale}`);
  }, [locale, router]);

  return null;
}
