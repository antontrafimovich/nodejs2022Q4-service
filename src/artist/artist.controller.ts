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

import { Artist } from '../model';
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
  getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Artist> {
    return this._artistService.getById(id);
  }

  @Post()
  create(@Body() createArtistDTO: CreateArtistDTO): Promise<Artist> {
    return this._artistService.create(createArtistDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ): Promise<Artist> {
    return this._artistService.update(id, updateArtistDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this._artistService.delete(id);
  }
}
