import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  ForbiddenException,
} from '@nestjs/common';

import { User } from '../model';
import { ForbiddenError } from '../utils';
import { AuthLoginResult } from './auth.model';
import { AuthService } from './auth.service';
import { AuthDTO, RefreshDTO } from './dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './utils';
import { ValidLoginParamsGuard } from './valid-login-params.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  // @UseGuards(UserExistsGuard)
  @Post('signup')
  async signup(
    @Body() { login, password }: AuthDTO,
  ): Promise<Pick<User, 'id'>> {
    return this.authService.signup(login, password);
  }

  @Public()
  @UseGuards(ValidLoginParamsGuard, LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<AuthLoginResult> {
    return this.authService.login(req.user);
  }

  @Public()
  @Post('refresh')
  async refresh(
    @Body() { refreshToken }: RefreshDTO,
  ): Promise<AuthLoginResult> {
    try {
      return await this.authService.refresh(refreshToken);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new ForbiddenException(err.message);
      }

      throw err;
    }
  }
}
