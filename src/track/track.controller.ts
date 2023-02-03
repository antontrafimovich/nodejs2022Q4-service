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

import { Track } from '../model';
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
  getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Track> {
    return this._trackService.getById(id);
  }

  @Post()
  create(@Body() createTrackDTO: CreateTrackDTO): Promise<Track> {
    return this._trackService.create(createTrackDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ): Promise<Track> {
    return this._trackService.update(id, updateTrackDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this._trackService.delete(id);
  }
}
