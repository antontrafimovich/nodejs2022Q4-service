import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Track } from '../model';
import { CreateTrackDTO, UpdateTrackDTO } from './track.model';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private _trackService: TrackService) {}

  @Get()
  getAll(): Promise<Track[]> {
    return this._trackService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Track> {
    console.log(id);
    return this._trackService.getById(id);
  }

  @Post()
  create(@Body() createTrackDTO: CreateTrackDTO): Promise<Track> {
    console.log(createTrackDTO);
    return this._trackService.create(createTrackDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updateTrackDTO: UpdateTrackDTO,
  ): Promise<Track> {
    return this._trackService.update(id, updateTrackDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._trackService.delete(id);
  }
}
