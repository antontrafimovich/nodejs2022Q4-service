import { Injectable } from '@nestjs/common';

import { generateUid } from '../utils';
import { DB, DBRecord } from './db.model';

type InMemoryDatabaseObject<TEntity extends DBRecord> = Record<
  string,
  TEntity[]
>;

const throwNotFoundError = () => {
  throw new Error(`There's no entity with such search param`);
};

@Injectable()
export class InMemoryDatabase<TEntity extends DBRecord> extends DB<TEntity> {
  private _db: InMemoryDatabaseObject<TEntity> = {};

  async getOne({
    segment,
    fn,
  }: {
    segment: string;
    fn: (entity: TEntity) => boolean;
  }): Promise<TEntity> {
    if (!this._db[segment]) {
      return throwNotFoundError();
    }

    const result = this._db[segment].find(fn);

    if (!result) {
      return throwNotFoundError();
    }

    return result;
  }

  async getMany({
    segment,
    fn,
  }: {
    segment: string;
    fn: (entity: TEntity) => boolean;
  }): Promise<TEntity[]> {
    if (!this._db[segment]) {
      return throwNotFoundError();
    }

    if (!fn) {
      return this._db[segment];
    }

    return this._db[segment].filter(fn);
  }

  async create({
    segment,
    payload,
  }: {
    segment: string;
    payload: Omit<TEntity, 'id'>;
  }): Promise<TEntity> {
    if (!this._db[segment]) {
      this._db[segment] = [];
    }

    const newEntity = {
      ...payload,
      id: generateUid(),
    } as TEntity;

    this._db = {
      ...this._db,
      [segment]: [...this._db[segment], newEntity],
    };

    return newEntity;
  }

  async update({
    segment,
    fn,
    payload,
  }: {
    segment: string;
    fn: (entity: TEntity) => boolean;
    payload: Partial<Omit<TEntity, 'id'>>;
  }): Promise<TEntity> {
    if (!this._db[segment]) {
      return throwNotFoundError();
    }

    const entityToUpdateIndex = this._db[segment].findIndex(fn);

    if (entityToUpdateIndex < 0) {
      return throwNotFoundError();
    }

    const entityToUpdate = this._db[segment][entityToUpdateIndex];

    const newEntity = {
      ...entityToUpdate,
      ...payload,
      id: entityToUpdate.id,
    } as TEntity;

    this._db = {
      ...this._db,
      [segment]: this._db[segment].map((entity, index) => {
        if (index === entityToUpdateIndex) {
          return newEntity;
        }

        return entity;
      }),
    };

    return newEntity;
  }

  async delete({
    segment,
    fn,
  }: {
    segment: string;
    fn: (entity: TEntity) => boolean;
  }): Promise<void> {
    if (!this._db[segment]) {
      return throwNotFoundError();
    }

    const entityToDeleteIndex = this._db[segment].findIndex(fn);

    if (entityToDeleteIndex < 0) {
      return throwNotFoundError();
    }

    this._db = {
      ...this._db,
      [segment]: this._db[segment].filter(
        (entity, index) => index !== entityToDeleteIndex,
      ),
    };
  }
}
