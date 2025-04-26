import { ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { isString } from 'class-validator';
import { Response } from 'express';
import {
  EntityNotFoundError,
  EntityPropertyNotFoundError,
  FindRelationsNotFoundError,
  PrimaryColumnCannotBeNullableError,
  TypeORMError,
} from 'typeorm';
import { isObject } from '@common/type-guards/is.object';
import { isStringArray } from '@common/type-guards/is.string.array';
import { CommonResponseRTO } from '@common/rto/common-response.rto';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  public override catch(exception: unknown, host: ArgumentsHost): void {
    let message: string | string[] = this.getMessage(exception);

    if (!Array.isArray(message)) {
      message = [message];
    }

    const status = this.getStatusCode(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const answer: CommonResponseRTO<null> = {
      code: status,
      message,
      data: null,
      error: null,
    };

    response.status(status).json(answer);
  }

  private getTypeOrmStatusCode(exception: TypeORMError): HttpStatus {
    if (exception instanceof EntityNotFoundError) {
      return HttpStatus.NOT_FOUND;
    }

    if (
      exception instanceof FindRelationsNotFoundError ||
      exception instanceof EntityPropertyNotFoundError ||
      exception instanceof PrimaryColumnCannotBeNullableError
    ) {
      return HttpStatus.BAD_REQUEST;
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getStatusCode(exception: unknown): HttpStatus {
    if (this.isHttpException(exception)) {
      return exception.getStatus();
    }

    if (this.isTypeORMError(exception)) {
      return this.getTypeOrmStatusCode(exception);
    }

    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getMessage(exception: unknown): string {
    if (this.isHttpException(exception)) {
      const response = exception.getResponse();

      if (isString(response)) {
        return response;
      }

      if (isObject(response)) {
        if (isString(response.message)) {
          return response.message;
        }

        if (isStringArray(response.message)) {
          return response.message.join(', ');
        }
      }

      return exception.message;
    }

    if (this.isTypeORMError(exception)) {
      return this.getTypeormErrorMessage(exception);
    }

    if (this.isError(exception) && exception.message.length) {
      return exception.message;
    }

    return 'Unexpected error';
  }

  private isHttpException(exception: unknown): exception is HttpException {
    return exception instanceof HttpException;
  }

  private isTypeORMError(exception: unknown): exception is TypeORMError {
    return exception instanceof TypeORMError;
  }

  private isError(exception: unknown): exception is Error {
    return exception instanceof Error;
  }

  private getTypeormErrorMessage(exception: TypeORMError): string {
    if (exception instanceof EntityNotFoundError) {
      return `Nothing found by criterion ${JSON.stringify(exception.criteria)}`;
    }

    if (this.isError(exception) && exception.message.length) {
      return exception.message;
    }

    return 'Unexpected error';
  }
}
