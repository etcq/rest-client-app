import { Typography, Box } from '@mui/material';
import React from 'react';
import { VariablesTable } from '@components';

const VariablesPage = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1">
        Variables Page
      </Typography>
      <Typography variant="body1">This is the variables page content.</Typography>
      <VariablesTable />
    </Box>
  );
};

export default VariablesPage;
