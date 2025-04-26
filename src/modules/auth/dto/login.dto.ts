import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDTO {
  @ApiProperty({ description: 'Логин' })
  @IsString({ message: 'Логин должен быть строкой' })
  username: string;

  @ApiProperty({ description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  password: string;
}
