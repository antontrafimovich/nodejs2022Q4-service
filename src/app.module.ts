import { Module } from '@nestjs/common';

import { DBModule } from './db/db.module';
import { TrackModule } from './track/track.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DBModule.forRoot({ type: 'inMemory' }), TrackModule, UserModule],
})
export class AppModule {}
