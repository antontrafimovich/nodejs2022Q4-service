import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}