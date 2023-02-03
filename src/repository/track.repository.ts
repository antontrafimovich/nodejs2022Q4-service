import { Injectable } from '@nestjs/common';
import { DB } from 'src/db/db.model';

import { Track } from '../model';

@Injectable()
export class TrackRepository {
  private _segment = 'track';

  constructor(private _db: DB<Track>) {}

  getAll(): Promise<Track[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  async getById(id: string): Promise<Track> {
    try {
      return await this._db.getOne({
        segment: this._segment,
        fn: (track) => {
          return track.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  getByIds(ids: string[]): Promise<Track[]> {
    return this._db.getMany({
      segment: this._segment,
      fn: (track) => ids.includes(track.id),
    });
  }

  create(track: Omit<Track, 'id'>): Promise<Track> {
    return this._db.create({
      segment: this._segment,
      payload: track,
    });
  }

  async update(id: string, track: Partial<Omit<Track, 'id'>>): Promise<Track> {
    try {
      return await this._db.update({
        segment: this._segment,
        fn: (track) => {
          return track.id === id;
        },
        payload: track,
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      return await this._db.delete({
        segment: this._segment,
        fn: (track) => {
          return track.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  private throwNotFoundError(id: string) {
    throw new Error(`Track with id ${id} doesn't exist`);
  }
}
