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
import { HttpCode } from '@nestjs/common/decorators';

import { Artist } from '../model';
import { NotFoundError } from '../utils';
import { ArtistService } from './artist.service';
import { CreateArtistDTO, UpdateArtistDTO } from './dto';

@Controller('artist')
export class ArtistController {
  constructor(private _artistService: ArtistService) {}

  @Get()
  getAll(): Promise<Artist[]> {
    return this._artistService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    try {
      return await this._artistService.getById(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }

  @Post()
  async create(@Body() createArtistDTO: CreateArtistDTO): Promise<Artist> {
    try {
      return await this._artistService.create(createArtistDTO);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ): Promise<Artist> {
    try {
      return await this._artistService.update(id, updateArtistDTO);
    } catch (err) {
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
      return await this._artistService.delete(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }
}
