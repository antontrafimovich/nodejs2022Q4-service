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
              ? [next.entityId]
              : [...result.artists, next.entityId],
        };
      }

      if (next.type === 'album') {
        return {
          ...result,
          albums:
            result.albums === undefined
              ? [next.entityId]
              : [...result.albums, next.entityId],
        };
      }

      if (next.type === 'track') {
        return {
          ...result,
          tracks:
            result.tracks === undefined
              ? [next.entityId]
              : [...result.tracks, next.entityId],
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

  async addTrackToFavorites(trackId: string): Promise<void> {
    try {
      await this._trackRepo.getById(trackId);
    } catch (err) {
      throw err;
    }

    this._favoritesRepo.create({ type: 'track', entityId: trackId });
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    await this._favoritesRepo.delete({ type: 'track', entityId: trackId });
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    try {
      await this._albumRepo.getById(albumId);
    } catch (err) {
      throw err;
    }

    this._favoritesRepo.create({ type: 'album', entityId: albumId });
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    await this._favoritesRepo.delete({ type: 'album', entityId: albumId });
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    try {
      await this._artistRepo.getById(artistId);
    } catch (err) {
      throw err;
    }

    this._favoritesRepo.create({ type: 'artist', entityId: artistId });
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    await this._favoritesRepo.delete({ type: 'artist', entityId: artistId });
  }
}
