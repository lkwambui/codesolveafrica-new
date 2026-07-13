import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse, PaginationMeta } from '@shared/interfaces/api-response.interface';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';

export interface PaginatedResult<T> {
  items: T[];
  meta: PaginationMeta;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T | T[]>> {
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T | T[]>> {
    const response = context.switchToHttp().getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        if (data === null || data === undefined) {
          return {
            success: true,
            message: 'Success',
            data: null,
          } as ApiResponse<T | T[]>;
        }

        if (this.isPaginatedResult(data)) {
          return {
            success: true,
            message: 'Success',
            data: data.items,
            meta: data.meta,
          } as unknown as ApiResponse<T | T[]>;
        }

        const message = this.extractMessage(data);

        return {
          success: true,
          message,
          data: this.extractData(data),
        } as ApiResponse<T | T[]>;
      }),
    );
  }

  private isPaginatedResult(data: unknown): data is PaginatedResult<unknown> {
    return (
      typeof data === 'object' &&
      data !== null &&
      'items' in data &&
      'meta' in data &&
      typeof (data as Record<string, unknown>).meta === 'object'
    );
  }

  private extractMessage(data: unknown): string {
    if (typeof data === 'object' && data !== null && 'message' in data) {
      const msg = (data as Record<string, unknown>).message;
      if (typeof msg === 'string') return msg;
    }
    return 'Success';
  }

  private extractData(data: unknown): unknown {
    if (typeof data === 'object' && data !== null && 'message' in data) {
      const { message: _msg, ...rest } = data as Record<string, unknown>;
      if (Object.keys(rest).length === 0) return null;
      return rest;
    }
    return data;
  }
}
