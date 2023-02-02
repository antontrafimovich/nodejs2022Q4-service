import { Module } from '@nestjs/common';

import { AlbumRepository } from './album.repository';
import { ArtistRepository } from './artist.repository';
import { FavoritesRepository } from './favorites.repository';
import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [
    UserRepository,
    TrackRepository,
    ArtistRepository,
    AlbumRepository,
    FavoritesRepository,
  ],
  exports: [
    UserRepository,
    TrackRepository,
    ArtistRepository,
    AlbumRepository,
    FavoritesRepository,
  ],
})
export class RepositoryModule {}
