import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import { selectFavorite } from '../store/favoriteSlice';
import { Error, PageLayout, SongList, Spinner } from '../components/';
import { useGetSongsQuery } from '../store/api';

export const Favorites = () => {
  const favorites = useSelector(selectFavorite);

  const { data = [], isFetching, isError } = useGetSongsQuery(favorites);

  if (isError) {
    return <Error />;
  }

  return (
    <PageLayout title="Favorites">
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          {data.length > 0 ? (
            <SongList data={data} isShowNameArtist />
          ) : (
            <Typography align="center">
              Favorites list is empty.{' '}
              <Link to="/artists">Go back to Artists</Link>
            </Typography>
          )}
        </>
      )}
    </PageLayout>
  );
};
