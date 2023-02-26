import { Global, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { LoggingInterceptor } from './logging.interceptor';
import { LoggingSerivce } from './logging.service';

@Global()
@Module({
  providers: [
    LoggingSerivce,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [LoggingSerivce],
})
export class LoggerModule {}
