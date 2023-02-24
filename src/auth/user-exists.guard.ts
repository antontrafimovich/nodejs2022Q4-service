import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDTO } from './dto';

@Injectable()
export class UserExistsGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthDTO>();
    console.log(request);

    try {
      await this.authService.validateUser(request.login, request.password);
      return false;
    } catch {}

    return true;
  }
}
