import { Module } from '@nestjs/common';
import { AuthControllerV1 } from '@src/modules/auth/controllers/auth.controller.v1';
import { AuthService } from '@src/modules/auth/services/auth.service';
import { UsersModule } from '@src/modules/users/users.module';
import { RedisModule } from '@src/modules/redis/redis.module';
import { TokenService } from '@src/modules/auth/services/token.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@src/modules/auth/strategies/jwt.strategy';
import { JwtRefreshStrategy } from '@src/modules/auth/strategies/jwt-refresh.strategy';

@Module({
  imports: [JwtModule, UsersModule, RedisModule],
  controllers: [AuthControllerV1],
  providers: [AuthService, TokenService, JwtStrategy, JwtRefreshStrategy],
})
export class AuthModule {}
