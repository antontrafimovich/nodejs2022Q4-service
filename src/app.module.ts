import { Module } from '@nestjs/common';

import { DBModule } from './db/db.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DBModule.forRoot({ type: 'inMemory' }), UserModule],
})
export class AppModule {}
