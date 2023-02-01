import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Artist } from '../model';
import { CreateArtistDTO, UpdateArtistDTO } from './artist.model';
import { ArtistService } from './artist.service';

@Controller('artist')
export class ArtistController {
  constructor(private _artistService: ArtistService) {}

  @Get()
  getAll(): Promise<Artist[]> {
    return this._artistService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Artist> {
    console.log(id);
    return this._artistService.getById(id);
  }

  @Post()
  create(@Body() createArtistDTO: CreateArtistDTO): Promise<Artist> {
    console.log(createArtistDTO);
    return this._artistService.create(createArtistDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updateArtistDTO: UpdateArtistDTO,
  ): Promise<Artist> {
    return this._artistService.update(id, updateArtistDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._artistService.delete(id);
  }
}
