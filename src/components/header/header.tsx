'use client';
import { useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Link } from '@i18n/navigation';
import { LangSwitcher, Sidebar } from '@components';
import { useTranslations } from 'next-intl';
import { appName, layoutConfig, paths } from '@constants';
import usePageScroll from '@/hooks/use-page-scroll';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isAuth] = useState(false);
  const t = useTranslations('Navigation');
  const pageScroll = usePageScroll();

  const authNavItems = [
    { text: t('login'), path: paths.login },
    { text: t('registration'), path: paths.registration },
  ];

  const unauthNavItems = [
    { text: t('main'), path: paths.main },
    { text: t('logout'), path: paths.main },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

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
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2, width: '22%', textAlign: 'right' }} component="nav">
              {(!isAuth ? authNavItems : unauthNavItems).map((item) => (
                <Button key={item.text} sx={{ color: '#fff' }} data-testid={`header-btn-${item.path.slice(1)}`}>
                  <Link href={item.path}>{item.text}</Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Sidebar
        handleDrawerToggle={handleDrawerToggle}
        navItems={!isAuth ? authNavItems : unauthNavItems}
        isOpen={mobileOpen}
      />
    </Box>
  );
};
