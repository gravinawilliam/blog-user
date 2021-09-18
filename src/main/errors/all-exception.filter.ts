import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  ExceptionFilter,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private logger: Logger = new Logger('ExceptionFilter');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();
    const response = ctx.getResponse();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    this.logger.error(exception);
    console.log('====================================');
    console.log({
      error: {
        statusCode: status,
        path: request.url,
        stack: exception.stack,
        error: exception.error,
        response:
          exception instanceof HttpException
            ? exception.getResponse()
            : exception,
      },
    });
    console.log('====================================');

    // ? Precisa ter esse response pra não ficar dando timeout
    const res =
      exception instanceof HttpException
        ? exception.getResponse()
        : {
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            message: 'Internal Server Error',
          };

    return response.status(status).json(res);
  }
}
