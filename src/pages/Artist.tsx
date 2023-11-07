import React from 'react';
import { useParams } from 'react-router-dom';
import { Pagination, Grid } from '@mui/material';
import { useGetArtistQuery, useGetArtistSongsQuery } from '../store/api';
import {
  ArtistCard,
  Error,
  Spinner,
  PageLayout,
  SongList,
} from '../components/';
import { useAppDispatch } from '../store/store';
import { toggleFavorite } from '../store/favoriteSlice';
import { ARTIST_SONGS_PARAMS } from '../constants/constants';

export const Artist = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { artistId } = useParams();
  const dispatch = useAppDispatch();

  const {
    data: dataArtist,
    isFetching: isFetchingArtist,
    isError: isErrorArist,
  } = useGetArtistQuery(artistId as string, {
    skip: !artistId,
  });

  const {
    data: dataSongs = [],
    isFetching: isFetchingSongs,
    isError: isErrorSongs,
  } = useGetArtistSongsQuery(
    {
      artistId: artistId as string,
      page: currentPage,
    },
    {
      skip: !artistId,
    },
  );

  const handleFavoriteToggle = React.useCallback(
    ({ songId, artistId }: { songId: string; artistId: string }) => {
      dispatch(toggleFavorite({ songId, artistId }));
    },
    [dispatch],
  );

  if (isFetchingArtist || isFetchingSongs) {
    return <Spinner />;
  }

  if (isErrorArist || isErrorSongs) {
    return <Error />;
  }

  if (!dataArtist || !dataSongs) {
    return <h1>Not found</h1>;
  }

  return (
    <PageLayout title={dataArtist.name}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <ArtistCard text={dataArtist.name} imgSrc={dataArtist.avatar} />
        </Grid>

        <Grid item md={8}>
          <SongList
            data={dataSongs}
            handleFavoriteToggle={handleFavoriteToggle}
          />
          <Pagination
            count={Math.ceil(dataArtist.songsCount / ARTIST_SONGS_PARAMS.limit)}
            page={currentPage}
            onChange={(_: React.ChangeEvent<unknown>, newPage: number) => {
              setCurrentPage(newPage);
            }}
          />
        </Grid>
      </Grid>
    </PageLayout>
  );
};
