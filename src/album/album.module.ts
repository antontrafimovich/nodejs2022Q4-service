import { Module } from '@nestjs/common';

import { RepositoryModule } from '../repository/repository.module';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  imports: [RepositoryModule],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
