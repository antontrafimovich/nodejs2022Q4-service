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
import { ForbiddenError, NotFoundError } from '../utils';
import { CreateUserDTO, UpdatePasswordDTO } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Promise<Omit<User, 'password'>[]> {
    return this.userService.getAll();
  }

  @Get(':id')
  async getById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this.userService.getById(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }

  @Post()
  create(
    @Body() createUserDTO: CreateUserDTO,
  ): Promise<Omit<User, 'password'>> {
    return this.userService.create(createUserDTO);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<Omit<User, 'password'>> {
    try {
      return await this.userService.updatePassword(id, updatePasswordDTO);
    } catch (err) {
      if (err instanceof ForbiddenError) {
        throw new HttpException(err.message, HttpStatus.FORBIDDEN);
      }

      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    try {
      return await this.userService.delete(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }
}
