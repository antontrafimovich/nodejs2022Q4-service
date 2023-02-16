import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { DBModule } from './db/db.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

dotenv.config();

@Module({
  imports: [
    DBModule.forRoot({ type: 'inMemory' }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      synchronize: true,
      autoLoadEntities: true,
    }),
    TrackModule,
    UserModule,
    ArtistModule,
    FavoritesModule,
    AlbumModule,
  ],
})
export class AppModule {}
