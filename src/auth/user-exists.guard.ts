import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthDTO>();

    try {
      const result = await this.authService.validateUser(
        request.login,
        request.password,
      );

      if (result) {
        return false;
      }

      return true;
    } catch {}
  }
}
