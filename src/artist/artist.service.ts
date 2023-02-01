import { Injectable } from '@nestjs/common';
import { ArtistRepository } from 'src/repository/Artist.repository';

import { Artist } from '../model';

@Injectable()
export class ArtistService {
  constructor(private _artistRepo: ArtistRepository) {}

  getAll(): Promise<Artist[]> {
    return this._artistRepo.getAll();
  }

  async getById(id: string): Promise<Artist> {
    try {
      return this._artistRepo.getById(id);
    } catch (err) {
      this.throwArtistNotFoundError(id);
    }
  }

  create(artist: Omit<Artist, 'id'>): Promise<Artist> {
    return this._artistRepo.create(artist);
  }

  async update(artistId: string, artist: Omit<Artist, 'id'>): Promise<Artist> {
    try {
      return await this._artistRepo.update(artistId, artist);
    } catch (err) {
      this.throwArtistNotFoundError(artistId);
    }
  }

  async delete(artistId: string): Promise<void> {
    try {
      await this._artistRepo.delete(artistId);
    } catch (err) {
      this.throwArtistNotFoundError(artistId);
    }
  }

  private throwArtistNotFoundError(id: string) {
    throw new Error(`Artist with id ${id} doesn't exist`);
  }
}
