import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { NotFoundError } from 'rxjs';

import { ConflictError, UnprocessableEntityError } from '../utils';
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
      if (err instanceof UnprocessableEntityError) {
        throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      if (err instanceof ConflictError) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }

      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  async deleteTrackFromFavorites(
    @Param('id', new ParseUUIDPipe()) trackId: string,
  ): Promise<void> {
    try {
      return await this._favoriteService.deleteTrackFromFavorites(trackId);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
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
      if (err instanceof UnprocessableEntityError) {
        throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      if (err instanceof ConflictError) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }

      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  async deleteAlbumFromFavorites(
    @Param('id', new ParseUUIDPipe()) albumId: string,
  ): Promise<void> {
    try {
      return await this._favoriteService.deleteAlbumFromFavorites(albumId);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
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
      if (err instanceof UnprocessableEntityError) {
        throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
      }

      if (err instanceof ConflictError) {
        throw new HttpException(err.message, HttpStatus.CONFLICT);
      }

      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  async deleteArtistFromFavorites(
    @Param('id', new ParseUUIDPipe()) artistId: string,
  ): Promise<void> {
    try {
      return await this._favoriteService.deleteArtistFromFavorites(artistId);
    } catch (err) {
      if (err instanceof NotFoundError) {
        throw new HttpException(err.message, HttpStatus.NOT_FOUND);
      }

      throw err;
    }
  }
}
