import { applyDecorators, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiPayloadTooLargeResponse,
  ApiTooManyRequestsResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponseOptions } from '@nestjs/swagger/dist/decorators/api-response.decorator';
import { getCommonRTO } from '@common/utils/get-common-rto.util';

export function ApiResponseDecorator(
  statuses: (HttpStatus | { code: HttpStatus; options: ApiResponseOptions })[],
): MethodDecorator & ClassDecorator {
  return applyDecorators(
    ...statuses.map((input) => {
      const statusCode = typeof input === 'object' && 'code' in input ? input.code : input;
      const options = typeof input === 'object' && 'options' in input ? input.options : {};

      switch (statusCode) {
        case HttpStatus.OK:
          return ApiOkResponse(options);
        case HttpStatus.CREATED:
          return ApiCreatedResponse(options);
        case HttpStatus.BAD_REQUEST:
          return ApiBadRequestResponse({
            type: getCommonRTO(HttpStatus.BAD_REQUEST),
            ...options,
          });
        case HttpStatus.UNAUTHORIZED:
          return ApiUnauthorizedResponse({
            type: getCommonRTO(HttpStatus.UNAUTHORIZED),
            ...options,
          });
        case HttpStatus.FORBIDDEN:
          return ApiForbiddenResponse({
            type: getCommonRTO(HttpStatus.FORBIDDEN),
            ...options,
          });
        case HttpStatus.NOT_FOUND:
          return ApiNotFoundResponse({
            type: getCommonRTO(HttpStatus.NOT_FOUND),
            ...options,
          });
        case HttpStatus.CONFLICT:
          return ApiConflictResponse({
            type: getCommonRTO(HttpStatus.CONFLICT),
            ...options,
          });
        case HttpStatus.TOO_MANY_REQUESTS:
          return ApiTooManyRequestsResponse({
            type: getCommonRTO(HttpStatus.TOO_MANY_REQUESTS),
            ...options,
          });
        case HttpStatus.PAYLOAD_TOO_LARGE:
          return ApiPayloadTooLargeResponse({
            type: getCommonRTO(HttpStatus.PAYLOAD_TOO_LARGE),
            ...options,
          });
        case HttpStatus.INTERNAL_SERVER_ERROR:
          return ApiInternalServerErrorResponse({
            type: getCommonRTO(HttpStatus.INTERNAL_SERVER_ERROR),
            ...options,
          });
        default:
          throw new Error('@ApiResponseDecorator() некорректный code');
      }
    }),
  );
}
