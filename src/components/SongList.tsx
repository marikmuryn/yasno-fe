import React from 'react';
import { Song } from '../store/api';
import { useTypedSelector } from '../store/store';
import { selectFavorite } from '../store/favoriteSlice';
import { SongCard } from './SongCard';

interface SongListProps {
  data: Song[];
  isArtistNameShow?: boolean;
  handleFavoriteToggle: (args: { artistId: string; songId: string }) => void;
}

export const SongList: React.FC<SongListProps> = ({
  data,
  isArtistNameShow = false,
  handleFavoriteToggle,
}) => {
  const favorites = useTypedSelector(selectFavorite);

  return data.map(item => {
    const isFavorite = favorites?.[item?.artistId]?.includes(item.id);

    return (
      <SongCard
        key={item.id}
        name={item.name}
        duration={item.duration}
        imgSrc={item.cover}
        isFavorite={isFavorite}
        artistName={item.artistName}
        isArtistNameShow={isArtistNameShow}
        onClick={() =>
          handleFavoriteToggle({ artistId: item.artistId, songId: item.id })
        }
      />
    );
  });
};
