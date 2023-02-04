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
  getById(@Param('id', new ParseUUIDPipe()) id: string): Promise<Album> {
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDTO: UpdateAlbumDTO,
  ): Promise<Album> {
    return this._albumService.update(id, updateAlbumDTO);
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this._albumService.delete(id);
  }
}
