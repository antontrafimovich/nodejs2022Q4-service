import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AlbumRepository } from 'src/repository/album.repository';

import { Album } from '../model';

@Injectable()
export class AlbumService {
  constructor(private _albumRepo: AlbumRepository) {}

  getAll(): Promise<Album[]> {
    return this._albumRepo.getAll();
  }

  async getById(id: string): Promise<Album> {
    try {
      return await this._albumRepo.getById(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  create(album: Omit<Album, 'id'>): Promise<Album> {
    return this._albumRepo.create(album);
  }

  async update(
    albumId: string,
    album: Partial<Omit<Album, 'id'>>,
  ): Promise<Album> {
    try {
      return await this._albumRepo.update(albumId, album);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async delete(albumId: string): Promise<void> {
    try {
      return await this._albumRepo.delete(albumId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
