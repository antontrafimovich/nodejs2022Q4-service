import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';

import { User } from '../model';
import { CreateUserDTO, UpdatePasswordDTO } from './user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Get()
  getAll(): Promise<Omit<User, 'password'>[]> {
    return this._userService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this._userService.getById(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    return this._userService.create(createUserDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<User> {
    return this._userService.updatePassword(id, updatePasswordDTO.newPassword);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._userService.delete(id);
  }
}
