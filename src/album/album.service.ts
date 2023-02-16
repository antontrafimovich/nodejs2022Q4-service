import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistEntity } from 'src/artist/entity/artist.entity';
import { FavoriteEntity } from 'src/favorites/entity/favorite.entity';
import { TrackEntity } from 'src/track/entity/track.entity';
import { Repository } from 'typeorm';

import { Album, Track } from '../model';
import { BadInputError, NotFoundError } from '../utils';
import { AlbumEntity } from './entity/album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
  ) {}

  getAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async getById(id: string): Promise<Album> {
    try {
      return await this.albumRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundError(`Album with id ${id} doesn't exist.`);
    }
  }

  async create(album: Omit<Album, 'id'>): Promise<Album> {
    const { artistId } = album;

    try {
      if (artistId !== null) {
        await this.artistRepository.findOneOrFail({ where: { id: artistId } });
      }
    } catch {
      throw new BadInputError(
        `Can't create album, because artist with id ${artistId} doesn't exist`,
      );
    }

    try {
      const newAlbum = this.albumRepository.create(album);

      return await this.albumRepository.save(newAlbum);
    } catch (err) {
      throw err;
    }
  }

  async update(albumId: string, album: Omit<Album, 'id'>): Promise<Album> {
    const { artistId } = album;

    try {
      if (artistId !== null) {
        await this.artistRepository.find({ where: { id: artistId } });
      }
    } catch {
      throw new BadInputError(
        `Can't update album, because artist with id ${artistId} doesn't exist`,
      );
    }

    let existingAlbum: Album;

    try {
      existingAlbum = await this.getById(albumId);
    } catch (err) {
      throw err;
    }

    try {
      return await this.albumRepository.save({
        ...existingAlbum,
        ...album,
        id: albumId,
      });
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

    let albumTracks: Track[];
    try {
      albumTracks = await this.trackRepository.find({ where: { albumId } });
    } catch (err) {
      throw err;
    }

    if (!albumTracks) {
      return;
    }

    try {
      const updatedTracks = albumTracks.map((track) => ({
        ...track,
        albumId: null,
      }));

      await this.trackRepository.save(updatedTracks);
    } catch (err) {
      throw err;
    }
  }
}
