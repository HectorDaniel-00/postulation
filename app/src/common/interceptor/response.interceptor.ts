import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { map, Observable } from 'rxjs';
import { MESSAGE_KEY } from '../constant/message.constant';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const message = this.reflector.getAllAndOverride<string>(MESSAGE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const statusCode = HttpStatus.OK;
    const req: Request = context.switchToHttp().getRequest();
    return next.handle().pipe(
      map((data) => {
        return {
          success: true,
          statusCode,
          path: req.url,
          method: req.method,
          message,
          data,
        };
      }),
    );
  }
}
