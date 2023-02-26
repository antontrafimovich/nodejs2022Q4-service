import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpAdapterHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

import { LoggingSerivce } from '../logger/logging.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    private loggingService: LoggingSerivce,
    private httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { httpAdapter } = this.httpAdapterHost;

    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    this.loggingService.logRequestData(request);

    this.loggingService.error(
      `Exception with code ${httpStatus} has been thrown.`,
    );

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
