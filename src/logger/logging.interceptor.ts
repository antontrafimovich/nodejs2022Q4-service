import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingSerivce } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingService: LoggingSerivce) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const { url, query, body } = context.switchToHttp().getRequest();

    console.log(context);

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

    this.loggingService.log(resultString);

    return next.handle().pipe(
      tap({
        next: (data) => console.log(data),
        error: (error) => {
          this.loggingService.error(error.message);
          console.log(error);
        },
      }),
    );
  }
}
