import React from 'react';
import { Song } from '../store/api';
import { useAppDispatch, useTypedSelector } from '../store/store';
import { selectFavorite, toggleFavorite } from '../store/favoriteSlice';
import { SongCard } from './SongCard';

interface SongListProps {
  data: Song[];
  isShowNameArtist?: boolean;
}

export const SongList: React.FC<SongListProps> = ({
  data,
  isShowNameArtist = false,
}) => {
  const dispatch = useAppDispatch();
  const favorites = useTypedSelector(selectFavorite);

  const handleFavoriteToggle = React.useCallback(
    ({ songId, artistId }: { songId: string; artistId: string }) => {
      dispatch(toggleFavorite({ songId, artistId }));
    },
    [dispatch],
  );

  return data.map(item => {
    const isFevorite = favorites?.[item?.artistId]?.includes(item.id);

    return (
      <SongCard
        key={item.id}
        name={item.name}
        duration={item.duration}
        imgSrc={item.cover}
        isFavorite={isFevorite}
        artistName={item.artistName}
        isShowNameArtist={isShowNameArtist}
        onClick={() =>
          handleFavoriteToggle({ artistId: item.artistId, songId: item.id })
        }
      />
    );
  });
};
