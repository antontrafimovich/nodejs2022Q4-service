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
import { FavoriteEntity } from './entity/favorite.entity';
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
    @InjectRepository(FavoriteEntity)
    private favoritesRepository: Repository<FavoriteEntity>,
  ) {}

  async getAll(): Promise<FullfilledFavorites> {
    const favorites = await this.favoritesRepository.find();

    const favoritesMap = favorites.reduce(
      (result, next) => {
        if (next.type === 'artist') {
          return {
            ...result,
            artists: [...result.artists, next.entityId],
          };
        }

        if (next.type === 'album') {
          return {
            ...result,
            albums: [...result.albums, next.entityId],
          };
        }

        if (next.type === 'track') {
          return {
            ...result,
            tracks: [...result.tracks, next.entityId],
          };
        }
      },
      { artists: [], albums: [], tracks: [] } as Record<
        'artists' | 'albums' | 'tracks',
        string[]
      >,
    );

    const artists = await this.artistRepository.find({
      where: favoritesMap.artists.map((id) => ({ id })),
    });
    const albums = await this.albumRepository.find({
      where: favoritesMap.albums.map((id) => ({ id })),
    });
    const tracks = await this.trackRepository.find({
      where: favoritesMap.tracks.map((id) => ({ id })),
    });

    return {
      artists,
      albums: albums.map((album) => {
        return {
          id: album.id,
          name: album.name,
          year: album.year,
          artistId: album.artist.id,
        };
      }),
      tracks,
    };
  }

  async addTrackToFavorites(trackId: string): Promise<void> {
    try {
      await this.trackRepository.findOneOrFail({ where: { id: trackId } });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add track with id ${trackId} to favorites because this track doesn't exist`,
      );
    }

    try {
      await this.favoritesRepository.findOneOrFail({
        where: { entityId: trackId, type: 'track' },
      });

      throw new ConflictError(
        `Track with id ${trackId} has already been added to favorites`,
      );
    } catch {}

    try {
      const newFavoriteTrack = this.favoritesRepository.create({
        type: 'track',
        entityId: trackId,
      });

      await this.favoritesRepository.save(newFavoriteTrack);
    } catch (err) {
      throw err;
    }
  }

  async deleteTrackFromFavorites(trackId: string): Promise<void> {
    const result = await this.favoritesRepository.delete({ entityId: trackId });

    if (result.affected === 0) {
      throw new NotFoundError(
        `Track with id ${trackId} is not in faovrites list`,
      );
    }
  }

  async addAlbumToFavorites(albumId: string): Promise<void> {
    try {
      await this.albumRepository.findOneOrFail({ where: { id: albumId } });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add album with id ${albumId} to favorites because this album doesn't exist`,
      );
    }

    try {
      await this.favoritesRepository.findOneOrFail({
        where: { entityId: albumId, type: 'album' },
      });

      throw new ConflictError(
        `Album with id ${albumId} has already been added to favorites`,
      );
    } catch {}

    try {
      const newFavoriteAlbum = this.favoritesRepository.create({
        type: 'album',
        entityId: albumId,
      });

      await this.favoritesRepository.save(newFavoriteAlbum);
    } catch (err) {
      throw err;
    }
  }

  async deleteAlbumFromFavorites(albumId: string): Promise<void> {
    const result = await this.favoritesRepository.delete({ entityId: albumId });

    if (result.affected === 0) {
      throw new NotFoundError(
        `Album with id ${albumId} is not in faovrites list`,
      );
    }
  }

  async addArtistToFavorites(artistId: string): Promise<void> {
    try {
      await this.artistRepository.findOneOrFail({ where: { id: artistId } });
    } catch (err) {
      throw new UnprocessableEntityError(
        `Cannot add artist with id ${artistId} to favorites because this artist doesn't exist`,
      );
    }

    try {
      await this.favoritesRepository.findOneOrFail({
        where: { entityId: artistId, type: 'artist' },
      });

      throw new ConflictError(
        `Artist with id ${artistId} has already been added to favorites`,
      );
    } catch {}

    try {
      const newFavoriteArtist = this.favoritesRepository.create({
        type: 'artist',
        entityId: artistId,
      });

      await this.favoritesRepository.save(newFavoriteArtist);
    } catch (err) {
      throw err;
    }
  }

  async deleteArtistFromFavorites(artistId: string): Promise<void> {
    const result = await this.favoritesRepository.delete({
      entityId: artistId,
    });

    if (result.affected === 0) {
      throw new NotFoundError(
        `Artist with id ${artistId} is not in faovrites list`,
      );
    }
  }
}
