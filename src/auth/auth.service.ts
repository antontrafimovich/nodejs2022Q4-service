import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../model';
import { UserService } from '../user/user.service';
import { AuthLoginResult } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  validateUser(
    login: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.getOneBy({
      login,
      password,
    });
  }

  async login(user: User): Promise<AuthLoginResult> {
    const payload = {
      sub: user.id,
      login: user.login,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
