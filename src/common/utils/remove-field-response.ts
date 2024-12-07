import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map } from 'rxjs';

/**
 * @example
 * Remove key c in object a and key d
 *
 * @UseInterceptors(new RemoveFieldResponse(['d','a.c']))
 */
@Injectable()
export class RemoveFieldResponse implements NestInterceptor {
  private fieldRemove: string[];

  constructor(fields: string[]) {
    this.fieldRemove = fields;
  }

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((response: Response) => {
        if (response) this.removeFields(response);
        return response;
      }),
    );
  }

  private removeFields(target: object) {
    for (const [key, value] of Object.entries(target)) {
      for (const field of this.fieldRemove) {
        if (field.includes('.')) {
          this.removeNestedField(target, field);
        } else if (field === key) {
          delete target[key];
        } else if (typeof value === 'object' && value) {
          this.removeFields(value);
        }
      }

      if (
        value &&
        typeof value === 'object' &&
        !Object.keys(value).length &&
        !(value instanceof Date)
      ) {
        target[key] = null;
      }
    }
  }

  private removeNestedField(target: object, targetPath: string) {
    const keys = targetPath.split('.');
    for (let i = 0; i < keys.length - 1; i++) {
      if (target[keys[i]]) {
        target = target[keys[i]];
      } else {
        return;
      }
    }
    delete target[keys[keys.length - 1]];
  }
}
