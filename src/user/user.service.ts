import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../model';
import { ForbiddenError, NotFoundError } from '../utils';
import { UpdatePasswordDTO } from './dto';
import { UserEntity } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<Omit<User, 'password'>[]> {
    try {
      const result = await this.userRepository.find();

      return result.map(this.mapUserEntityToUser);
    } catch (err) {
      throw err;
    }
  }

  async getOneBy(params: Partial<UserEntity>): Promise<Omit<User, 'password'>> {
    const result = await this.userRepository.findOneBy(params);

    if (result === null) {
      return null;
    }

    return this.mapUserEntityToUser(result);
  }

  async getById(id: string): Promise<Omit<User, 'password'>> {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { id } });

      return this.mapUserEntityToUser(user);
    } catch (err) {
      throw new NotFoundError(`User with id ${id} doesn't exist`);
    }
  }

  async create({
    login,
    password,
  }: Pick<User, 'login' | 'password'>): Promise<Omit<User, 'password'>> {
    const createdAt = new Date().getTime();

    let user: UserEntity;

    try {
      const newUser = this.userRepository.create({
        login,
        password,
        createdAt: createdAt.toString(),
        updatedAt: createdAt.toString(),
        version: 1,
      });

      user = await this.userRepository.save(newUser);
    } catch (err) {
      throw err;
    }

    return this.mapUserEntityToUser(user);
  }

  async updatePassword(
    userId: string,
    { oldPassword, newPassword }: UpdatePasswordDTO,
  ): Promise<Omit<User, 'password'>> {
    let user: UserEntity;

    try {
      user = await this.userRepository.findOneByOrFail({
        id: userId,
        password: oldPassword,
      });
    } catch (err) {
      throw new NotFoundError(`User with id ${userId} doesn't exist`);
    }

    if (oldPassword !== user.password) {
      throw new ForbiddenError(`Provided old password is wrong`);
    }

    let updatedUser: UserEntity;

    try {
      updatedUser = await this.userRepository.save({
        ...user,
        password: newPassword,
        version: user.version + 1,
        updatedAt: new Date().getTime().toString(),
      });
    } catch (err) {
      throw err;
    }

    return this.mapUserEntityToUser(updatedUser);
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userRepository.delete(userId);

    if (result.affected === 0) {
      throw new NotFoundError(`User with id ${userId} wasn't found`);
    }
  }

  private mapUserEntityToUser(entity: UserEntity): Omit<User, 'password'> {
    return {
      id: entity.id,
      login: entity.login,
      version: entity.version,
      createdAt: parseInt(entity.createdAt),
      updatedAt: parseInt(entity.updatedAt),
    };
  }
}
