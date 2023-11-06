import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Pagination, Grid } from '@mui/material';
import { useGetArtistQuery, useGetArtistSongsQuery } from '../store/api';
import {
  ArtistCard,
  Error,
  Spinner,
  PageLayout,
  SongList,
} from '../components/';

const LIMIT = 5;

export const Artist = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const { artistId } = useParams();

  if (!artistId) return <Navigate to="/artists" replace />;

  const {
    data: dataArtist,
    isFetching: isFetchingArtist,
    isError: isErrorArist,
  } = useGetArtistQuery(artistId);

  const {
    data: dataSongs = [],
    isFetching: isFetchingSongs,
    isError: isErrorSongs,
  } = useGetArtistSongsQuery({
    artistId,
    page: currentPage,
  });

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
          <SongList data={dataSongs} />
          <Pagination
            count={Math.ceil(dataArtist.songsCount / LIMIT)}
            page={currentPage}
            onChange={(event: React.ChangeEvent<unknown>, newPage: number) => {
              setCurrentPage(newPage);
            }}
          />
        </Grid>
      </Grid>
    </PageLayout>
  );
};
