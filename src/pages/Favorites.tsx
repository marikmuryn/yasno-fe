import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { selectFavorite, toggleFavorite } from '../store/favoriteSlice';
import { Error, PageLayout, SongList, Spinner } from '../components/';
import { useGetSongsQuery } from '../store/api';
import { useAppDispatch } from '../store/store';

export const Favorites = () => {
  const favorites = useSelector(selectFavorite);
  const dispatch = useAppDispatch();

  const { data = [], isLoading, isError } = useGetSongsQuery(favorites);

  const handleFavoriteToggle = React.useCallback(
    ({ songId, artistId }: { songId: string; artistId: string }) => {
      dispatch(toggleFavorite({ songId, artistId }));
    },
    [dispatch],
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (data.length === 0) {
    return (
      <Typography align="center">
        Favorites list is empty.
        <Link to="/artists">Go back to Artists</Link>
      </Typography>
    );
  }

  if (isError) {
    return <Error />;
  }

  return (
    <PageLayout title="Favorites">
      <SongList
        data={data}
        handleFavoriteToggle={handleFavoriteToggle}
        isArtistNameShow
      />
    </PageLayout>
  );
};
