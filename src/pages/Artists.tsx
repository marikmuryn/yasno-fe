import { Link, generatePath } from 'react-router-dom';
import { Grid } from '@mui/material';
import { useGetArtistsQuery } from '../store/api';
import { Error, Spinner, PageLayout, ArtistCard } from '../components';
import { ROUTER } from '../constants/constants';

export const Artists = () => {
  const { data = [], isFetching, isError } = useGetArtistsQuery();

  if (isFetching) {
    return <Spinner />;
  }

  if (isError) {
    return <Error />;
  }

  return (
    <PageLayout isShowBackButton={false} title="Artists">
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {data?.map(artist => (
          <Grid key={artist.id} item>
            <Link
              key={artist.id}
              to={generatePath(`${ROUTER.artists}/:artistId`, {
                artistId: artist.id,
              })}
            >
              <ArtistCard text={artist.name} imgSrc={artist.avatar} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </PageLayout>
  );
};
