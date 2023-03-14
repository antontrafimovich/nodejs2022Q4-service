import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from '../model';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = User>(err: any, user: TUser): TUser {
    if (!user) {
      throw new ForbiddenException(
        "User with such login and password combination doesn't exist",
      );
    }

    if (err) {
      throw err;
    }

    return user;
  }
}
