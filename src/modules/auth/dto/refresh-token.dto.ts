import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty({ description: 'Токен обновления' })
  @IsNotEmpty({ message: 'Токен обновления должен быть не пустой строкой' })
  @IsString({ message: 'Токен обновления должен быть строкой' })
  refreshToken: string;
}
