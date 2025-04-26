import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { WebController } from '@common/decorators/web-controller.decorator';
import { AuthService } from '@src/modules/auth/services/auth.service';
import { ApiResponseDecorator } from '@common/decorators/api-response.decorator';
import { Body, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { baseRTO } from '@common/rto/base.rto';
import { LoginDTO } from '@src/modules/auth/dto/login.dto';
import { AuthTokensRTO } from '@src/modules/auth/rto/auth-tokens.rto';
import { UserPayload } from '@common/decorators/user-payload.decorator';
import { IJwtUserPayload } from '@common/interfaces/jwt-user-payload.interface';
import { JwtRefreshGuard } from '@src/modules/auth/guards/jwt-refresh.guard';
import { RefreshTokenDTO } from '@src/modules/auth/dto/refresh-token.dto';
import { CreateUserDTO } from '@src/modules/users/dto/create-user.dto';

@ApiTags('Auth')
@WebController('auth', '1')
export class AuthControllerV1 {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Зарегистрироваться' })
  @ApiResponseDecorator([
    {
      code: HttpStatus.CREATED,
      options: { type: baseRTO(AuthTokensRTO, HttpStatus.CREATED) },
    },
  ])
  @Post('register')
  async create(@Body() dto: CreateUserDTO): Promise<AuthTokensRTO> {
    return this.authService.register(dto);
  }

  @ApiOperation({
    summary: 'Авторизация по логину',
  })
  @ApiResponseDecorator([
    {
      code: HttpStatus.OK,
      options: { type: baseRTO(AuthTokensRTO, HttpStatus.OK) },
    },
  ])
  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<AuthTokensRTO> {
    return this.authService.login(dto);
  }

  @ApiOperation({ summary: 'Обновить токены' })
  @ApiBody({ type: () => RefreshTokenDTO })
  @ApiResponseDecorator([
    {
      code: HttpStatus.OK,
      options: { type: baseRTO(AuthTokensRTO, HttpStatus.OK) },
    },
  ])
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(@UserPayload() user: IJwtUserPayload): Promise<AuthTokensRTO> {
    return this.authService.getTokens(user.id);
  }
}
