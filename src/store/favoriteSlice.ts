import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { getLocalStorage, setLocalStorage } from '../utils/storage';

export type Favorites = {
  favorites: Record<string, string[]>;
  totalCount: number;
};

const initialState: Favorites = {
  favorites: getLocalStorage('favorites') ?? {},
  totalCount: getLocalStorage('totalCount') ?? 0,
};

const slice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (
      state,
      action: PayloadAction<{ songId: string; artistId: string }>,
    ) => {
      const { songId, artistId } = action.payload;
      const favoritesForArtist = state.favorites[artistId] || [];
      const isFavorited = favoritesForArtist.includes(songId);

      if (isFavorited) {
        state.favorites[artistId] = favoritesForArtist.filter(
          id => id !== songId,
        );
        state.totalCount -= 1;
        setLocalStorage('favorites', state.favorites);
        setLocalStorage('totalCount', state.totalCount);
      } else {
        state.favorites[artistId] = [...favoritesForArtist, songId];
        state.totalCount += 1;
        setLocalStorage('favorites', state.favorites);
        setLocalStorage('totalCount', state.totalCount);
      }
    },
  },
});

export const { toggleFavorite } = slice.actions;

export default slice.reducer;

export const selectFavorite = (state: RootState) => state.favorite.favorites;
export const selectTotalCount = (state: RootState) => state.favorite.totalCount;
