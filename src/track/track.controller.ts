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

import { Track } from '../model';
import { BadInputError, NotFoundError } from '../utils';
import { CreateTrackDTO, UpdateTrackDTO } from './dto';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private _trackService: TrackService) {}

  @Get()
  getAll(): Promise<Track[]> {
    return this._trackService.getAll();
  }

  @Get(':id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    try {
      return await this._trackService.getById(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }

  @Post()
  async create(@Body() createTrackDTO: CreateTrackDTO): Promise<Track> {
    try {
      return await this._trackService.create(createTrackDTO);
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
    @Body() updateTrackDTO: UpdateTrackDTO,
  ): Promise<Track> {
    try {
      return await this._trackService.update(id, updateTrackDTO);
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
      return await this._trackService.delete(id);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }
}
