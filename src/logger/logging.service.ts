import { ConsoleLogger, Injectable, Scope } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggingSerivce extends ConsoleLogger {
  public logRequestData(req: any) {
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
  }
}
