import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

import { LoggingSerivce } from '../logger/logging.service';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
  constructor(private loggingService: LoggingSerivce) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.loggingService.logRequestData(request);

    this.loggingService.error(
      `Exception with code ${httpStatus} has been thrown.`,
    );

    super.catch(exception, host);
  }
}
