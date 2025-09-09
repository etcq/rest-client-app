import type { FC } from 'react';
import { TextField, Button, Box, Typography, Link } from '@mui/material';

interface IProps {
  type: 'login' | 'register';
}

const AuthForm: FC<IProps> = ({ type }) => {
  const isLogin = type === 'login';

  return (
    <Box component="form" sx={{ width: 400, mx: 'auto', mt: 8 }}>
      <Typography variant="h5" align="center" mb={2}>
        {isLogin ? 'Sign In' : 'Sign Up'}
      </Typography>

      {!isLogin && <TextField label="Name" fullWidth margin="normal" />}

      <TextField label="Email" fullWidth margin="normal" />

      <TextField label="Password" type="password" fullWidth margin="normal" />

      <Box mt={2} display="flex" justifyContent="center">
        <Button type="submit" variant="contained" fullWidth>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </Button>
      </Box>

      <Box sx={{ textAlign: 'center' }}>
        <Link href="#" variant="body1" sx={{ display: 'block', mt: 2 }}>
          {isLogin ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </Link>
      </Box>
    </Box>
  );
};

export default AuthForm;
