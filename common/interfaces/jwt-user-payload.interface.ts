import { IJwtPayload } from '@common/interfaces/jwt-payload.interface';

export interface IJwtUserPayload extends IJwtPayload {
  id: string;
}
