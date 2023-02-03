import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { User } from '../model';
import { CreateUserDTO, UpdatePasswordDTO } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  getAll(): Promise<Omit<User, 'password'>[]> {
    return this._userService.getAll();
  }

  @Get(':id')
  getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    return this._userService.getById(id);
  }

  @Post()
  create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return this._userService.create(createUserDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<Omit<User, 'password'>> {
    return this._userService.updatePassword(id, updatePasswordDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this._userService.delete(id);
  }
}
