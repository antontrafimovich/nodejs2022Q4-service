import { Injectable } from '@nestjs/common';
import { DB } from '../db/db.model';

import { Album } from '../model';

@Injectable()
export class AlbumRepository {
  private _segment = 'album';

  constructor(private _db: DB<Album>) {}

  getAll(): Promise<Album[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  getById(id: string): Promise<Album> {
    return this._db.getOne({
      segment: this._segment,
      fn: (album) => {
        return album.id === id;
      },
    });
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

  update(id: string, album: Partial<Omit<Album, 'id'>>): Promise<Album> {
    return this._db.update({
      segment: this._segment,
      fn: (album) => {
        return album.id === id;
      },
      payload: album,
    });
  }

  delete(id: string): Promise<void> {
    return this._db.delete({
      segment: this._segment,
      fn: (album) => {
        return album.id === id;
      },
    });
  }
}
