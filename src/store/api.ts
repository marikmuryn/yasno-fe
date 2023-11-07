import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ARTIST_SONGS_PARAMS } from '../constants/constants';

export interface Artist {
  id: string;
  name: string;
  avatar: string;
  songsCount: number;
}

export interface Song {
  id: string;
  name: string;
  cover: string;
  duration: string;
  artistId: string;
  artistName: string;
}

const BASE_URL = 'https://640799f62f01352a8a7faa72.mockapi.io/api/';

export const artistsApi = createApi({
  reducerPath: 'artistApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Artist', 'Songs'],
  endpoints: buider => ({
    getArtists: buider.query<Artist[], void>({
      query: () => ({ url: 'artists' }),
      providesTags: ['Artist'],
    }),
    getArtist: buider.query<Artist, string>({
      query: id => ({ url: `artists/${id}` }),
      providesTags: ['Artist'],
    }),
    getArtistSongs: buider.query<Song[], { artistId: string; page: number }>({
      query: ({ artistId, page }) => ({
        url: `artists/${artistId}/songs`,
        params: { page, limit: ARTIST_SONGS_PARAMS.limit },
      }),
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Songs' as const, id })),
              'Songs',
            ]
          : ['Songs'],
    }),
    getSongs: buider.query<Song[], Record<string, string[]>>({
      queryFn: async params => {
        const data = await Promise.all(
          Object.keys(params)
            .reduce(
              (
                acc: { artistId: string; songId: string }[],
                artistId: string,
              ) => {
                acc.push(
                  ...params[artistId].map(songId => ({
                    artistId,
                    songId,
                  })),
                );

                return acc;
              },
              [],
            )
            .map(dto =>
              fetch(
                `${BASE_URL}artists/${dto.artistId}/songs/${dto.songId}`,
              ).then(res => res.json()),
            ),
        );

        return { data };
      },
      providesTags: result =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Songs' as const, id })),
              'Songs',
            ]
          : ['Songs'],
    }),
  }),
});

export const {
  useGetArtistsQuery,
  useGetArtistQuery,
  useGetArtistSongsQuery,
  useGetSongsQuery,
} = artistsApi;
