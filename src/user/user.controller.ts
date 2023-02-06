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
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';

import { User } from '../model';
import { ForbiddenError } from '../utils';
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
  create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return this._userService.create(createUserDTO);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this._userService.updatePassword(id, updatePasswordDTO);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }

      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    try {
      return await this._userService.delete(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
