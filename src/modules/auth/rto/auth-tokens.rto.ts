import { ApiProperty } from '@nestjs/swagger';

export class AuthTokensRTO {
  @ApiProperty({ description: 'Токен доступа' })
  accessToken: string;

  @ApiProperty({ description: 'Токен обновления' })
  refreshToken: string;
}
