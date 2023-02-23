import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Req } from '@nestjs/common/decorators';

import { User } from '../model';
import { AuthLoginResult } from './auth.model';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() singupDTO: SignupDTO): Promise<Pick<User, 'id'>> {
    return {
      id: 'asd',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req): Promise<AuthLoginResult> {
    return this.authService.login(req.user);
  }
}
