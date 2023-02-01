import { Injectable } from '@nestjs/common';

import { User } from '../model';
import { UserRepository } from '../repository/user.repository';
import { CreateUserDTO } from './user.model';

@Injectable()
export class UserService {
  constructor(private _userRepo: UserRepository) {}

  getAll(): Promise<User[]> {
    return this._userRepo.getAll();
  }

  async getById(id: string): Promise<User> {
    try {
      return this._userRepo.getById(id);
    } catch (err) {
      throw new Error(`User with id ${id} doesn't exist`);
    }
  }

  create(createUserDTO: CreateUserDTO): Promise<User> {
    const createdAt = new Date().getTime();
    return this._userRepo.create({
      login: createUserDTO.login,
      password: createUserDTO.password,
      createdAt,
      updatedAt: createdAt,
      version: 1,
    });
  }

  async updatePassword(userId: string, password: string): Promise<User> {
    let user: User;

    try {
      user = await this.getById(userId);
    } catch (err) {
      throw new Error(`User with id ${userId} doesn't exist`);
    }

    return this._userRepo.update(userId, {
      ...user,
      password,
      version: user.version + 1,
      updatedAt: new Date().getTime(),
    });
  }

  async delete(userId: string): Promise<void> {
    try {
      await this._userRepo.delete(userId);
    } catch (err) {
      throw new Error(`User with id ${userId} doesn't exist`);
    }
  }
}
