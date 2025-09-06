import { useTransition } from 'react';
import { routing } from '@i18n/routing';
import { usePathname, useRouter } from '@i18n/navigation';
import { useLocale } from 'next-intl';
import { Box, FormControl, InputLabel, Select, MenuItem, type SelectChangeEvent } from '@mui/material';

export default function LangSwitcher() {
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
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="lang-select">Language</InputLabel>
        <Select labelId="lang-select" value={locale} label="Age" onChange={onSelectChange}>
          {routing.locales.map((locale) => (
            <MenuItem key={locale} value={locale}>
              {locale}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
