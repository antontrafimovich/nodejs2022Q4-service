import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AlbumEntity } from '../album/entity/album.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { TrackEntity } from '../track/entity/track.entity';
import {
  ConflictError,
  NotFoundError,
  UnprocessableEntityError,
} from '../utils';
import { AlbumFavoriteEntity } from './entity/album-favorite.entity';
import { ArtistFavoriteEntity } from './entity/artist-favorite.entity';
import { TrackFavoriteEntity } from './entity/track-favorite.entity';
import { FullfilledFavorites } from './favorites.model';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(ArtistEntity)
    private artistRepository: Repository<ArtistEntity>,
    @InjectRepository(AlbumEntity)
    private albumRepository: Repository<AlbumEntity>,
    @InjectRepository(TrackEntity)
    private trackRepository: Repository<TrackEntity>,
    @InjectRepository(ArtistFavoriteEntity)
    private aristFavoritesRepository: Repository<ArtistFavoriteEntity>,
    @InjectRepository(AlbumFavoriteEntity)
    private albumFavoritesRepository: Repository<AlbumFavoriteEntity>,
    @InjectRepository(TrackFavoriteEntity)
    private trackFavoritesRepository: Repository<TrackFavoriteEntity>,
  ) {}

  async getAll(): Promise<FullfilledFavorites> {
    const artistEntities = await this.aristFavoritesRepository.find({
      relations: {
        artist: true,
      },
    });

    const albumEntities = await this.albumFavoritesRepository.find({
      relations: {
        album: {
          artist: true,
        },
      },
    });

    const trackEntities = await this.trackFavoritesRepository.find({
      relations: {
        track: {
          artist: true,
          album: true,
        },
      },
    });

    return {
      artists: artistEntities.map((entity) => entity.artist),
      albums: albumEntities.map(({ album }) => {
        return {
          id: album.id,
          name: album.name,
          year: album.year,
          artistId: album.artist?.id ?? null,
        };
      }),
      tracks: trackEntities.map(({ track }) => {
        return {
          id: track.id,
          name: track.name,
          albumId: track.album?.id ?? null,
          artistId: track.artist?.id ?? null,
          duration: track.duration,
        };
      }),
    };
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    let track: TrackEntity;

    try {
      track = await this.trackRepository.findOneByOrFail({ id: trackId });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add track with id ${trackId} to favorites because this track doesn't exist`,
      );
    }

    try {
      await this.trackFavoritesRepository.findOneByOrFail({ track });

      throw new ConflictError(
        `Track with id ${trackId} has already been added to favorites`,
      );
    } catch {}

    try {
      const newFavoriteTrack = this.trackFavoritesRepository.create({
        track,
      });

      await this.trackFavoritesRepository.save(newFavoriteTrack);
    } catch (err) {
      throw err;
    }
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    let track: TrackEntity;

    try {
      track = await this.trackRepository.findOneByOrFail({ id: trackId });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add track with id ${trackId} to favorites because this track doesn't exist`,
      );
    }

    const result = await this.trackFavoritesRepository.delete({ track });

    if (result.affected === 0) {
      throw new NotFoundError(
        `Track with id ${trackId} is not in faovrites list`,
      );
    }
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    let album: AlbumEntity;

    try {
      album = await this.albumRepository.findOneByOrFail({ id: albumId });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add album with id ${albumId} to favorites because this album doesn't exist`,
      );
    }

    try {
      await this.albumFavoritesRepository.findOneByOrFail({ album });

      throw new ConflictError(
        `Album with id ${albumId} has already been added to favorites`,
      );
    } catch {}

    try {
      const newFavoriteAlbum = this.albumFavoritesRepository.create({
        album,
      });

      await this.albumFavoritesRepository.save(newFavoriteAlbum);
    } catch (err) {
      throw err;
    }
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    let album: AlbumEntity;

    try {
      album = await this.albumRepository.findOneByOrFail({ id: albumId });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add album with id ${albumId} to favorites because this album doesn't exist`,
      );
    }

    const result = await this.albumFavoritesRepository.delete({ album });

    if (result.affected === 0) {
      throw new NotFoundError(
        `Album with id ${albumId} is not in faovrites list`,
      );
    }
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    let artist: ArtistEntity;

    try {
      artist = await this.artistRepository.findOneOrFail({
        where: { id: artistId },
      });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add artist with id ${artistId} to favorites because this artist doesn't exist`,
      );
    }

    try {
      await this.aristFavoritesRepository.findOneOrFail({
        where: { artist },
      });

      throw new ConflictError(
        `Artist with id ${artistId} has already been added to favorites`,
      );
    } catch {}

    try {
      const newFavoriteArtist = this.aristFavoritesRepository.create({
        artist,
      });

      await this.aristFavoritesRepository.save(newFavoriteArtist);
    } catch (err) {
      throw err;
    }
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    let artist: ArtistEntity;

    try {
      artist = await this.artistRepository.findOneOrFail({
        where: { id: artistId },
      });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add artist with id ${artistId} to favorites because this artist doesn't exist`,
      );
    }

    const result = await this.aristFavoritesRepository.delete({
      artist,
    });

    if (result.affected === 0) {
      throw new NotFoundError(
        `Artist with id ${artistId} is not in faovrites list`,
      );
    }
  }
}
