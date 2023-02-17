import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ArtistEntity } from '../artist/entity/artist.entity';
import { FavoriteEntity } from '../favorites/entity/favorite.entity';
import { Album, Artist } from '../model';
import { BadInputError, NotFoundError } from '../utils';
import { AlbumEntity } from './entity/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
  ) {}

  async getAll(): Promise<Album[]> {
    const results = await this.albumRepository.find({
      relations: {
        artist: true,
      },
    });

    return results.map(this.mapAlbumEntityToAlbum);
  }

  async getById(id: string): Promise<Album> {
    try {
      const album = await this.albumRepository.findOneOrFail({
        where: { id },
        relations: {
          artist: true,
        },
      });

      return this.mapAlbumEntityToAlbum(album);
    } catch (err) {
      throw new NotFoundError(`Album with id ${id} doesn't exist.`);
    }
  }

  async create(album: Omit<Album, 'id'>): Promise<Album> {
    const { artistId } = album;

    let artist: ArtistEntity;

    try {
      artist = await this.getArtistById(artistId);
    } catch {
      throw new BadInputError(
        `Can't create album, because artist with id ${artistId} doesn't exist`,
      );
    }

    try {
      const newAlbum = this.albumRepository.create({
        name: album.name,
        year: album.year,
        artist,
      });

      const result = await this.albumRepository.save(newAlbum);

      return this.mapAlbumEntityToAlbum(result);
    } catch (err) {
      throw err;
    }
  }

  async update(albumId: string, album: Omit<Album, 'id'>): Promise<Album> {
    const { artistId } = album;

    let artist: ArtistEntity;
    try {
      artist = await this.artistRepository.findOneByOrFail({ id: artistId });
    } catch {
      throw new BadInputError(
        `Can't update album, because artist with id ${artistId} doesn't exist`,
      );
    }

    try {
      await this.getById(albumId);
    } catch (err) {
      throw err;
    }

    try {
      const result = await this.albumRepository.save({
        id: albumId,
        name: album.name,
        year: album.year,
        artist,
      });

      return this.mapAlbumEntityToAlbum(result);
    } catch (err) {
      throw err;
    }
  }

  async delete(albumId: string): Promise<void> {
    const deleteAlbumResult = await this.albumRepository.delete({
      id: albumId,
    });

    if (deleteAlbumResult.affected === 0) {
      throw new NotFoundError(`Album with id ${albumId} wasn't found`);
    }

    await this.favoritesRepository.delete({
      type: 'album',
      entityId: albumId,
    });
  }

  private async getArtistById(id: string): Promise<ArtistEntity> {
    if (id === null) {
      return null;
    }

    return await this.artistRepository.findOneByOrFail({ id });
  }

  private mapAlbumEntityToAlbum(entity: AlbumEntity): Album {
    return {
      id: entity.id, // uuid v4
      name: entity.name,
      year: entity.year,
      artistId: entity.artist?.id ?? null,
    };
  }
}
