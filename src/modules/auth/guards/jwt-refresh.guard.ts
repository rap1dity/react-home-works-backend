import { AuthGuard } from '@nestjs/passport';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { firstValueFrom, isObservable } from 'rxjs';
import { RedisService } from '@src/modules/redis/services/redis.service';
import { AuthService } from '@src/modules/auth/services/auth.service';
import { Request } from 'express';
import { validate } from 'class-validator';
import { RefreshTokenDTO } from '@src/modules/auth/dto/refresh-token.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') implements CanActivate {
  constructor(
    private readonly redisService: RedisService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = await this.getTokenFromRequest(request);

    if (token) {
      return this.redisService
        .get<string>(this.authService.getRefreshTokenKey(token))
        .then(async (value): Promise<boolean> => {
          if (value) {
            await this.redisService.delete(this.authService.getRefreshTokenKey(token));

            const result = super.canActivate(context);

            if (isObservable(result)) {
              return firstValueFrom(result);
            }

            return result;
          }

          return false;
        });
    }

    const result = super.canActivate(context);

    if (isObservable(result)) {
      return firstValueFrom(result);
    }

    return result;
  }

  private async getTokenFromRequest(request: Request): Promise<string> {
    const tokenFromBody = await this.getTokenFromBody(request.body);

    if (tokenFromBody) {
      return tokenFromBody;
    }

    throw new UnauthorizedException();
  }

  private async getTokenFromBody(body: unknown): Promise<string | null> {
    const isBodyValid = await this.isBodyValid(body);

    if (!isBodyValid) {
      return null;
    }

    return (body as RefreshTokenDTO).refreshToken;
  }

  private async isBodyValid(body: unknown): Promise<boolean> {
    const bodyObject: RefreshTokenDTO = plainToInstance(RefreshTokenDTO, body);

    const errors = await validate(RefreshTokenDTO.name, bodyObject, { whitelist: true });

    return errors.length <= 0;
  }
}
