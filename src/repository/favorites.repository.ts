import { Injectable } from '@nestjs/common';

import { DB } from '../db/db.model';

export type FavoriteRecord = {
  id: string;
  type: 'artist' | 'album' | 'track';
  entityId: string;
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

  create(record: Omit<FavoriteRecord, 'id'>): Promise<FavoriteRecord> {
    return this._db.create({
      segment: this._segment,
      payload: record,
    });
  }

  delete(record: Omit<FavoriteRecord, 'id'>): Promise<void> {
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
