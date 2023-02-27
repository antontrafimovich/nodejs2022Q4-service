import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';

import { User } from '../model';
import { AuthLoginResult } from './auth.model';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './utils';
import { ValidLoginParams } from './valid-login-params.guard';

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
  @UseGuards(ValidLoginParams, LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<AuthLoginResult> {
    return this.authService.login(req.user);
  }
}
