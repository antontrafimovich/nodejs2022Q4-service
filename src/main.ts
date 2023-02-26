import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { LoggingSerivce } from './logger/logging.service';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.enableCors();
  app.useLogger(app.get(LoggingSerivce));
  const port = Number.isInteger(Number(process.env.PORT))
    ? Number(process.env.PORT)
    : 4000;
  await app.listen(port);
}
bootstrap();
