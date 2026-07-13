import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class GlobalValidationPipe implements PipeTransform {
  async transform(value: unknown, { metatype }: ArgumentMetadata): Promise<unknown> {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object as object);

    if (errors.length === 0) {
      return object;
    }

    const formattedErrors: Record<string, string[]> = {};

    for (const error of errors) {
      if (error.constraints) {
        formattedErrors[error.property] = Object.values(error.constraints);
      }
      if (error.children && error.children.length > 0) {
        for (const child of error.children) {
          if (child.constraints) {
            const key = `${error.property}.${child.property}`;
            formattedErrors[key] = Object.values(child.constraints);
          }
        }
      }
    }

    throw new BadRequestException({
      message: 'Validation failed',
      errors: formattedErrors,
    });
  }

  private toValidate(metatype: new (...args: unknown[]) => unknown): boolean {
    const types: (new (...args: unknown[]) => unknown)[] = [
      String,
      Boolean,
      Number,
      Array,
      Object,
    ];
    return !types.includes(metatype);
  }
}
