import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AlbumModule } from './album/album.module';
import { AppController } from './app.controller';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { FavoritesModule } from './favorites/favorites.module';
import { dataSourceOptions } from './ormconfig';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    TrackModule,
    UserModule,
    ArtistModule,
    FavoritesModule,
    AlbumModule,
    AuthModule,
  ],
})
export class AppModule {}
