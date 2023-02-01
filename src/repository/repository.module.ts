import { Module } from '@nestjs/common';

import { TrackRepository } from './track.repository';
import { UserRepository } from './user.repository';

@Module({
  imports: [],
  providers: [UserRepository, TrackRepository],
  exports: [UserRepository, TrackRepository],
})
export class RepositoryModule {}
