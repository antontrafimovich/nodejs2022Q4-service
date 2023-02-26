import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { AppModule } from './app.module';
import { LoggingSerivce } from './logger/logging.service';

dotenv.config();

const logger = new LoggingSerivce();

process.on('uncaughtException', (err) => {
  logger.error(`Uncaught exception - ${err}`);
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  logger.error(`Unhandled rejection - ${err}`);
  process.exit(0);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(logger);
  app.enableCors();
  const port = Number.isInteger(Number(process.env.PORT))
    ? Number(process.env.PORT)
    : 4000;

  await app.listen(port);
}
bootstrap();
