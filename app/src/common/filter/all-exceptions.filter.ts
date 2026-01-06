import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let code = 'INTERNAL_SERVER_ERROR';
    let message = 'Error interno';
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res: any = exception.getResponse();
      if (res.code) code = res.code;
      if (res.message) message = res.message;
    }
    response.status(status).json({
      succes: false,
      status,
      path: request.url,
      method: request.method,
      error: {
        code,
        message,
      },
    });
  }
}
