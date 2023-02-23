import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

import { User } from '../model';

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

  async login(user: User) {
    const payload = {
      sub: user.id,
      login: user.login,
    };

    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
