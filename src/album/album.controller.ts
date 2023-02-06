import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { BadInputError } from 'src/utils';

import { Album } from '../model';
import { AlbumService } from './album.service';
import { CreateAlbumDTO, UpdateAlbumDTO } from './dto';

@Controller('album')
export class AlbumController {
  constructor(private _albumService: AlbumService) {}

  @Get()
  getAll(): Promise<Album[]> {
    return this._albumService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
    try {
      return await this._albumService.getById(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  async create(@Body() createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    try {
      return await this._albumService.create(createAlbumDTO);
    } catch (err) {
      if (err instanceof BadInputError) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ): Promise<Album> {
    try {
      return await this._albumService.update(id, updateAlbumDTO);
    } catch (err) {
      if (err instanceof BadInputError) {
        throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(err.message, HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    try {
      return await this._albumService.delete(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
