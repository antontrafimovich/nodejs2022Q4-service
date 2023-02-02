import { Injectable } from '@nestjs/common';

import { User } from '../model';
import { UserRepository } from '../repository/user.repository';

@Injectable()
export class UserService {
  constructor(private _userRepo: UserRepository) {}

  async getAll(): Promise<Omit<User, 'password'>[]> {
    try {
      const result = await this._userRepo.getAll();

      return result.map((user) => {
        return {
          ...user,
          password: undefined,
        };
      });
    } catch (err) {
      throw err;
    }
  }

  async getById(id: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await this._userRepo.getById(id);
      return {
        id,
        login: user.login,
        version: user.version,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
    } catch (err) {
      throw err;
    }
  }

  create({ login, password }: Pick<User, 'login' | 'password'>): Promise<User> {
    const createdAt = new Date().getTime();
    return this._userRepo.create({
      login,
      password,
      createdAt,
      updatedAt: createdAt,
      version: 1,
    });
  }

  async updatePassword(userId: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this._userRepo.getById(userId);
    } catch (err) {
      throw err;
    }

    return this._userRepo.update(userId, {
      ...user,
      password,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    });
  }

  async delete(userId: string): Promise<void> {
    return this._userRepo.delete(userId);
  }
}
