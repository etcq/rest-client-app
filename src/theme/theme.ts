'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    primary: {
      main: '#303f9f',
    },
    secondary: {
      main: '#00897b',
    },
  },
});

export default theme;
