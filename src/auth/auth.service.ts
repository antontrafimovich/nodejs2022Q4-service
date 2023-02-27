import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../model';
import { UserEntity } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';
import { compareWithHash, ForbiddenError } from '../utils';
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

  async refresh(refreshToken: string): Promise<AuthLoginResult> {
    const isValid = await this.jwtService.verifyAsync(refreshToken, {
      ignoreExpiration: false,
    });

    if (!isValid) {
      throw new ForbiddenError('Refresh token is invalid');
    }

    const { userId, login } = this.jwtService.decode(refreshToken, {
      json: true,
    }) as Record<string, any>;

    return {
      accessToken: await this.jwtService.signAsync({ userId, login }),
      refreshToken: await this.jwtService.signAsync(
        { userId, login },
        {
          expiresIn: '20m',
        },
      ),
    };
  }

  signup(login: string, password: string): Promise<Omit<User, 'password'>> {
    return this.userService.create({ login, password });
  }
}
