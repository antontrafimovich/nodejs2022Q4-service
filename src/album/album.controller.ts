import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { Album } from '../model';
import { CreateAlbumDTO, UpdateAlbumDTO } from './album.model';
import { AlbumService } from './album.service';

@Controller('album')
export class AlbumController {
  constructor(private _albumService: AlbumService) {}

  @Get()
  getAll(): Promise<Album[]> {
    return this._albumService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: string): Promise<Album> {
    console.log(id);
    return this._albumService.getById(id);
  }

  @Post()
  create(@Body() createAlbumDTO: CreateAlbumDTO): Promise<Album> {
    console.log(createAlbumDTO);
    return this._albumService.create(createAlbumDTO);
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ): Promise<Album> {
    return this._albumService.update(id, updateAlbumDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this._albumService.delete(id);
  }
}
