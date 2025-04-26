import { Constructor } from '@common/interfaces/constructor.interface';
import { HttpStatus } from '@nestjs/common';
import { CommonResponseRTO } from '@common/rto/common-response.rto';
import { getCommonRTO } from '@common/utils/get-common-rto.util';
import { ApiProperty } from '@nestjs/swagger';

export function baseRTO<
  Entity extends Constructor | Constructor[],
  ResponseItemType = Entity extends Constructor[]
    ? InstanceType<Entity[number]>[]
    : Entity extends Constructor
      ? InstanceType<Entity>
      : never,
>(entityOrEntities: Entity, status: HttpStatus = HttpStatus.OK): Constructor<CommonResponseRTO<ResponseItemType>> {
  class BaseResponse extends getCommonRTO<ResponseItemType>(status) {
    @ApiProperty({
      type: Array.isArray(entityOrEntities) ? entityOrEntities[0] : entityOrEntities,
      isArray: Array.isArray(entityOrEntities),
    })
    data: ResponseItemType;
  }

  if (Array.isArray(entityOrEntities)) {
    const name = `${entityOrEntities[0].name}_Array`;

    Object.defineProperty(BaseResponse, 'name', {
      value: `${name}_BaseResponse`,
    });

    return BaseResponse;
  }

  Object.defineProperty(BaseResponse, 'name', {
    value: `${entityOrEntities.name}_BaseResponse`,
  });

  return BaseResponse;
}
