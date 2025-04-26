import { Column, Entity } from 'typeorm';
import { BaseEntity } from '@common/entities/base.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class UserEntity extends BaseEntity {
  @ApiProperty({ description: 'Логин' })
  @Column({ type: 'varchar', unique: true })
  username: string;

  @ApiProperty({ description: 'Пароль' })
  @Column({ type: 'varchar', select: false })
  password: string;

  @ApiProperty({ description: 'Имя пользователя' })
  @Column({ type: 'varchar' })
  firstName: string;

  @ApiProperty({ description: 'Фамилия пользователя' })
  @Column({ type: 'varchar' })
  lastName: string;

  @ApiProperty({ description: 'Отчество пользователя' })
  @Column({ type: 'varchar', nullable: true })
  patronymic: string;
}
