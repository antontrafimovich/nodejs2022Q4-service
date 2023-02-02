import { Injectable } from '@nestjs/common';

import { DB } from '../db/db.model';
import { Favorite } from '../model';

@Injectable()
export class FavoritesRepository {
  private _segment = 'favorites';

  constructor(private _db: DB<Favorite>) {}

  getAll(): Promise<Favorite[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  create(record: Omit<Favorite, 'id'>): Promise<Favorite> {
    return this._db.create({
      segment: this._segment,
      payload: record,
    });
  }

  delete(record: Omit<Favorite, 'id'>): Promise<void> {
    return this._db.delete({
      segment: this._segment,
      fn: (favorite) => {
        return (
          favorite.entityId === record.entityId && favorite.type === record.type
        );
      },
    });
  }
}
