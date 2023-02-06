import { Injectable } from '@nestjs/common';

import { DB } from '../db/db.model';
import { User } from '../model';
import { NotFoundError } from '../utils';

@Injectable()
export class UserRepository {
  private _segment = 'user';

  constructor(private _db: DB<User>) {}

  getAll(): Promise<User[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  async getById(id: string): Promise<User> {
    try {
      return await this._db.getOne({
        segment: this._segment,
        fn: (user) => {
          return user.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  create(user: Omit<User, 'id'>): Promise<User> {
    return this._db.create({
      segment: this._segment,
      payload: user,
    });
  }

  async update(id: string, user: Omit<User, 'id'>): Promise<User> {
    try {
      return await this._db.update({
        segment: this._segment,
        fn: (user) => {
          return user.id === id;
        },
        payload: user,
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  async delete(id: string): Promise<void> {
    try {
      return await this._db.delete({
        segment: this._segment,
        fn: (user) => {
          return user.id === id;
        },
      });
    } catch (err) {
      this.throwNotFoundError(id);
    }
  }

  private throwNotFoundError(id: string) {
    throw new NotFoundError(`User with id ${id} doesn't exist`);
  }
}
