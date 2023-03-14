import { Injectable } from '@nestjs/common';

import { DB } from '../db/db.model';
import { Album } from '../model';
import { NotFoundError } from '../utils';

@Injectable()
export class AlbumRepository {
  private _segment = 'album';

  constructor(private _db: DB<Album>) {}

  getAll(): Promise<Album[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  getMany(fn: (album: Album) => boolean): Promise<Album[]> {
    return this._db.getMany({
      segment: this._segment,
      fn,
    });
  }

  async getById(id: string): Promise<Album> {
    try {
      return await this._db.getOne({
        segment: this._segment,
        fn: (album) => {
          return album.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  getByIds(ids: string[]): Promise<Album[]> {
    return this._db.getMany({
      segment: this._segment,
      fn: (album) => ids.includes(album.id),
    });
  }

  create(album: Omit<Album, 'id'>): Promise<Album> {
    return this._db.create({
      segment: this._segment,
      payload: album,
    });
  }

  async update(id: string, album: Omit<Album, 'id'>): Promise<Album> {
    try {
      return await this._db.update({
        segment: this._segment,
        fn: (album) => {
          return album.id === id;
        },
        payload: album,
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      return await this._db.delete({
        segment: this._segment,
        fn: (album) => {
          return album.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  private throwNotFoundError(id: string) {
    throw new NotFoundError(`Album with id ${id} doesn't exist`);
  }
}
