import { Module } from '@nestjs/common';

import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { DBModule } from './db/db.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    DBModule.forRoot({ type: 'inMemory' }),
    TrackModule,
    UserModule,
    ArtistModule,
    FavoritesModule,
    AlbumModule,
  ],
})
export class AppModule {}
