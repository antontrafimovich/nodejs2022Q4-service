import { Global, Module } from '@nestjs/common';

import { DB } from './db.model';
import { InMemoryDatabase } from './db.service';

@Global()
@Module({
  imports: [],
})
export class DBModule {
  static forRoot({ type }: { type: 'inMemory' }) {
    if (type === 'inMemory') {
      const providers = [
        {
          provide: DB,
          useClass: InMemoryDatabase,
        },
      ];

      return {
        module: DBModule,
        providers,
        exports: providers,
      };
    }
  }
}
