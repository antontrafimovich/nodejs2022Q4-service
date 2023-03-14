import { Injectable } from '@nestjs/common';
import { ForbiddenError } from 'src/utils';

import { User } from '../model';
import { UserRepository } from '../repository/user.repository';
import { UpdatePasswordDTO } from './dto';

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

  async create({
    login,
    password,
  }: Pick<User, 'login' | 'password'>): Promise<Omit<User, 'password'>> {
    const createdAt = new Date().getTime();

    let user: User;

    try {
      user = await this._userRepo.create({
        login,
        password,
        createdAt,
        updatedAt: createdAt,
        version: 1,
      });
    } catch (err) {
      throw err;
    }

    return {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async updatePassword(
    userId: string,
    { oldPassword, newPassword }: UpdatePasswordDTO,
  ): Promise<Omit<User, 'password'>> {
    let user: User;

    try {
      user = await this._userRepo.getById(userId);
    } catch (err) {
      throw err;
    }

    if (oldPassword !== user.password) {
      throw new ForbiddenError(`Provided old password is wrong`);
    }

    let result: User;

    try {
      result = await this._userRepo.update(userId, {
        ...user,
        password: newPassword,
        version: user.version + 1,
        updatedAt: new Date().getTime(),
      });
    } catch (err) {
      throw err;
    }

    return {
      id: result.id,
      login: result.login,
      version: result.version,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  delete(userId: string): Promise<void> {
    return this._userRepo.delete(userId);
  }
}
