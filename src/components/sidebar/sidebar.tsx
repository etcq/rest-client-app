import { appName } from '@/constants';
import { Box, Typography, Divider, List, ListItem, ListItemButton, ListItemText, Drawer } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface IDrawerProps {
  handleDrawerToggle: () => void;
  navItems: { text: string; path: string }[];
  isOpen: boolean;
}

const drawerWidth = 240;

export const Sidebar = ({ handleDrawerToggle, navItems, isOpen }: IDrawerProps) => {
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
    </Drawer>
  );
};
