import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumEntity } from '../album/entity/album.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { FavoriteEntity } from '../favorites/entity/favorite.entity';
import { Track } from '../model';
import { BadInputError, NotFoundError } from '../utils';
import { TrackEntity } from './entity/track.entity';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
  ) {}

  getAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async getById(id: string): Promise<Track> {
    try {
      return await this.trackRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new NotFoundError(`Track with id ${id} doesn't exist.`);
    }
  }

  async create(track: Omit<Track, 'id'>): Promise<Track> {
    const { artistId, albumId } = track;

    try {
      if (artistId !== null) {
        await this.artistRepository.findOneOrFail({ where: { id: artistId } });
      }
    } catch {
      throw new BadInputError(
        `Can't create track, because artist with id ${artistId} doesn't exist`,
      );
    }

    try {
      if (albumId !== null) {
        await this.albumRepository.findOneOrFail({ where: { id: albumId } });
      }
    } catch {
      throw new BadInputError(
        `Can't create track, because album with id ${albumId} doesn't exist`,
      );
    }

    try {
      const newTrack = this.trackRepository.create(track);

      return await this.trackRepository.save(newTrack);
    } catch (err) {
      throw err;
    }
  }

  async update(trackId: string, track: Omit<Track, 'id'>): Promise<Track> {
    const { artistId, albumId } = track;

    try {
      if (artistId !== null) {
        await this.artistRepository.findOneOrFail({ where: { id: artistId } });
      }
    } catch {
      throw new BadInputError(
        `Can't update track, because artist with id ${artistId} doesn't exist`,
      );
    }

    try {
      if (albumId !== null) {
        await this.albumRepository.findOneOrFail({ where: { id: albumId } });
      }
    } catch {
      throw new BadInputError(
        `Can't update track, because album with id ${albumId} doesn't exist`,
      );
    }

    let existingTrack: Track;

    try {
      existingTrack = await this.getById(trackId);
    } catch (err) {
      throw err;
    }

    try {
      return await this.trackRepository.save({
        ...existingTrack,
        ...track,
        id: trackId,
      });
    } catch (err) {
      throw err;
    }
  }

  async delete(trackId: string): Promise<void> {
    const deleteTrackResult = await this.trackRepository.delete({
      id: trackId,
    });

    if (deleteTrackResult.affected === 0) {
      throw new NotFoundError(`Track with id ${trackId} wasn't found`);
    }

    await this.favoritesRepository.delete({
      type: 'track',
      entityId: trackId,
    });
  }
}
