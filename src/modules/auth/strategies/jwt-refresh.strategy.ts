import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { environment } from '@src/environment';
import { UserEntity } from '@src/modules/users/entities/user.entity';
import { IJwtPayload } from '@common/interfaces/jwt-payload.interface';
import { IJwtUserPayload } from '@common/interfaces/jwt-user-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([ExtractJwt.fromBodyField('refreshToken')]),
      secretOrKey: environment.tokenKeys.refreshKey,
    });
  }

  async validate(payload?: IJwtUserPayload): Promise<IJwtPayload> {
    if (!payload) {
      throw new UnauthorizedException();
    }

    const { id } = payload;
    const user = await this.entityManager.getRepository(UserEntity).findOne({ where: { id } });

    if (!user) {
      throw new UnauthorizedException();
    }
    return payload;
  }
}
