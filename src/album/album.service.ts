import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistRepository } from 'src/repository/artist.repository';

import { Album, Track } from '../model';
import { AlbumRepository } from '../repository/album.repository';
import { FavoritesRepository } from '../repository/favorites.repository';
import { TrackRepository } from '../repository/track.repository';

@Injectable()
export class AlbumService {
  constructor(
    private _albumRepo: AlbumRepository,
    private _trackRepo: TrackRepository,
    private _artistRepo: ArtistRepository,
    private _favoritesRepo: FavoritesRepository,
  ) {}

  getAll(): Promise<Album[]> {
    return this._albumRepo.getAll();
  }

  async getById(id: string): Promise<Album> {
    try {
      return await this._albumRepo.getById(id);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async create(album: Omit<Album, 'id'>): Promise<Album> {
    const { artistId } = album;

    try {
      if (artistId !== null) {
        await this._artistRepo.getById(artistId);
      }
    } catch {
      throw new HttpException(
        `Can't create album, because artist with id ${artistId} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    }

    return await this._albumRepo.create(album);
  }

  async update(
    albumId: string,
    album: Partial<Omit<Album, 'id'>>,
  ): Promise<Album> {
    try {
      return await this._albumRepo.update(albumId, album);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async delete(albumId: string): Promise<void> {
    try {
      await this._albumRepo.delete(albumId);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    try {
      await this._favoritesRepo.delete({ type: 'album', entityId: albumId });
    } catch {}

    let albumTracks: Track[];
    try {
      albumTracks = await this._trackRepo.getMany(
        (track) => track.albumId === albumId,
      );
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }

    try {
      const updateTracksPromises = albumTracks.map((track) =>
        this._trackRepo.update(track.id, { albumId: null }),
      );

      await Promise.all(updateTracksPromises);
    } catch ({ message }) {
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }
}
