import { paths } from '@/constants';
import { Box, Button } from '@mui/material';
import { Link } from '@/i18n/navigation';
import React from 'react';
import { useTranslations } from 'next-intl';

interface IAuthMenuProps {
  isAuth: boolean;
}

const unauthMenu = [
  { text: 'Navigation.login', path: paths.login },
  { text: 'Navigation.registration', path: paths.registration },
];

const authMenu = [
  { text: 'Navigation.rest', path: paths.rest },
  { text: 'Navigation.history', path: paths.history },
  { text: 'Navigation.variables', path: paths.variables },
];

export const MainMenu = ({ isAuth }: IAuthMenuProps) => {
  const t = useTranslations();
  return (
    <Box sx={{ display: 'flex', gap: 2 }} data-testid="main-menu">
      {(isAuth ? authMenu : unauthMenu).map((item) => (
        <Link href={item.path} key={item.path}>
          <Button variant="contained" sx={{ width: 170 }}>
            {t(item.text)}
          </Button>
        </Link>
      ))}
    </Box>
  );
};
