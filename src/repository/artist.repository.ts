import { Injectable } from '@nestjs/common';
import { DB } from 'src/db/db.model';

import { Artist } from '../model';

@Injectable()
export class ArtistRepository {
  private _segment = 'artist';

  constructor(private _db: DB<Artist>) {}

  getAll(): Promise<Artist[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  async getById(id: string): Promise<Artist> {
    try {
      return await this._db.getOne({
        segment: this._segment,
        fn: (artist) => {
          return artist.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  getByIds(ids: string[]): Promise<Artist[]> {
    return this._db.getMany({
      segment: this._segment,
      fn: (artist) => ids.includes(artist.id),
    });
  }

  create(artist: Omit<Artist, 'id'>): Promise<Artist> {
    return this._db.create({
      segment: this._segment,
      payload: artist,
    });
  }

  async update(
    id: string,
    artist: Partial<Omit<Artist, 'id'>>,
  ): Promise<Artist> {
    try {
      return await this._db.update({
        segment: this._segment,
        fn: (artist) => {
          return artist.id === id;
        },
        payload: artist,
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      return await this._db.delete({
        segment: this._segment,
        fn: (artist) => {
          return artist.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  private throwNotFoundError(id: string) {
    throw new Error(`Artist with id ${id} doesn't exist`);
  }
}
