import { ConsoleLogger, Injectable } from '@nestjs/common';
import { appendFile } from 'fs/promises';

import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class LoggingSerivce extends ConsoleLogger {
  private fileName = 'log/all.log';

  private logLevels = ['error', 'warn', 'log', 'verbose', 'debug'];

  public async logRequestData(req: any) {
    const { url, query, body } = req;

    const urlString = `url: ${url}`;

    const queryString = Object.keys(query).reduce((result, next) => {
      if (result === null) {
        return `query: ${next}=${query[next]}`;
      }

      return `${result} ${next}=${query[next]}`;
    }, null);

    const bodyString = Object.keys(body).reduce((result, next) => {
      if (result === null) {
        return `body: ${next}=${body[next]}`;
      }

      return `${result} ${next}=${body[next]}`;
    }, null);

    const resultString = [urlString, queryString, bodyString]
      .filter((v) => v !== null)
      .join('; ');

    this.log(resultString);

    await appendFile(this.fileName, resultString);
  }

  error(message: any, stack?: string, context?: string) {
    if (+process.env.LOGGING_LEVEL < 1) {
      return;
    }

    super.log(message, stack, context);
  }

  warn(message: any, stack?: string, context?: string) {
    if (+process.env.LOGGING_LEVEL < 2) {
      return;
    }

    super.log(message, stack, context);
  }

  log(message: any, stack?: string, context?: string) {
    if (+process.env.LOGGING_LEVEL < 3) {
      return;
    }

    super.log(message, stack, context);
  }

  verbose(message: any, stack?: string, context?: string) {
    if (+process.env.LOGGING_LEVEL < 4) {
      return;
    }

    super.log(message, stack, context);
  }

  debug(message: any, stack?: string, context?: string) {
    if (+process.env.LOGGING_LEVEL < 5) {
      return;
    }

    super.log(message, stack, context);
  }
}
