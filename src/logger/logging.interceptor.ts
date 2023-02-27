import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { LoggingSerivce } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggingService: LoggingSerivce) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    this.loggingService.logRequestData(request);

    return next.handle().pipe(
      tap({
        next: async (data) => {
          const response = context.switchToHttp().getResponse();

          await this.loggingService.logResponseData(response, data);
        },
      }),
    );
  }
}
