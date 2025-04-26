import { applyDecorators, Controller } from '@nestjs/common';

export function WebController(postfix: string, version: string): ClassDecorator {
  return applyDecorators(Controller({ path: `web/api/v${version}/${postfix}` }));
}
