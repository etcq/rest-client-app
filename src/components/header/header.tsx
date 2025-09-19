'use client';
import { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Link, redirect } from '@i18n/navigation';
import { LangSwitcher, NavButton, Sidebar } from '@components';
import { useLocale, useTranslations } from 'next-intl';
import { appName, layoutConfig, paths } from '@constants';
import usePageScroll from '@/hooks/use-page-scroll';
import { useAuthStore } from '@/store/auth-store';
import { logout } from '@/actions/sign-out';
import useVariableStore from '@/store/use-variable-store';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { status, setAuthState } = useAuthStore((state) => state);
  const { setVariables } = useVariableStore();
  const locale = useLocale();
  const t = useTranslations('Navigation');
  const pageScroll = usePageScroll();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleLogout = async () => {
    await logout();
    setVariables({});
    setAuthState('unauthenticated', null);
    redirect({ href: '/', locale: locale });
  };

  const authNavItems = [
    { text: t('login'), path: paths.login },
    { text: t('registration'), path: paths.registration },
  ];

  const unauthNavItems = [
    { text: t('main'), path: paths.main },
    { text: t('logout'), path: paths.main, onClick: handleLogout },
  ];

  const navItems = status !== 'authenticated' ? authNavItems : unauthNavItems;

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        component="header"
        sx={{
          bgcolor: !pageScroll ? 'background.main' : '#1f282fb3',
          transition: 'ease-out 0.5s',
        }}
      >
        <Container sx={{ maxWidth: 1240 }}>
          <Toolbar sx={{ height: layoutConfig.headerHeight }}>
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: '#fff' }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              <Link href={paths.main}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Image src={'/images/logo.svg'} alt="Logo" width={35} height={35} />
                  <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                    {appName}
                  </Typography>
                </Box>
              </Link>
            </Box>
            <Box>
              <LangSwitcher />
            </Box>
            <Box
              sx={{ display: { xs: 'none', sm: 'flex' }, mr: 2, width: '26%', justifyContent: 'flex-end', gap: 2 }}
              component="nav"
            >
              {navItems.map((item) => (
                <NavButton key={item.text} {...item} status={status} />
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Sidebar handleDrawerToggle={handleDrawerToggle} navItems={navItems} isOpen={mobileOpen} logout={logout} />
    </Box>
  );
};
