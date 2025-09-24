'use client';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#71717d',
    },
    secondary: {
      main: '#0cad81',
    },
    background: {
      default: '#1f282f',
    },
  },
});

export default theme;
