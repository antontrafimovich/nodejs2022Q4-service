import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FavoritesRepository } from 'src/repository/favorites.repository';

import { Album, Artist, Track } from '../model';
import { AlbumRepository } from '../repository/album.repository';
import { ArtistRepository } from '../repository/artist.repository';
import { TrackRepository } from '../repository/track.repository';

@Injectable()
export class ArtistService {
  constructor(
    private _artistRepo: ArtistRepository,
    private _trackRepo: TrackRepository,
    private _albumRepo: AlbumRepository,
    private _favoritesRepo: FavoritesRepository,
  ) {}

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

    try {
      await this._favoritesRepo.delete({ type: 'artist', entityId: artistId });
    } catch {}

    let artistTracks: Track[];

    try {
      artistTracks = await this._trackRepo.getMany(
        (track) => track.artistId === artistId,
      );
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    try {
      const updateTracksPromises = artistTracks.map((track) =>
        this._trackRepo.update(track.id, { artistId: null }),
      );

      await Promise.all(updateTracksPromises);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    let artistAlbums: Album[];

    try {
      artistAlbums = await this._albumRepo.getMany(
        (album) => album.artistId === artistId,
      );
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    try {
      const updateAlbumsPromises = artistAlbums.map((album) =>
        this._albumRepo.update(album.id, { artistId: null }),
      );

      await Promise.all(updateAlbumsPromises);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
