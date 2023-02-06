import { Injectable } from '@nestjs/common';

import { Album, Artist, Track } from '../model';
import { AlbumRepository } from '../repository/album.repository';
import { ArtistRepository } from '../repository/artist.repository';
import { FavoritesRepository } from '../repository/favorites.repository';
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

  getById(id: string): Promise<Artist> {
    return this._artistRepo.getById(id);
  }

  create(artist: Omit<Artist, 'id'>): Promise<Artist> {
    return this._artistRepo.create(artist);
  }

  update(artistId: string, artist: Omit<Artist, 'id'>): Promise<Artist> {
    return this._artistRepo.update(artistId, artist);
  }

  async delete(artistId: string): Promise<void> {
    try {
      await this._artistRepo.delete(artistId);
    } catch (err) {
      throw err;
    }

    try {
      await this._favoritesRepo.delete({ type: 'artist', entityId: artistId });
    } catch {}

    let artistTracks: Track[];

    try {
      artistTracks = await this._trackRepo.getMany(
        (track) => track.artistId === artistId,
      );
    } catch (err) {
      throw err;
    }

    try {
      const updateTracksPromises = artistTracks.map((track) =>
        this._trackRepo.update(track.id, { ...track, artistId: null }),
      );

      await Promise.all(updateTracksPromises);
    } catch (err) {
      throw err;
    }

    let artistAlbums: Album[];

    try {
      artistAlbums = await this._albumRepo.getMany(
        (album) => album.artistId === artistId,
      );
    } catch (err) {
      throw err;
    }

    try {
      const updateAlbumsPromises = artistAlbums.map((album) =>
        this._albumRepo.update(album.id, { ...album, artistId: null }),
      );

      await Promise.all(updateAlbumsPromises);
    } catch (err) {
      throw err;
    }
  }
}
