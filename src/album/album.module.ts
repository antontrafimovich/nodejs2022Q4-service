import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ArtistEntity } from '../artist/entity/artist.entity';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';
import { AlbumEntity } from './entity/album.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AlbumEntity, ArtistEntity])],
  controllers: [AlbumController],
  providers: [AlbumService],
})
export class AlbumModule {}
