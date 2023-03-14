import { ConsoleLogger, Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { appendFileSync } from 'fs';
import { appendFile } from 'fs/promises';

dotenv.config();

@Injectable()
export class LoggingSerivce extends ConsoleLogger {
  private commonLogsFileName = './all.log';
  private errorLogsFileName = './error.log';

  private logLevel = +process.env.LOGGING_LEVEL;

  private logLevels = ['error', 'warn', 'log', 'verbose', 'debug'];

  public async logRequestData(req: any) {
    const { url, query, body, method } = req;

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

    await this.log(`${method} ${resultString}`);
  }

  public async logResponseData(res: any, data: Record<string, unknown>) {
    const { statusCode } = res;

    await this.log(
      `Response with status code ${statusCode} and body ${JSON.stringify(
        data,
      )}`,
    );
  }

  async error(message: any, ...optionalParams: [...any, string?]) {
    if (this.logLevel < 0) {
      return;
    }

    super.error(message, ...optionalParams);

    await this.writeLogToFile(message, 'error');
    await this.writeErrorToFile(message);
  }

  errorSync(message: any, ...optionalParams: [...any, string?]) {
    if (this.logLevel < 0) {
      return;
    }

    super.error(message, ...optionalParams);

    this.writeLogToFileSync(message, 'error');
    this.writeErrorToFileSync(message);
  }

  async warn(message: any, ...optionalParams: [...any, string?]) {
    if (this.logLevel < 1) {
      return;
    }

    super.warn(message, ...optionalParams);

    await this.writeLogToFile(message, 'warn');
  }

  async log(message: any, ...optionalParams: [...any, string?]) {
    if (this.logLevel < 2) {
      return;
    }

    super.log(message, ...optionalParams);
    await this.writeLogToFile(message, 'log');
  }

  async verbose(message: any, ...optionalParams: [...any, string?]) {
    if (this.logLevel < 3) {
      return;
    }

    super.verbose(message, ...optionalParams);
    await this.writeLogToFile(message, 'verbose');
  }

  async debug(message: any, ...optionalParams: [...any, string?]) {
    if (this.logLevel < 4) {
      return;
    }

    super.debug(message, ...optionalParams);
    await this.writeLogToFile(message, 'debug');
  }

  private processMessageToLog(message: string, logLevel: string) {
    return `${new Date().toISOString()} [${logLevel.toUpperCase()}] ${message}\n`;
  }

  private async writeLogToFile(message: string, logLevel: string) {
    return this.writeToFile(
      this.commonLogsFileName,
      this.processMessageToLog(message, logLevel),
    );
  }

  private async writeErrorToFile(message: string) {
    return this.writeToFile(
      this.errorLogsFileName,
      this.processMessageToLog(message, 'error'),
    );
  }

  private async writeLogToFileSync(message: string, logLevel: string) {
    this.writeToFileSync(
      this.commonLogsFileName,
      this.processMessageToLog(message, logLevel),
    );
  }

  private async writeErrorToFileSync(message: string) {
    this.writeToFileSync(
      this.errorLogsFileName,
      this.processMessageToLog(message, 'error'),
    );
  }

  private async writeToFile(fileName: string, message: string) {
    try {
      await appendFile(fileName, message);
    } catch (err) {
      console.error(err);
    }
  }

  private async writeToFileSync(fileName: string, message: string) {
    appendFileSync(fileName, message);
  }
}
