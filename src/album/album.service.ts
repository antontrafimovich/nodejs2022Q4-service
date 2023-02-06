import { Injectable } from '@nestjs/common';
import { ArtistRepository } from 'src/repository/artist.repository';

import { Album, Track } from '../model';
import { AlbumRepository } from '../repository/album.repository';
import { FavoritesRepository } from '../repository/favorites.repository';
import { TrackRepository } from '../repository/track.repository';
import { BadInputError } from '../utils';

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

  getById(id: string): Promise<Album> {
    return this._albumRepo.getById(id);
  }

  async create(album: Omit<Album, 'id'>): Promise<Album> {
    const { artistId } = album;

    try {
      if (artistId !== null) {
        await this._artistRepo.getById(artistId);
      }
    } catch {
      throw new BadInputError(
        `Can't create album, because artist with id ${artistId} doesn't exist`,
      );
    }

    return await this._albumRepo.create(album);
  }

  async update(albumId: string, album: Omit<Album, 'id'>): Promise<Album> {
    const { artistId } = album;

    try {
      if (artistId !== null) {
        await this._artistRepo.getById(artistId);
      }
    } catch {
      throw new BadInputError(
        `Can't update album, because artist with id ${artistId} doesn't exist`,
      );
    }

    return this._albumRepo.update(albumId, album);
  }

  async delete(albumId: string): Promise<void> {
    try {
      await this._albumRepo.delete(albumId);
    } catch (err) {
      throw err;
    }

    try {
      await this._favoritesRepo.delete({ type: 'album', entityId: albumId });
    } catch {}

    let albumTracks: Track[];
    try {
      albumTracks = await this._trackRepo.getMany(
        (track) => track.albumId === albumId,
      );
    } catch (err) {
      throw err;
    }

    try {
      const updateTracksPromises = albumTracks.map((track) =>
        this._trackRepo.update(track.id, { ...track, albumId: null }),
      );

      await Promise.all(updateTracksPromises);
    } catch (err) {
      throw err;
    }
  }
}
