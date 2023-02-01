import { Injectable } from '@nestjs/common';

import { DB } from '../db/db.model';

export type FavoriteRecord = {
  type: 'artist' | 'album' | 'track';
  id: string;
};

@Injectable()
export class FavoritesRepository {
  private _segment = 'favorites';

  constructor(private _db: DB<FavoriteRecord>) {}

  getAll(): Promise<FavoriteRecord[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  create(record: FavoriteRecord): Promise<FavoriteRecord> {
    return this._db.create({
      segment: this._segment,
      payload: record,
    });
  }

  delete(id: string): Promise<void> {
    return this._db.delete({
      segment: this._segment,
      fn: (favorites) => {
        return favorites.id === id;
      },
    });
  }
}
