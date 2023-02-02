import { Album, Artist, Track } from '../model';

export type FullfieldFavorites = {
  albums: Album[];
  tracks: Track[];
  artists: Artist[];
};
