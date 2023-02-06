import { Injectable } from '@nestjs/common';

import { Track } from '../model';
import { AlbumRepository } from '../repository/album.repository';
import { ArtistRepository } from '../repository/artist.repository';
import { FavoritesRepository } from '../repository/favorites.repository';
import { TrackRepository } from '../repository/track.repository';
import { BadInputError, NotFoundError } from '../utils';

@Injectable()
export class TrackService {
  constructor(
    private _trackRepo: TrackRepository,
    private _albumRepo: AlbumRepository,
    private _artistRepo: ArtistRepository,
    private _favoritesRepo: FavoritesRepository,
  ) {}

  getAll(): Promise<Track[]> {
    return this._trackRepo.getAll();
  }

  getById(id: string): Promise<Track> {
    return this._trackRepo.getById(id);
  }

  async create(track: Omit<Track, 'id'>): Promise<Track> {
    const { artistId, albumId } = track;

    try {
      if (artistId !== null) {
        await this._artistRepo.getById(artistId);
      }
    } catch {
      throw new BadInputError(
        `Can't create track, because artist with id ${artistId} doesn't exist`,
      );
    }

    try {
      if (albumId !== null) {
        await this._albumRepo.getById(albumId);
      }
    } catch {
      throw new BadInputError(
        `Can't create track, because album with id ${albumId} doesn't exist`,
      );
    }

    return await this._trackRepo.create(track);
  }

  async update(trackId: string, track: Omit<Track, 'id'>): Promise<Track> {
    const { artistId, albumId } = track;

    try {
      if (artistId !== null) {
        await this._artistRepo.getById(artistId);
      }
    } catch {
      throw new BadInputError(
        `Can't update track, because artist with id ${artistId} doesn't exist`,
      );
    }

    try {
      if (albumId !== null) {
        await this._albumRepo.getById(albumId);
      }
    } catch {
      throw new BadInputError(
        `Can't update track, because album with id ${albumId} doesn't exist`,
      );
    }

    return this._trackRepo.update(trackId, track);
  }

  async delete(trackId: string): Promise<void> {
    try {
      await this._trackRepo.delete(trackId);
    } catch ({ message }) {
      throw new NotFoundError(message);
    }

    try {
      await this._favoritesRepo.delete({ type: 'track', entityId: trackId });
    } catch {}
  }
}
