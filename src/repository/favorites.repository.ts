import { Injectable } from '@nestjs/common';

import { DB } from '../db/db.model';
import { Favorite } from '../model';
import { NotFoundError } from '../utils';

@Injectable()
export class FavoritesRepository {
  private _segment = 'favorites';

  constructor(private _db: DB<Favorite>) {}

  async getAll(): Promise<Favorite[]> {
    const favorites = await this._db.getMany({
      segment: this._segment,
    });

    return favorites;
  }

  async getByRecord(record: Omit<Favorite, 'id'>): Promise<Favorite> {
    try {
      return await this._db.getOne({
        segment: this._segment,
        fn: (favorite) => {
          return (
            favorite.entityId === record.entityId &&
            favorite.type === record.type
          );
        },
      });
    } catch (err) {
      this.throwNotFoundError(record);
    }
  }

  create(record: Omit<Favorite, 'id'>): Promise<Favorite> {
    return this._db.create({
      segment: this._segment,
      payload: record,
    });
  }

  async delete(record: Omit<Favorite, 'id'>): Promise<void> {
    try {
      return await this._db.delete({
        segment: this._segment,
        fn: (favorite) => {
          return (
            favorite.entityId === record.entityId &&
            favorite.type === record.type
          );
        },
      });
    } catch (err) {
      this.throwNotFoundError(record);
    }
  }

  private throwNotFoundError({ entityId, type }: Omit<Favorite, 'id'>) {
    throw new NotFoundError(
      `Favorite of type ${type} and id ${entityId} doesn't exist`,
    );
  }
}
