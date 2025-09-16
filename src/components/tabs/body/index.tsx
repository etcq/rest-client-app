import { Box, Typography, TextField } from '@mui/material';
import type { JSX } from 'react';

interface IBodyTabProps {
  body: string;
  setBody: (value: string) => void;
  placeholder?: string;
}

export default function BodyTab({ body, setBody, placeholder }: IBodyTabProps): JSX.Element {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Typography>Body</Typography>
      <TextField
        multiline
        minRows={8}
        fullWidth
        placeholder={placeholder}
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
    </Box>
  );
}
