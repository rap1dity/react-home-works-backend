import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtUserPayload } from '@common/interfaces/jwt-user-payload.interface';

export const UserPayload = createParamDecorator((_: undefined, context: ExecutionContext): IJwtUserPayload => {
  const { user } = context.switchToHttp().getRequest();

  return user as IJwtUserPayload;
});
