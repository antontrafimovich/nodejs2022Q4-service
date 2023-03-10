import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../model';
import { compareWithHash, ForbiddenError, hash, NotFoundError } from '../utils';
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

  async getOneBy(params: Partial<UserEntity>): Promise<UserEntity> {
    const result = await this.userRepository.findOneBy(params);

    if (result === null) {
      return null;
    }

    return result;
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

    const hashedPassword = await hash(password);

    try {
      const newUser = this.userRepository.create({
        login,
        password: hashedPassword,
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
      });
    } catch (err) {
      throw new NotFoundError(
        `User with id ${userId} and password combination doesn't exist`,
      );
    }

    const arePasswordsEqual = await compareWithHash(oldPassword, user.password);

    if (!arePasswordsEqual) {
      throw new ForbiddenError(`Provided old password is wrong`);
    }

    let updatedUser: UserEntity;

    const hashedNewPassword = await hash(newPassword);

    try {
      updatedUser = await this.userRepository.save({
        ...user,
        password: hashedNewPassword,
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
