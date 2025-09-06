'use client';
import { useCallback, useMemo, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import styles from './header.module.scss';
import LangSwitcher from '../lang-switcher/lang-switcher';
import { useTranslations } from 'next-intl';
import { appName } from '@constants';

const drawerWidth = 240;

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('Header');

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

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        {appName}
      </Typography>
      <Divider />
      <List sx={{ mt: 4 }}>
        {navItems.map((item) => (
          <ListItem key={item.text} sx={{ justifyContent: 'center' }}>
            <Link href={item.path}>
              <ListItemButton sx={{ textAlign: 'center' }}>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" color="primary">
        <Toolbar sx={{ height: 80 }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#fff' }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
            <Link href={'/'} className={styles.link}>
              <Image src={'/images/logo.svg'} alt="Logo" width={35} height={35} />
              <Typography variant="h5" component="div" sx={{ ml: 1 }}>
                {appName}
              </Typography>
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
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
