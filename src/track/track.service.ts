import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumEntity } from '../album/entity/album.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';
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
  ) {}

  async getAll(): Promise<Track[]> {
    const result = await this.trackRepository.find({
      relations: {
        artist: true,
        album: true,
      },
    });

    return result.map(this.mapTrackEntityToTrack);
  }

  async getById(id: string): Promise<Track> {
    try {
      const result = await this.trackRepository.findOneOrFail({
        where: { id },
        relations: {
          artist: true,
          album: true,
        },
      });

      return this.mapTrackEntityToTrack(result);
    } catch (err) {
      throw new NotFoundError(`Track with id ${id} doesn't exist.`);
    }
  }

  async create(track: Omit<Track, 'id'>): Promise<Track> {
    const { artistId, albumId } = track;

    let artist: ArtistEntity;
    try {
      artist = await this.getArtistById(artistId);
    } catch {
      throw new BadInputError(
        `Can't create track, because artist with id ${artistId} doesn't exist`,
      );
    }

    let album: AlbumEntity;
    try {
      album = await this.getAlbumById(albumId);
    } catch {
      throw new BadInputError(
        `Can't create track, because album with id ${albumId} doesn't exist`,
      );
    }

    try {
      const newTrack = this.trackRepository.create({
        name: track.name,
        artist,
        album,
        duration: track.duration,
      });

      const saveResult = await this.trackRepository.save(newTrack);

      return this.mapTrackEntityToTrack(saveResult);
    } catch (err) {
      throw err;
    }
  }

  async update(trackId: string, track: Omit<Track, 'id'>): Promise<Track> {
    const { artistId, albumId } = track;

    let artist: ArtistEntity;
    try {
      artist = await this.getArtistById(artistId);
    } catch {
      throw new BadInputError(
        `Can't update track, because artist with id ${artistId} doesn't exist`,
      );
    }

    let album: AlbumEntity;
    try {
      album = await this.getAlbumById(albumId);
    } catch {
      throw new BadInputError(
        `Can't update track, because album with id ${albumId} doesn't exist`,
      );
    }

    try {
      await this.getById(trackId);
    } catch (err) {
      throw err;
    }

    try {
      const saveResult = await this.trackRepository.save({
        id: trackId,
        name: track.name,
        album,
        artist,
        duration: track.duration,
      });

      return this.mapTrackEntityToTrack(saveResult);
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

    // await this.favoritesRepository.delete({
    //   type: 'track',
    //   entityId: trackId,
    // });
  }

  private async getAlbumById(id: string): Promise<AlbumEntity> {
    if (id === null) {
      return null;
    }

    return await this.albumRepository.findOneByOrFail({ id });
  }

  private async getArtistById(id: string): Promise<ArtistEntity> {
    if (id === null) {
      return null;
    }

    return await this.artistRepository.findOneByOrFail({ id });
  }

  private mapTrackEntityToTrack(entity: TrackEntity): Track {
    return {
      id: entity.id, // uuid v4
      name: entity.name,
      artistId: entity.artist?.id ?? null,
      albumId: entity.album?.id ?? null,
      duration: entity.duration,
    };
  }
}
