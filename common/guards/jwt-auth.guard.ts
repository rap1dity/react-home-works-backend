import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  private isJWTHeaderSet(req: Request): boolean {
    return !!req.headers.authorization;
  }

  private isJWTSet(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    return this.isJWTHeaderSet(request);
  }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [context.getHandler(), context.getClass()]);
    const isOptionalAuth = this.reflector.getAllAndOverride('isOptionalAuth', [
      context.getHandler(),
      context.getClass(),
    ]);

    const isJWTSet = this.isJWTSet(context);

    if (isPublic) {
      return true;
    }

    if (isOptionalAuth) {
      if (isJWTSet) {
        return super.canActivate(context);
      }

      return true;
    }

    return super.canActivate(context);
  }
}
