import React from 'react';

import { Box } from '@mui/material';
import { Header } from './Header';

interface LayoutProps {
  isShowBackButton?: boolean;
  title: string;
  children: React.ReactNode;
}

export const PageLayout: React.FC<LayoutProps> = ({
  isShowBackButton,
  title,
  children,
}) => (
  <>
    <Header isShowBackButton={isShowBackButton} title={title} />
    <Box
      sx={{
        maxWidth: '1280px',
        width: '100%',
        margin: '0 auto',
        padding: '0 16px',
      }}
    >
      {children}
    </Box>
  </>
);
