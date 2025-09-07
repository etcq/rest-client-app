'use client';
import { useTransition } from 'react';
import { routing } from '@i18n/routing';
import { usePathname, useRouter } from '@i18n/navigation';
import { useLocale } from 'next-intl';
import { Box, FormControl, Select, MenuItem, type SelectChangeEvent } from '@mui/material';

export const LangSwitcher = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();
  function onSelectChange(event: SelectChangeEvent) {
    const nextLocale = event.target.value;
    startTransition(() => {
      router.replace({ pathname }, { locale: nextLocale });
    });
  }

  return (
    <Box sx={{ minWidth: 120, mr: 4 }}>
      <FormControl fullWidth>
        <Select
          labelId="lang-select"
          value={locale}
          onChange={onSelectChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          {routing.locales.map((locale) => (
            <MenuItem key={locale} value={locale}>
              {locale.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
