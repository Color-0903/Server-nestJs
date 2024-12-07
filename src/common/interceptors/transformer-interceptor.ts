import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  InternalServerErrorException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

export interface Response<T> {
  statusCode: number;
  data?: T;
  message?: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error.status) throw error;
        else if (error.message) {
          throw new InternalServerErrorException(error.message);
        }
        throw error;
      }),
    );
  }
}
