import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

import { FullfieldFavorites } from './favorites.model';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private _favoriteService: FavoritesService) {}

  @Get()
  getAll(): Promise<FullfieldFavorites> {
    return this._favoriteService.getAll();
  }

  @Post('track/:id')
  async addTrackToFavorites(@Param('id') trackId: string): Promise<string> {
    try {
      await this._favoriteService.addTrackToFavorites(trackId);
    } catch (err) {
      throw err;
    }

    return 'Success';
  }

  @Delete('track/:id')
  async deleteTrackFromFavorites(
    @Param('id') trackId: string,
  ): Promise<string> {
    try {
      await this._favoriteService.deleteTrackFromFavorites(trackId);
    } catch (err) {
      throw err;
    }

    return 'Success';
  }

  @Post('album/:id')
  async addAlbumToFavorites(@Param('id') trackId: string): Promise<string> {
    try {
      await this._favoriteService.addTrackToFavorites(trackId);
    } catch (err) {
      throw err;
    }

    return 'Success';
  }

  @Delete('album/:id')
  async deleteAlbumFromFavorites(
    @Param('id') albumId: string,
  ): Promise<string> {
    try {
      await this._favoriteService.deleteAlbumFromFavorites(albumId);
    } catch (err) {
      throw err;
    }

    return 'Success';
  }

  @Post('artist/:id')
  async addArtistToFavorites(@Param('id') artistId: string): Promise<string> {
    try {
      await this._favoriteService.addArtistToFavorites(artistId);
    } catch (err) {
      throw err;
    }

    return 'Success';
  }

  @Delete('artist/:id')
  async deleteArtistFromFavorites(
    @Param('id') artistId: string,
  ): Promise<string> {
    try {
      await this._favoriteService.deleteArtistFromFavorites(artistId);
    } catch (err) {
      throw err;
    }

    return 'Success';
  }
}
