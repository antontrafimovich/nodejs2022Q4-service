import { Injectable } from '@nestjs/common';
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
      return this._albumRepo.getById(id);
    } catch (err) {
      this.throwAlbumNotFoundError(id);
    }
  }

  create(album: Omit<Album, 'id'>): Promise<Album> {
    return this._albumRepo.create(album);
  }

  async update(albumId: string, album: Omit<Album, 'id'>): Promise<Album> {
    try {
      return await this._albumRepo.update(albumId, album);
    } catch (err) {
      this.throwAlbumNotFoundError(albumId);
    }
  }

  async delete(albumId: string): Promise<void> {
    try {
      await this._albumRepo.delete(albumId);
    } catch (err) {
      this.throwAlbumNotFoundError(albumId);
    }
  }

  private throwAlbumNotFoundError(id: string) {
    throw new Error(`Album with id ${id} doesn't exist`);
  }
}
