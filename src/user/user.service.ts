import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async create({
    login,
    password,
  }: Pick<User, 'login' | 'password'>): Promise<Omit<User, 'password'>> {
    const createdAt = new Date().getTime();

    const user = await this._userRepo.create({
      login,
      password,
      createdAt,
      updatedAt: createdAt,
      version: 1,
    });

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
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    if (oldPassword !== user.password) {
      throw new HttpException(
        `Provided old password is wrong`,
        HttpStatus.FORBIDDEN,
      );
    }

    const result = await this._userRepo.update(userId, {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    });

    return {
      id: result.id,
      login: result.login,
      version: result.version,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    };
  }

  async delete(userId: string): Promise<void> {
    try {
      return await this._userRepo.delete(userId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
