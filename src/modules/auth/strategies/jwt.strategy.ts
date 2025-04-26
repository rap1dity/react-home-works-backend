import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { environment } from '@src/environment';
import { IJwtUserPayload } from '@common/interfaces/jwt-user-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromAuthHeaderAsBearerToken()]),
      secretOrKey: environment.tokenKeys.accessKey,
    });
  }

  async validate(payload?: IJwtUserPayload): Promise<IJwtUserPayload> {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
