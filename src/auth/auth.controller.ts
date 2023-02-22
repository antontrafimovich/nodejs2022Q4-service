import { Body, Controller, Post } from '@nestjs/common';

import { User } from '../model';
import { CreateUserDTO } from '../user/dto';
import { AuthLoginResponse } from './auth.model';

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

  @Post('login')
  async login(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<AuthLoginResponse> {
    return {
      accessToken: 'asd',
    };
  }
}
