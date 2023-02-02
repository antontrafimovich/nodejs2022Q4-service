import { Album, Artist, Track } from '../model';

export type FullfilledFavorites = {
  albums: Album[];
  tracks: Track[];
  artists: Artist[];
};
