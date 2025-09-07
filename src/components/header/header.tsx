'use client';
import { useCallback, useMemo, useState } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography, Button, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';
import { Link } from '@i18n/navigation';
import { LangSwitcher, Sidebar } from '@components';
import { useTranslations } from 'next-intl';
import { appName, layoutConfig } from '@constants';

export const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('Auth');

  const navItems = useMemo(
    () => [
      { text: t('login'), path: '/login' },
      { text: t('registration'), path: '/registration' },
    ],
    [t]
  );

  const handleDrawerToggle = useCallback(() => {
    setMobileOpen((prevState) => !prevState);
  }, []);

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color="primary">
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
              <Link href={'/'}>
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
            <Box sx={{ display: { xs: 'none', sm: 'block' }, mr: 2 }}>
              {navItems.map((item) => (
                <Button key={item.text} sx={{ color: '#fff' }}>
                  <Link href={item.path}>{item.text}</Link>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Sidebar handleDrawerToggle={handleDrawerToggle} navItems={navItems} isOpen={mobileOpen} />
    </Box>
  );
};
