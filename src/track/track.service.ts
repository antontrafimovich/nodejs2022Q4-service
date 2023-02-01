import { Injectable } from '@nestjs/common';
import { TrackRepository } from 'src/repository/track.repository';

import { Track } from '../model';

@Injectable()
export class TrackService {
  constructor(private _trackRepo: TrackRepository) {}

  getAll(): Promise<Track[]> {
    return this._trackRepo.getAll();
  }

  async getById(id: string): Promise<Track> {
    try {
      return this._trackRepo.getById(id);
    } catch (err) {
      this.throwTrackNotFoundError(id);
    }
  }

  create(track: Omit<Track, 'id'>): Promise<Track> {
    return this._trackRepo.create(track);
  }

  async update(trackId: string, track: Omit<Track, 'id'>): Promise<Track> {
    try {
      return await this._trackRepo.update(trackId, track);
    } catch (err) {
      this.throwTrackNotFoundError(trackId);
    }
  }

  async delete(trackId: string): Promise<void> {
    try {
      await this._trackRepo.delete(trackId);
    } catch (err) {
      this.throwTrackNotFoundError(trackId);
    }
  }

  private throwTrackNotFoundError(id: string) {
    throw new Error(`Track with id ${id} doesn't exist`);
  }
}
