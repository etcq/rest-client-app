import { appName } from '@/constants';
import { Box, Typography, Divider, List, ListItem, Drawer } from '@mui/material';
import React from 'react';
import { NavButton } from '../nav-button/nav-button';

interface IDrawerProps {
  handleDrawerToggle: () => void;
  navItems: { text: string; path: string }[];
  isOpen: boolean;
  logout: () => void;
}

const drawerWidth = 240;

export const Sidebar = ({ handleDrawerToggle, navItems, isOpen, logout }: IDrawerProps) => {
  return (
    <Drawer
      variant="temporary"
      open={isOpen}
      onClose={handleDrawerToggle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: 'block', sm: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
      }}
    >
      <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
        <Typography variant="h6" sx={{ my: 2 }}>
          {appName}
        </Typography>
        <Divider />
        <List sx={{ mt: 4 }} component="nav">
          {navItems.map((item) => (
            <ListItem key={item.text} sx={{ justifyContent: 'center' }} onClick={logout}>
              <NavButton key={item.text} {...item} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
