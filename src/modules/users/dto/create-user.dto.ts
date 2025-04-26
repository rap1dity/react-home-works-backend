import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @ApiProperty({ description: 'Логин' })
  @IsString({ message: 'Логин должен быть строкой' })
  @Length(6, 1000, { message: 'Логин должен быть не менее 6 символов' })
  username: string;

  @ApiProperty({ description: 'Пароль' })
  @IsString({ message: 'Пароль должен быть строкой' })
  @Length(6, 1000, { message: 'Пароль должен быть не менее 6 символов' })
  password: string;

  @ApiProperty({ description: 'Имя' })
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия' })
  @IsString({ message: 'Фамилия должна быть строкой' })
  @IsNotEmpty({ message: 'Фамилия не может быть пустой' })
  lastName: string;

  @ApiPropertyOptional({ description: 'Отчество' })
  @IsOptional()
  @IsString({ message: 'Отчество должно быть строкой' })
  @IsNotEmpty({ message: 'Отчество не может быть пустым' })
  patronymic: string;
}
