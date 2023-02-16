import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumEntity } from '../album/entity/album.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { TrackEntity } from '../track/entity/track.entity';
import { FavoriteEntity } from './entity/favorite.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      FavoriteEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
