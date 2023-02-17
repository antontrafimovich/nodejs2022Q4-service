import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FavoriteEntity } from '../favorites/entity/favorite.entity';
import { Artist } from '../model';
import { NotFoundError } from '../utils';
import { ArtistEntity } from './entity/artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
  ) {}

  getAll(): Promise<Artist[]> {
    return this.artistRepository.find();
  }

  async getById(id: string): Promise<Artist> {
    try {
      return await this.artistRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundError(`Artist with id ${id} doesn't exist.`);
    }
  }

  async create(artist: Omit<Artist, 'id'>): Promise<Artist> {
    try {
      const newArtist = this.artistRepository.create(artist);

      return await this.artistRepository.save(newArtist);
    } catch (err) {
      throw err;
    }
  }

  async update(artistId: string, artist: Omit<Artist, 'id'>): Promise<Artist> {
    let existingArtist: Artist;

    try {
      existingArtist = await this.getById(artistId);
    } catch (err) {
      throw err;
    }

    try {
      return await this.artistRepository.save({
        ...existingArtist,
        ...artist,
        id: artistId,
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(artistId: string): Promise<void> {
    const deleteArtistResult = await this.artistRepository.delete(artistId);

    if (deleteArtistResult.affected === 0) {
      throw new NotFoundError(`Album with id ${artistId} wasn't found`);
    }

    await this.favoritesRepository.delete({
      type: 'artist',
      entityId: artistId,
    });
  }
}
