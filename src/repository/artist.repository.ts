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

  getById(id: string): Promise<Artist> {
    return this._db.getOne({
      segment: this._segment,
      fn: (artist) => {
        return artist.id === id;
      },
    });
  }

  create(artist: Omit<Artist, 'id'>): Promise<Artist> {
    return this._db.create({
      segment: this._segment,
      payload: artist,
    });
  }

  update(id: string, artist: Partial<Omit<Artist, 'id'>>): Promise<Artist> {
    return this._db.update({
      segment: this._segment,
      fn: (artist) => {
        return artist.id === id;
      },
      payload: artist,
    });
  }

  delete(id: string): Promise<void> {
    return this._db.delete({
      segment: this._segment,
      fn: (artist) => {
        return artist.id === id;
      },
    });
  }
}
