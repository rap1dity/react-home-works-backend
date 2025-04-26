import { OmitType } from '@nestjs/swagger';
import { GetUserRTO } from '@src/modules/users/rto/get-user.rto';

export class GetProfileRTO extends OmitType(GetUserRTO, ['password']) {}
