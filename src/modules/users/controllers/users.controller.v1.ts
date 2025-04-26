import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WebController } from '@common/decorators/web-controller.decorator';
import { Get, HttpStatus, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { UsersService } from '@src/modules/users/services/users.service';
import { ApiResponseDecorator } from '@common/decorators/api-response.decorator';
import { UserEntity } from '@src/modules/users/entities/user.entity';
import { UserPayload } from '@common/decorators/user-payload.decorator';
import { IJwtUserPayload } from '@common/interfaces/jwt-user-payload.interface';
import { baseRTO } from '@common/rto/base.rto';
import { GetProfileRTO } from '@src/modules/users/rto/get-profile.rto';

@ApiTags('Users')
@WebController('users', '1')
@UseGuards(JwtAuthGuard)
export class UsersControllerV1 {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Получить профиль' })
  @ApiResponseDecorator([
    {
      code: HttpStatus.OK,
      options: { type: baseRTO(GetProfileRTO, HttpStatus.OK) },
    },
  ])
  @Get('profile')
  async getProfile(@UserPayload() user: IJwtUserPayload): Promise<UserEntity> {
    return this.usersService.getProfile(user.id);
  }
}
