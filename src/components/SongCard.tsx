import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface SongCardProps {
  name: string;
  duration: string;
  imgSrc: string;
  artistName: string;
  isFavorite: boolean;
  isShowNameArtist?: boolean;
  onClick: () => void;
}

export const SongCard: React.FC<SongCardProps> = ({
  name,
  duration,
  imgSrc,
  isFavorite,
  artistName,
  isShowNameArtist = false,
  onClick,
}) => (
  <Card
    sx={{ display: 'flex', backgroundColor: '#e3e3e3', marginBottom: '16px' }}
    onClick={onClick}
  >
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flex: '1 0 auto' }}>
        {isShowNameArtist && (
          <Typography component="div" variant="h4">
            {artistName}
          </Typography>
        )}
        <Typography component="div" variant="h6">
          {name}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" component="div">
          {duration}
        </Typography>
      </CardContent>
      <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
        <IconButton aria-label="previous">
          <FavoriteIcon color={isFavorite ? 'error' : 'inherit'} />
        </IconButton>
      </Box>
    </Box>
    <CardMedia
      component="img"
      sx={{ width: 160, marginLeft: 'auto' }}
      image={imgSrc}
      alt={name}
    />
  </Card>
);
