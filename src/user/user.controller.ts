import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
  getAll(): Promise<User[]> {
    return this._userService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<User> {
    console.log(id);
    return this._userService.getById(id);
  }

  @Post()
  create(@Body() createUserDTO: CreateUserDTO): Promise<User> {
    console.log(createUserDTO);
    return this._userService.create(createUserDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDTO: UpdatePasswordDTO,
  ): Promise<User> {
    console.log(updatePasswordDTO);
    return this._userService.updatePassword(id, updatePasswordDTO.newPassword);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._userService.delete(id);
  }
}
