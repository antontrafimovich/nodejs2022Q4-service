import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumEntity } from '../album/entity/album.entity';
import { ArtistEntity } from '../artist/entity/artist.entity';
import { TrackEntity } from '../track/entity/track.entity';
import { AlbumFavoriteEntity } from './entity/album-favorite.entity';
import { ArtistFavoriteEntity } from './entity/artist-favorite.entity';
import { TrackFavoriteEntity } from './entity/track-favorite.entity';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AlbumEntity,
      ArtistEntity,
      TrackEntity,
      ArtistFavoriteEntity,
      AlbumFavoriteEntity,
      TrackFavoriteEntity,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
