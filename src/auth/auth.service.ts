import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

import { User } from '../model';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  validateUser(
    login: string,
    password: string,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.getOneBy({
      login,
      password,
    });
  }
}
