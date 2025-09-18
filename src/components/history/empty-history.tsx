import { Box, Button, Link, Typography } from '@mui/material';

const EmptyHistory = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        p: 4,
      }}
    >
      <Typography variant="h5" component="h2">
        It&apos;s empty here.
      </Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>
        You haven&apos;t executed any requests yet.
      </Typography>
      <Button variant="contained" component={Link} href="/restful-client" size="large">
        Try the RESTful Client
      </Button>
    </Box>
  );
};

export default EmptyHistory;
