import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  imports: [RepositoryModule],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
