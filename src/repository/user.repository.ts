import { Injectable } from '@nestjs/common';
import { DB } from 'src/db/db.model';

import { User } from '../model';

@Injectable()
export class UserRepository {
  private _segment = 'user';

  constructor(private _db: DB<User>) {}

  getAll(): Promise<User[]> {
    return this._db.getMany({
      segment: this._segment,
    });
  }

  getById(id: string): Promise<User> {
    return this._db.getOne({
      segment: this._segment,
      fn: (user) => {
        return user.id === id;
      },
    });
  }

  create(user: Omit<User, 'id'>): Promise<User> {
    return this._db.create({
      segment: this._segment,
      payload: user,
    });
  }

  update(id: string, user: Partial<Omit<User, 'id'>>): Promise<User> {
    return this._db.update({
      segment: this._segment,
      fn: (user) => {
        return user.id === id;
      },
      payload: user,
    });
  }

  delete(id: string): Promise<void> {
    return this._db.delete({
      segment: this._segment,
      fn: (user) => {
        return user.id === id;
      },
    });
  }
}
