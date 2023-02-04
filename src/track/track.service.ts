import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Track } from '../model';
import { FavoritesRepository } from '../repository/favorites.repository';
import { TrackRepository } from '../repository/track.repository';

@Injectable()
export class TrackService {
  constructor(
    private _trackRepo: TrackRepository,
    private _favoritesRepo: FavoritesRepository,
  ) {}

  getAll(): Promise<Track[]> {
    return this._trackRepo.getAll();
  }

  async getById(id: string): Promise<Track> {
    try {
      return await this._trackRepo.getById(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  create(track: Omit<Track, 'id'>): Promise<Track> {
    return this._trackRepo.create(track);
  }

  async update(
    trackId: string,
    track: Partial<Omit<Track, 'id'>>,
  ): Promise<Track> {
    try {
      return await this._trackRepo.update(trackId, track);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async delete(trackId: string): Promise<void> {
    try {
      await this._trackRepo.delete(trackId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    try {
      await this._favoritesRepo.delete({ type: 'track', entityId: trackId });
    } catch {}
  }
}
