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
import { BadInputError, NotFoundError } from 'src/utils';

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
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
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

      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
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
      return await this._albumService.delete(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }
}
