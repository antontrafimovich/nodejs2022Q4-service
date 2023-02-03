import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepository } from '../repository/artist.repository';

import { Artist } from '../model';

@Injectable()
export class ArtistService {
  constructor(private _artistRepo: ArtistRepository) {}

  getAll(): Promise<Artist[]> {
    return this._artistRepo.getAll();
  }

  async getById(id: string): Promise<Artist> {
    try {
      return await this._artistRepo.getById(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  create(artist: Omit<Artist, 'id'>): Promise<Artist> {
    return this._artistRepo.create(artist);
  }

  async update(
    artistId: string,
    artist: Partial<Omit<Artist, 'id'>>,
  ): Promise<Artist> {
    try {
      return await this._artistRepo.update(artistId, artist);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async delete(artistId: string): Promise<void> {
    try {
      await this._artistRepo.delete(artistId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
