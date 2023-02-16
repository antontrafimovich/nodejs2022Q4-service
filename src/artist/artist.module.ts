import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumEntity } from '../album/entity/album.entity';
import { FavoriteEntity } from '../favorites/entity/favorite.entity';
import { TrackEntity } from '../track/entity/track.entity';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistEntity } from './entity/artist.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavoriteEntity,
    ]),
  ],
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
