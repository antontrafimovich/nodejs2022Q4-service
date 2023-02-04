import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { AlbumRepository } from '../repository/album.repository';
import { ArtistRepository } from '../repository/artist.repository';
import { FavoritesRepository } from '../repository/favorites.repository';
import { TrackRepository } from '../repository/track.repository';
import { FullfilledFavorites } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    private _favoritesRepo: FavoritesRepository,
    private _artistRepo: ArtistRepository,
    private _albumRepo: AlbumRepository,
    private _trackRepo: TrackRepository,
  ) {}

  async getAll(): Promise<FullfilledFavorites> {
    const favorites = await this._favoritesRepo.getAll();

    const favoritesMap = favorites.reduce(
      (result, next) => {
        if (next.type === 'artist') {
          return {
            ...result,
            artists: [...result.artists, next.entityId],
          };
        }

        if (next.type === 'album') {
          return {
            ...result,
            albums: [...result.albums, next.entityId],
          };
        }

        if (next.type === 'track') {
          return {
            ...result,
            tracks: [...result.tracks, next.entityId],
          };
        }
      },
      { artists: [], albums: [], tracks: [] } as Record<
        'artists' | 'albums' | 'tracks',
        string[]
      >,
    );

    const artists = await this._artistRepo.getByIds(favoritesMap.artists);
    const albums = await this._albumRepo.getByIds(favoritesMap.albums);
    const tracks = await this._trackRepo.getByIds(favoritesMap.tracks);

    return {
      artists,
      albums,
      tracks,
    };
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    try {
      await this._trackRepo.getById(trackId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      await this._favoritesRepo.getByRecord({
        type: 'track',
        entityId: trackId,
      });

      throw new HttpException(
        `Track with id ${trackId} has already been added to favorites`,
        HttpStatus.CONFLICT,
      );
    } catch {}

    this._favoritesRepo.create({ type: 'track', entityId: trackId });
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    try {
      return await this._favoritesRepo.delete({
        type: 'track',
        entityId: trackId,
      });
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    try {
      await this._albumRepo.getById(albumId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      await this._favoritesRepo.getByRecord({
        type: 'album',
        entityId: albumId,
      });

      throw new HttpException(
        `Album with id ${albumId} has already been added to favorites`,
        HttpStatus.CONFLICT,
      );
    } catch {}

    this._favoritesRepo.create({ type: 'album', entityId: albumId });
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    try {
      return await this._favoritesRepo.delete({
        type: 'album',
        entityId: albumId,
      });
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    try {
      await this._artistRepo.getById(artistId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      await this._favoritesRepo.getByRecord({
        type: 'artist',
        entityId: artistId,
      });

      throw new HttpException(
        `Artist with id ${artistId} has already been added to favorites`,
        HttpStatus.CONFLICT,
      );
    } catch {}

    this._favoritesRepo.create({ type: 'artist', entityId: artistId });
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    try {
      return await this._favoritesRepo.delete({
        type: 'artist',
        entityId: artistId,
      });
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
