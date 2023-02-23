import { Body, Controller, Post, UseGuards } from '@nestjs/common';

import { User } from '../model';
import { CreateUserDTO } from '../user/dto';
import { AuthLoginResponse } from './auth.model';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  @Post('signup')
  async signup(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<Pick<User, 'id'>> {
    return {
      id: 'asd',
    };
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<AuthLoginResponse> {
    return {
      accessToken: 'asd',
    };
  }
}
