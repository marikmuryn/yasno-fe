import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Typography, Badge, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { useTypedSelector } from '../store/store';
import { selectTotalCount } from '../store/favoriteSlice';
import { useTitle } from '../hooks/useTitle';

interface HeaderProps {
  isShowBackButton?: boolean;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({
  isShowBackButton = true,
  title,
}) => {
  const navigation = useNavigate();
  const totalCount = useTypedSelector(selectTotalCount);

  useTitle(title);

  const handleBackButtonClick = React.useCallback(() => {
    navigation(-1);
  }, []);

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '.5fr 4fr 0.5fr',
        alignItems: 'center',
        padding: '20px 10px',
        marginBlock: '40px',
      }}
    >
      {isShowBackButton ? (
        <Button variant="outlined" onClick={handleBackButtonClick}>
          <ArrowBackIcon />
        </Button>
      ) : (
        <span />
      )}
      <Typography variant="h1" component="h1" align="center">
        {title}
      </Typography>

      <Link to={totalCount ? '/favorites' : ''}>
        <Badge badgeContent={totalCount} color="error">
          <FavoriteIcon color="action" />
        </Badge>
      </Link>
    </Box>
  );
};
