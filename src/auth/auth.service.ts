import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../model';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { compareWithHash } from '../utils';
import { AuthLoginResult } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<UserEntity> {
    const result = await this.userService.getOneBy({
      login,
    });

    const arePasswordsEqual = await compareWithHash(password, result.password);

    if (result === null || !arePasswordsEqual) {
      return null;
    }

    return result;
  }

  async login(user: User): Promise<AuthLoginResult> {
    const payload = {
      userId: user.id,
      login: user.login,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20m',
      }),
    };
  }

  signup(login: string, password: string): Promise<Omit<User, 'password'>> {
    return this.userService.create({ login, password });
  }
}
