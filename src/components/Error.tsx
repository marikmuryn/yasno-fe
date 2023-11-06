import { Typography, Box, Button } from '@mui/material';

export const Error = () => (
  <Box
    width="100%"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <Typography>Something went wrong.</Typography>;
    <Button onClick={() => window.location.reload()}>Retry</Button>
  </Box>
);
