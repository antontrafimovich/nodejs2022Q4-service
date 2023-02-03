import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { FullfilledFavorites } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private _favoriteService: FavoritesService) {}

  @Get()
  getAll(): Promise<FullfilledFavorites> {
    return this._favoriteService.getAll();
  }

  @Post('track/:id')
  async addTrackToFavorites(
    @Param('id', new ParseUUIDPipe()) trackId: string,
  ): Promise<{ message: string }> {
    try {
      await this._favoriteService.addTrackToFavorites(trackId);

      return {
        message: `Track ${trackId} has been successfully added to favorites`,
      };
    } catch (err) {
      throw err;
    }
  }

  @Delete('track/:id')
  async deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe()) trackId: string,
  ): Promise<void> {
    return this._favoriteService.deleteTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  async addAlbumToFavorites(
    @Param('id', new ParseUUIDPipe()) album: string,
  ): Promise<{ message: string }> {
    try {
      await this._favoriteService.addAlbumToFavorites(album);

      return {
        message: `Album ${album} has been successfully added to favorites`,
      };
    } catch (err) {
      throw err;
    }
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe()) albumId: string,
  ): Promise<void> {
    return this._favoriteService.deleteAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  async addArtistToFavorites(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<{ message: string }> {
    try {
      await this._favoriteService.addArtistToFavorites(artistId);

      return {
        message: `Artist ${artistId} has been successfully added to favorites`,
      };
    } catch (err) {
      throw err;
    }
  }

  @Delete('artist/:id')
  deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<void> {
    return this._favoriteService.deleteArtistFromFavorites(artistId);
  }
}
