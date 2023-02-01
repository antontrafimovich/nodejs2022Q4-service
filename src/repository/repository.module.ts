import { Module } from '@nestjs/common';

import { ArtistRepository } from './artist.repository';
import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [UserRepository, TrackRepository, ArtistRepository],
  exports: [UserRepository, TrackRepository, ArtistRepository],
})
export class RepositoryModule {}
