import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggingSerivce } from '../logger/logging.service';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingSerivce) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.loggingService.logRequestData(request);

    this.loggingService.error(
      `Exception with code ${httpStatus} has been thrown.`,
    );

    response.status(httpStatus).json({
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
