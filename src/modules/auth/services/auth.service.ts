import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO } from '@src/modules/auth/dto/login.dto';
import { UsersService } from '@src/modules/users/services/users.service';
import { UserErrors } from '@src/modules/users/enums/user-errors.enum';
import { AuthTokensRTO } from '@src/modules/auth/rto/auth-tokens.rto';
import { TokenService } from '@src/modules/auth/services/token.service';
import { IJwtUserPayload } from '@common/interfaces/jwt-user-payload.interface';
import { environment } from '@src/environment';
import { RedisService } from '@src/modules/redis/services/redis.service';
import { CreateUserDTO } from '@src/modules/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenService: TokenService,
    private readonly redisService: RedisService,
  ) {}

  async register(dto: CreateUserDTO): Promise<AuthTokensRTO> {
    const user = await this.usersService.create(dto);

    return this.getTokens(user.id);
  }

  async login(dto: LoginDTO): Promise<AuthTokensRTO> {
    const user = await this.usersService.findOneByUsername(dto.username);

    if (!user) {
      throw new BadRequestException(UserErrors.INVALID_CREDENTIALS);
    }

    if (!this.tokenService.comparePassword(dto.password, user.password)) {
      throw new BadRequestException(UserErrors.INVALID_CREDENTIALS);
    }

    return this.getTokens(user.id);
  }

  async getTokens(userId: string): Promise<AuthTokensRTO> {
    const user = await this.usersService.findOneByIdOrFail(userId);

    const jwtPayload: Omit<IJwtUserPayload, 'iat' | 'exp'> = {
      id: user.id,
    };

    const [accessToken, refreshToken] = await this.tokenService.createTokens(jwtPayload);

    await this.redisService.set<string>(
      this.getRefreshTokenKey(refreshToken),
      refreshToken,
      environment.tokenKeys.refreshTokenExpiresIn,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  getRefreshTokenKey(token: string): string {
    return `refresh-${token}`;
  }
}
