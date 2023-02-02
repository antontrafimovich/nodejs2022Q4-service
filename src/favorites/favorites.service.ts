import { Injectable } from '@nestjs/common';
import { AlbumRepository } from 'src/repository/album.repository';
import { ArtistRepository } from 'src/repository/artist.repository';
import { FavoritesRepository } from 'src/repository/favorites.repository';
import { TrackRepository } from 'src/repository/track.repository';

import { FullfieldFavorites } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    private _favoritesRepo: FavoritesRepository,
    private _artistRepo: ArtistRepository,
    private _albumRepo: AlbumRepository,
    private _trackRepo: TrackRepository,
  ) {}

  async getAll(): Promise<FullfieldFavorites> {
    const favorites = await this._favoritesRepo.getAll();

    const favoritesMap = favorites.reduce((result, next) => {
      if (next.type === 'artist') {
        return {
          ...result,
          artists:
            result.artists === undefined
              ? [next.id]
              : [...result.artists, next.id],
        };
      }

      if (next.type === 'album') {
        return {
          ...result,
          albums:
            result.albums === undefined
              ? [next.id]
              : [...result.albums, next.id],
        };
      }

      if (next.type === 'track') {
        return {
          ...result,
          tracks:
            result.tracks === undefined
              ? [next.id]
              : [...result.tracks, next.id],
        };
      }
    }, {} as Record<'artists' | 'albums' | 'tracks', string[]>);

    const artists = await this._artistRepo.getByIds(favoritesMap.artists);
    const albums = await this._albumRepo.getByIds(favoritesMap.artists);
    const tracks = await this._trackRepo.getByIds(favoritesMap.artists);

    return {
      artists,
      albums,
      tracks,
    };
  }
}
