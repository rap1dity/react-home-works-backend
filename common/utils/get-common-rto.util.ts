import { HttpStatus } from '@nestjs/common';
import { CommonResponseRTO } from '@common/rto/common-response.rto';
import { AbstractConstructor } from '@common/interfaces/abstract-constructor.interface';
import { HttpStatusReverse } from '@common/constants/http-status-reverse.constant';
import { ApiProperty } from '@nestjs/swagger';

export function getCommonRTO<T>(status: HttpStatus): AbstractConstructor<CommonResponseRTO<T>> {
  const isError = status >= HttpStatus.BAD_REQUEST;

  const defaultError = isError ? HttpStatusReverse[status] : null;

  const defaultMessage = isError ? ['Some error message'] : ['success'];

  abstract class CommonRTO<T> implements CommonResponseRTO<T> {
    @ApiProperty({
      example: status,
    })
    code: number;

    @ApiProperty({
      type: String,
      isArray: true,
      example: defaultMessage,
    })
    message: string[];

    @ApiProperty({ nullable: true, ...(isError && { example: null }) })
    abstract data: T | null;

    @ApiProperty({
      type: String,
      default: defaultError,
      nullable: true,
      ...(!isError && { default: null }),
    })
    error: string | null;
  }

  Object.defineProperty(CommonRTO, 'name', {
    value: `${CommonRTO.name}_${status}`,
  });

  return CommonRTO<T>;
}
